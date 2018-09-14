import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Button } from 'antd';
import { Link } from 'dva/router';
import style from './Header.less';
import UserPopWindow from '../UserPopWindow/index.js';

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  jumpToLogin() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/needLogin',
    });
  }

  render() {
    const { location, login } = this.props;
    const { status } = login;
    let loginOrUser;
    console.log(login);

    // check whether login
    if (status === true) {
      loginOrUser = <UserPopWindow />;
    } else {
      loginOrUser = (
        <Button
          className={style.LoginGid}
          onClick={this.jumpToLogin.bind(this)}
        >
          Login
        </Button>
      );
    }

    return (
      <div>
        <Row gutter={32} className={style.Header}>
          <Col span={22}>
            <Menu
              selectedKeys={[location.pathname]}
              mode="horizontal"
              theme="dark"
            >
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
              <Menu.Item key="/TunelGame" className={style.test}>
                <Link to="/TunelGame"><Icon type="smile" />Game</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} >
            {loginOrUser}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ historyDatas, login }) => ({
  historyDatas,
  login,
}))(Header);
