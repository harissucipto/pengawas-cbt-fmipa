import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';

import Peserta from './Berita';
import Layout from './Layout';
import Navigasi from './Navigasi';
import Header from './Header';

const { Content } = Layout;

const Info = props => {
  if (!props.history.location.state) {
    return <Redirect to="/" />;
  }
  const { id, jwt } = props.history.location.state;

  return (
    <Layout>
      <Peserta
        id={id}
        jwt={jwt}
        grid={{
          gutter: 16,
          lg: 3,
          md: 2,
          xs: 1
        }}
      />
    </Layout>
  );
};

export default withRouter(Info);
