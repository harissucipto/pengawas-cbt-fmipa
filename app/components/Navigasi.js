import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

const Navigasi = props => {
  const { id, jwt, pathname } = props;
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/info']}
      selectedKeys={[pathname]}
      style={{ flex: 1, minHeight: '100vh', fontSize: '3rem' }}
    >
      <Menu.Item
        key="/info"
        onClick={() =>
          props.history.push({
            pathname: '/info',
            state: { id, jwt }
          })
        }
      >
        Informasi Ujian
      </Menu.Item>

      <Menu.Item
        key="/pin"
        onClick={() =>
          props.history.push({
            pathname: '/pin',
            state: { id, jwt }
          })
        }
      >
        Pin Ujian
      </Menu.Item>
      <Menu.Item
        key="/hadir"
        onClick={() =>
          props.history.push({
            pathname: '/hadir',
            state: { id, jwt }
          })
        }
      >
        Kehadiran Peserta
      </Menu.Item>

      <Menu.Item
        key="/berita"
        onClick={() =>
          props.history.push({
            pathname: '/berita',
            state: { id, jwt }
          })
        }
      >
        Berita Acara Ujian
      </Menu.Item>

      <Menu.Item
        key="/reset"
        onClick={() =>
          props.history.push({
            pathname: '/reset',
            state: { id, jwt }
          })
        }
      >
        Reset Login Peserta
      </Menu.Item>

      <Menu.Item
        key="sub-1-2"
        onClick={() =>
          props.history.push({
            pathname: '/'
          })
        }
      >
        Setting Profil
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navigasi);
