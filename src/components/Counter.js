import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
/*
class Counter extends React.Component {
  constructor(props) {
super(props);

this.state = { number: 55 };
this.add = this.add.bind(this);
this.lose = this.lose.bind(this);
  }

  add() {
// const num = this.state.number;
// this.setState({number:num + 1});
    this.state.number = this.state.number + 1;
    console.log(this.state.number);
  }
  lose() {
    const num = this.state.number;
    this.setState({ number: num - 1 });
    console.log(this.state.number);
  }

  render() {
    return (
      <div>
        <h2>Count:{this.state.number}</h2>
        <h2>Count:{counterMod}</h2>
        <Button onClick={this.add}> Click! </Button>
        <Button onClick={this.lose}> Lose! </Button>
      </div>
    );
  }
}
*/

const Counter = ({ dispatch, counterMod }) => {
  const style1 = {
    backgroundColor: '#1fde11',
    color: '#324',
    textAlign: 'center',
  };

  function add() {
    dispatch({
      type: 'counterMod/add',
    });
  }

  function minus() {
    dispatch({
      type: 'counterMod/minus',
    });
  }

  return (
    <div>
      <Row>
        <Col style={style1}>
          <h2>Count:{counterMod}</h2>
          <Button onClick={add}> add ! </Button>
          <Button onClick={minus}> minus ! </Button>
        </Col>
      </Row>
    </div>
  );
};


export default connect(({ counterMod }) => ({
  counterMod,
}))(Counter);