import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProfilUjian from './ProfilUjian';
import UpdatePin from './UpdatePin';

const PIN_UJIAN_QUERY = gql`
  query PIN_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      pin
    }
  }
`;

const QueryInfoUjian = props => (
  <Query
    {...props}
    query={PIN_UJIAN_QUERY}
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
            extra={<UpdatePin id={id} jwt={jwt} />}
          >
            <List grid={grid}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon="info" style={{ backgroundColor: 'brown' }} />
                  }
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
export { PIN_UJIAN_QUERY };
