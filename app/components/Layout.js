import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';

import Navigasi from './Navigasi';
import Header from './Header';
import InformasiMulaiUjian from './InformasiMulaiUjian';
import AkhiriUjian from './AkhiriUjian';

const { Content } = Layout;

const Page = props => {
  if (!props.history.location.state) {
    return <Redirect to="/" />;
  }

  const { id, jwt } = props.history.location.state;
  const { pathname } = props.history.location;

  return (
    <Layout>
      <Header />
      <Content
        style={{
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5'
        }}
      >
        <Row style={{ flex: 1, minHeight: '100vh' }}>
          <Col xs={6} md={4}>
            <Navigasi id={id} jwt={jwt} pathname={pathname} />
          </Col>
          <Col xs={13} md={15}>
            <Row type="flex" gutter={16} style={{ padding: '40px' }}>
              <Col xs={24}>{props.children}</Col>
            </Row>
          </Col>
          <Col xs={5} md={5} style={{ padding: '40px 40px 0 0' }}>
            <InformasiMulaiUjian id={id} jwt={jwt} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(Page);
