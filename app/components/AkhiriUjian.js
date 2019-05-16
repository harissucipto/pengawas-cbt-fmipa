import React from 'react';
import { Card, List, Avatar, Button, Input, Popconfirm, Icon, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_SKOR = gql`
  mutation CREATE_SKOR($idUjian: ID!, $jwt: String!) {
    akhiriUjianPengawas(idUjian: $idUjian, jwt: $jwt) {
      id
      soalMahasiswas {
        id
        skor
      }
    }
  }
`;

const TampilkanSoal = props => (
  <Mutation
    mutation={CREATE_SKOR}
    variables={{ idUjian: props.idUjian, jwt: props.jwt }}
  >
    {(akhiri, { error, loading, data }) => {
      if (loading) return <p> loading...</p>;
      if (error) console.log(error, 'eror skor');

      return (
        <Popconfirm
          title="Anda ingin mengakhiri ujian？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          onConfirm={async () => {
            const res = await akhiri().catch(() => message.error('Koneksi gangguan, Coba Lagi!'));
            props.history.push('/');
          }}
        >
          <Button
            type="danger"
            style={{
              border: ' 2px solid black',
              marginTop: '20px',
              height: '100px',
              width: '100%',
              fontWeight: 700,
              fontSize: '20px'
            }}
          >
            Akhiri Ujian
          </Button>
        </Popconfirm>
      );
    }}
  </Mutation>
);

export default withRouter(TampilkanSoal);
export { CREATE_SKOR };
