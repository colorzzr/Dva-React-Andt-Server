import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

class HistoryTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }


  test() {
    const { dispatch } = this.props;
    dispatch({
      type: 'history/fetch',
    });
  }
  render() {
    return (
      <div>
        <h1>HHHISTORY</h1>
        <Button onClick={this.test.bind(this)}>test</Button>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default connect(({ history }) => ({
  history,
}))(HistoryTable);
