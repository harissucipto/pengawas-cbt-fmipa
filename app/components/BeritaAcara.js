/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Avatar, Checkbox, Spin, Input, List } from 'antd';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { id } from 'postcss-selector-parser';

const MUTASI_BERITA_ACARA = gql`
  mutation MUTASI_BERITA_ACARA(
    $idUjian: ID!
    $idMahasiswa: ID!
    $kasus: String!
  ) {
    updateBeritaAcara(
      idUjian: $idUjian
      idMahasiswa: $idMahasiswa
      kasus: $kasus
    ) {
      id
    }
  }
`;

const QUERY_BERITA_ACARA = gql`
  query QUERY_BERITA_ACARA($idUjian: ID!) {
    beritaAcaraUjians(where: { ujian: { id: $idUjian } }) {
      id
      mahasiswa {
        id
      }
      teralambat
      wajah
      sakit
      menyontek
      alatDilarang
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
      mahasiswa =>
        mahasiswa.nim.includes(keyword) || mahasiswa.nama.includes(keyword)
    );
  };

  check = (beritaAcara, idMahasiswa) => kasus => {
    if (!beritaAcara.length) return false;
    const mahasiswa = beritaAcara.find(
      item => item.mahasiswa.id === idMahasiswa
    );

    return mahasiswa ? mahasiswa[kasus] : false;
  };

  updateDB = (event, idUjian, idMahasiswa) => kasus => () => {
    event({ variables: { idUjian, idMahasiswa, kasus } });
  };

  columns = beritaAcaras => [
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
      title: 'Kasus',
      key: 'kehadiran',
      render: (text, record) => (
        <Mutation
          mutation={MUTASI_BERITA_ACARA}
          refetchQueries={[
            {
              query: QUERY_BERITA_ACARA,
              variables: { idUjian: this.props.idUjian }
            }
          ]}
        >
          {(updateBeritaAcara, { loading, error, data }) => {
            if (loading) return <Spin />;

            if (error) console.log(error);

            // return fn
            const checkKasus = this.check(beritaAcaras, record.id);
            const updateKasus = this.updateDB(
              updateBeritaAcara,
              this.props.idUjian,
              record.id
            );

            return (
              <List>
                <List.Item>
                  <Checkbox
                    onClick={updateKasus('teralambat')}
                    checked={checkKasus('teralambat')}
                  >
                    Terlambat
                  </Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox
                    onClick={updateKasus('wajah')}
                    checked={checkKasus('wajah')}
                  >
                    Wajah Tidak Sesuai
                  </Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox
                    onClick={updateKasus('sakit')}
                    checked={checkKasus('sakit')}
                  >
                    Sakit
                  </Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox
                    onClick={updateKasus('alatDilarang')}
                    checked={checkKasus('alatDilarang')}
                  >
                    Menggunakan Alat Dilarang
                  </Checkbox>
                </List.Item>
                <List.Item>
                  <Checkbox
                    onClick={updateKasus('menyontek')}
                    checked={checkKasus('menyontek')}
                  >
                    Menyontek
                  </Checkbox>
                </List.Item>
              </List>
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
          query={QUERY_BERITA_ACARA}
          variables={{ idUjian }}
          fetchPolicy="network-only"
        >
          {({ error, loading, data }) => {
            if (loading) return <p>loading...</p>;
            const { beritaAcaraUjians } = data;

            console.log(beritaAcaraUjians);
            {
              /* return <p>hhhh</p>; */
            }

            return (
              <Table
                bordered
                columns={this.columns(beritaAcaraUjians)}
                pagination={false}
                dataSource={this.filterMahasiswa(
                  this.props.mahasiswas,
                  this.state.keyword
                )}
                rowKey={record => record.nim}
                loading={loading}
              />
            );
          }}
        </Query>
      </>
    );
  }
}

export default ListPeserta;
