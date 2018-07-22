import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/counter">
        <Link to="/counter"><Icon type="frown-circle" />Counter</Link>
      </Menu.Item>
      <Menu.Item key="/Calculator">
        <Link to="/Calculator"><Icon type="calculator" />Calculator</Link>
      </Menu.Item>
      <Menu.Item key="/History">
        <Link to="/History"><Icon type="api" />History</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
