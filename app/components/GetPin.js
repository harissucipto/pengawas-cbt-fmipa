import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProfilUjian from './ProfilUjian';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      pin
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
        console.log(data);

        const { infoUjian } = data;

        return (
          <Card
            loading={loading}
            title="Pin Ujian"
            extra={<Button>Generate Baru</Button>}
          >
            <List grid={grid}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="info" />}
                  title={<a>Pin Ujian</a>}
                  description={infoUjian.pin}
                />
              </List.Item>
            </List>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default InformasiUjian;
