import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Layout, Form, Input, Icon, Button } from 'antd';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from './PesanError';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($pinPengawas: String!, $pinUjian: String!) {
    loginPengawas(pinPengawas: $pinPengawas, pinUjian: $pinUjian) {
      jwt
      id
    }
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h1 {
    display: inline-block;
    color: rgba(0, 0, 0, 0.85);
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
  margin-top: 12px;
  margin-bottom: 40px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
`;

class Login extends Component {
  state = {
    pinPengawas: '318zJbybeG',
    pinUjian: '-eQbQ663g'
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <div style={{ width: '400px', marginTop: '12rem' }}>
          <Logo>
            <img src="./logo.svg" alt="logo" />
            <h1>CBT FMIPA UR</h1>
          </Logo>
          <SubLogo>
            <p>Aplikasi Pengawas Ujian Computer Based Test FMIPA UR</p>
          </SubLogo>
          <Mutation
            mutation={SIGNIN_MUTATION}
            variables={this.state}
            onCompleted={data => {
              this.props.history.push({
                pathname: '/info',
                state: data.loginPengawas
              });
            }}
          >
            {(loginPengawas, { error, loading, data }) => {
              if (error) console.log(error);

              if (loading) return <p>loading...</p>;
              if (data) console.log(data);
              return (
                <Form
                  onSubmit={async e => {
                    e.preventDefault();
                    await loginPengawas();
                  }}
                  className="login-form"
                  style={{ maxWidth: '100%' }}
                >
                  {error && <PesanError error={error} />}
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      name="pinPengawas"
                      onChange={this.saveToState}
                      required
                      value={this.state.pinPengawas}
                      placeholder="Pin Pengawas"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="file"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      name="pinUjian"
                      value={this.state.pinUjian}
                      onChange={this.saveToState}
                      required
                      placeholder="Pin Ujian"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: '100%' }}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          </Mutation>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);
export { Logo, SubLogo };
