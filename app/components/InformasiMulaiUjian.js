import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query, ApolloConsumer, Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment-timezone';
import AkhiriUjian, { CREATE_SKOR } from './AkhiriUjian';

require('moment/locale/id');

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      nama
      durasiPengerjaan
      tanggalPelaksanaan
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
  const { id, jwt } = props;
  if (!id || !jwt) return <p>Error, Anda Tidak boleh curang...</p>;

  return (
    <QueryInfoUjian id={id} jwt={jwt}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) console.log(error);
        if (error) return <p>Error</p>;
        console.log(data);

        const { infoUjian } = data;

        const durasiPengerjaan =
          moment(infoUjian.tanggalPelaksanaan).unix() +
          Number(infoUjian.durasiPengerjaan) * 60;

        const renderer = ({ hours, minutes, seconds, completed }) => {
          if (completed) {
            // Render a completed state
            return (
              <div>
                <div
                  style={{
                    fontSize: '25px',
                    padding: '10px',
                    fontWeight: 700,
                    color: 'blue'
                  }}
                >
                  <p style={{ fontSize: '20px', color: 'goldenrod' }}>
                    Sisa Waktu Ujian
                  </p>
                  <ApolloConsumer>
                    {client => (
                      <Countdown
                        date={moment(moment.unix(durasiPengerjaan).format())}
                        onComplete={async () => {
                          const dariCountDown = await client.mutate({
                            mutation: CREATE_SKOR,
                            variables: {
                              idUjian: infoUjian.id,
                              jwt
                            }
                          });
                          console.log(dariCountDown, 'daricount down');
                        }}
                      />
                    )}
                  </ApolloConsumer>
                </div>

                <AkhiriUjian idUjian={infoUjian.id} jwt={jwt} />
              </div>
            );
          }
          // Render a countdown
          return (
            <span
              style={{
                fontSize: '25px',
                padding: '10px',
                fontWeight: 700,
                color: 'blue'
              }}
            >
              <p style={{ fontSize: '20px', color: 'goldenrod' }}>
                Hitung mundur waktu pelaksanaan
              </p>
              {hours}:{minutes}:{seconds}
            </span>
          );
        };

        return (
          <Card>
            <div
              style={{
                textAlign: 'center',

                paddingTop: '1rem',
                marginBottom: '1rem'
              }}
            >
              <Countdown
                renderer={renderer}
                date={moment(infoUjian.tanggalPelaksanaan).format()}
              />
            </div>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default withRouter(InformasiUjian);
