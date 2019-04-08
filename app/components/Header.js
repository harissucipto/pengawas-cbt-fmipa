import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { white } from 'ansi-colors';

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1 {
    display: inline-block;
    font-weight: 600;
    font-size: 33px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    padding: 0;
    margin: 0;
  }
  img {
    display: inline-block;
    vertical-align: middle;
    height: 44px;
    margin-right: 16px;
  }
`;

const SubLogo = styled.div`
  text-align: center;

  font-size: 14px;
`;

export default class Header extends Component {
  render() {
    return (
      <Layout.Header
        style={{ height: '10rem', color: 'white', paddingTop: '10px' }}
      >
        <Logo>
          <img src="./logo.svg" alt="logo" />
          <h1 style={{ color: 'white' }}>CBT FMIPA UR</h1>
        </Logo>
        <SubLogo>
          <p style={{ color: 'white' }}>
            Aplikasi Pengawas Ujian Computer Based Test FMIPA UR
          </p>
        </SubLogo>
      </Layout.Header>
    );
  }
}
