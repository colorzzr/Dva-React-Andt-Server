import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';


const columns = [{
  title: 'Real',
  dataIndex: 'real',
  key: 'real',
}, {
  title: 'Imaginary',
  dataIndex: 'imaginary',
  key: 'imaginary',
}, {
  title: 'Error Massage',
  dataIndex: 'errorMsg',
  key: 'errorMsg',
},{
  title: 'Time',
  dataIndex: 'createdAt',
  key: 'createdAt',
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'historyDatas/fetch',
    });
  }



  test() {
    const { historyDatas } = this.props;
    console.log(historyDatas);
  }
  render() {
    const { historyDatas } = this.props;
    const {historyData} = historyDatas;

    // constructe the page footer
    const paginationProps = {
      showQuickJumper: true,
      pageSize: 10,
    };


    return (
      <div>
        <h1>HHHISTORY</h1>
        <Button onClick={this.test.bind(this)}>test</Button>
        <Table 
          columns={columns} 
          dataSource={historyData} 
          pagination={paginationProps}
        />
      </div>
    );
  }
}

export default connect(({ historyDatas }) => ({
  historyDatas,
}))(HistoryTable);
