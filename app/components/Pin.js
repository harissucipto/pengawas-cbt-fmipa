import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';

import GetPin from './GetPin';
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
      <GetPin id={id} jwt={jwt} />
    </Layout>
  );
};

export default withRouter(Info);
