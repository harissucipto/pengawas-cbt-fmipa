/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Avatar, Checkbox, Spin, Input } from 'antd';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { id } from 'postcss-selector-parser';

const MUTASI_TIDAK_HADIR = gql`
  mutation MUTASI_TIDAK_HADIR($idUjian: ID!, $idMahasiswa: ID!) {
    updateTidakHadir(idUjian: $idUjian, idMahasiswa: $idMahasiswa) {
      id
    }
  }
`;

const QUERY_TIDAK_HADIR = gql`
  query QUERY_TIDAK_HADIR($idUjian: ID!) {
    tidakHadirs(where: { ujian: { id: $idUjian } }) {
      id
      mahasiswa {
        id
        nim
      }
    }
  }
`;

class ListPeserta extends Component {
  state = {
    loading: false
  };

  checkHadir = (tidakHadirs, idMahasiswa) => {
    if (!tidakHadirs.length) return false;

    return (
      tidakHadirs.findIndex(
        tidakHadir => tidakHadir.mahasiswa.id === idMahasiswa
      ) >= 0
    );
  };

  filterMahasiswa = (mahasiswas, keyword) => {
    if (!mahasiswas.length) return [];
    if (!keyword) return mahasiswas;

    return mahasiswas.filter(
      item => item.nim.includes(keyword) || item.nama.includes(keyword)
    );
  };

  columns = tidakHadirs => [
    {
      title: 'Nomor',
      key: 'nomor',
      width: 20,
      render: (text, record, i) => <p>{i + 1}</p>
    },
    {
      title: 'Foto',
      key: 'image',
      width: 110,
      render: (text, record, i) => (
        <Avatar shape="square" size={100} src={record.image} />
      )
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama'
    },
    {
      title: 'NIM',
      dataIndex: 'nim',
      key: 'dosen'
    },
    {
      title: 'Kehadiran',
      key: 'kehadiran',
      render: (text, record) => (
        <Mutation
          mutation={MUTASI_TIDAK_HADIR}
          variables={{ idUjian: this.props.idUjian, idMahasiswa: record.id }}
          refetchQueries={[
            {
              query: QUERY_TIDAK_HADIR,
              variables: { idUjian: this.props.idUjian }
            }
          ]}
        >
          {(absen, { loading, error, data }) => {
            if (loading) return <Spin />;

            if (error) console.log(error);

            return (
              <Checkbox
                onClick={absen}
                checked={!this.checkHadir(tidakHadirs, record.id)}
              >
                {!this.checkHadir(tidakHadirs, record.id) ? (
                  <p style={{ color: 'green' }}>hadir</p>
                ) : (
                  <p style={{ color: 'red' }}>tidak</p>
                )}
              </Checkbox>
            );
          }}
        </Mutation>
      )
    }
  ];

  render() {
    const { idUjian } = this.props;
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px'
          }}
        >
          <Input.Search
            style={{ maxWidth: '480px' }}
            placeholder="Masukan Nama / Nim Mahasiswa"
            enterButton="Cari"
            onSearch={value => this.setState({ keyword: value })}
          />
        </div>
        <Query
          query={QUERY_TIDAK_HADIR}
          variables={{ idUjian }}
          fetchPolicy="network-only"
        >
          {({ error, loading, data }) => {
            if (loading) return <p>loading...</p>;
            const { tidakHadirs } = data;

            return (
              <Table
                bordered
                columns={this.columns(tidakHadirs)}
                pagination={false}
                dataSource={this.filterMahasiswa(
                  this.props.mahasiswas,
                  this.state.keyword
                )}
                rowKey={record => record.nim}
                loading={loading}
                tidakHadirs={tidakHadirs}
              />
            );
          }}
        </Query>
      </>
    );
  }
}

export default ListPeserta;
