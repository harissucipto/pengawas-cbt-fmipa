/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Avatar, Checkbox, Spin, Input, List } from 'antd';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { id } from 'postcss-selector-parser';
import { INFO_UJIAN_QUERY } from './PesertaReset';

const MUTASI_RESET_LOGIN = gql`
  mutation MUTASI_RESET_LOGIN($id: ID!, $status: String!) {
    updateSoalMahasiswa(where: { id: $id }, data: { status: $status }) {
      id
    }
  }
`;

class ListPeserta extends Component {
  state = {
    loading: false,
    keyword: ''
  };

  filterMahasiswa = (mahasiswas, keyword) => {
    if (!mahasiswas.length) return [];
    if (!keyword) return mahasiswas;

    return mahasiswas.filter(
      item =>
        item.mahasiswa.nim.includes(keyword) ||
        item.mahasiswa.nama.includes(keyword)
    );
  };

  checkSudahLogin = status => status !== 'belum';

  updateDB = (event, idUjian, idMahasiswa) => kasus => () => {
    event({ variables: { idUjian, idMahasiswa, kasus } });
  };

  columns = () => [
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
        <Avatar shape="square" size={100} src={record.mahasiswa.image} />
      )
    },
    {
      title: 'Nama',
      dataIndex: 'mahasiswa.nama',
      key: 'nama'
    },
    {
      title: 'NIM',
      dataIndex: 'mahasiswa.nim',
      key: 'dosen'
    },
    {
      title: 'Login',
      key: 'status',
      dataIndex: 'mahasiswa.status',
      render: (text, record) =>
        record.status !== 'sudah' ? (
          <Mutation
            mutation={MUTASI_RESET_LOGIN}
            refetchQueries={[
              {
                query: INFO_UJIAN_QUERY,
                variables: { id: this.props.idUjian, jwt: this.props.jwt }
              }
            ]}
            variables={{
              id: record.id,
              status: this.checkSudahLogin(record.status) ? 'belum' : 'sedang'
            }}
          >
            {(resetLogin, { loading, error, data }) => {
              if (loading) return <Spin />;

              if (error) console.log(error);

              return (
                <Checkbox
                  onClick={resetLogin}
                  checked={this.checkSudahLogin(record.status)}
                >
                  {this.checkSudahLogin(record.status) ? 'sudah' : 'belum'}
                </Checkbox>
              );
            }}
          </Mutation>
        ) : (
          'ujian telah dilaksanakan'
        )
    }
  ];

  render() {
    const { idUjian, jwt } = this.props;
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
        <Table
          bordered
          columns={this.columns()}
          pagination={false}
          dataSource={this.filterMahasiswa(
            this.props.mahasiswas,
            this.state.keyword
          )}
          rowKey={record => record.id}
        />
      </>
    );
  }
}

export default ListPeserta;
