import React from 'react';
import { Button } from 'antd';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { PIN_UJIAN_QUERY } from './GetPin';

const PIN_MUTATION = gql`
  mutation PIN_MUTATION($id: ID!, $jwt: String!) {
    updatePinUjian(id: $id, jwt: $jwt) {
      id
      pin
    }
  }
`;

const UbahPin = props => {
  const { id, jwt } = props;
  return (
    <Mutation
      mutation={PIN_MUTATION}
      variables={{ id, jwt }}
      refetchQueries={[{ query: PIN_UJIAN_QUERY, variables: { id, jwt } }]}
    >
      {(newPin, { loading, data, error }) => (
        <Button size="large" type="danger" loading={loading} onClick={newPin}>
          Generate Pin Ujian Baru
        </Button>
      )}
    </Mutation>
  );
};

export default UbahPin;
