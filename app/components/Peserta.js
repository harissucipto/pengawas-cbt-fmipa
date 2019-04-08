import React from 'react';
import { Card, List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProfilUjian from './ProfilUjian';
import ListPeserta from './ListPesertaTidakHadir';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      kelas {
        id
        mahasiswas {
          id
          nama
          image
          nim
        }
      }
    }
  }
`;

const QueryInfoUjian = props => (
  <Query
    {...props}
    query={INFO_UJIAN_QUERY}
    variables={{ id: props.id, jwt: props.jwt }}
  >
    {payload => props.children(payload)}
  </Query>
);

const InformasiUjian = props => {
  const { id, jwt, grid } = props;
  if (!id || !jwt) return <p>Error, Anda Tidak boleh curang...</p>;

  return (
    <QueryInfoUjian id={id} jwt={jwt}>
      {({ data, loading, error }) => {
        if (error) console.log(error);
        if (error) return <p>Error</p>;
        if (loading) return <p>loading...</p>;

        const { infoUjian } = data;

        return (
          <Card loading={loading} title="Kehadiran Peserta Ujian">
            <ListPeserta
              mahasiswas={infoUjian.kelas.mahasiswas}
              idUjian={infoUjian.id}
              loading={loading}
            />
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default InformasiUjian;
