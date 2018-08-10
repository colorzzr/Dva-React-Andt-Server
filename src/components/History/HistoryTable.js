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
}, {
  title: 'Time',
  dataIndex: 'createdAt',
  key: 'createdAt',
}, {
  title: 'Operation Mode',
  dataIndex: 'operationMode',
  key: 'operationMode',
}];


class HistoryTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      dataCount: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { page, pageSize } = this.state;

    // get the total count
    dispatch({
      type: 'historyDatas/count',
    });

    dispatch({
      type: 'historyDatas/fetch',
      payload: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });
  }

  handleChange(pagination, fliter, sorter) {
    const { current } = pagination;
    const { dispatch } = this.props;
    console.log(pagination, fliter, sorter);

    const { pageSize } = this.state;
    dispatch({
      type: 'historyDatas/fetch',
      payload: {
        skip: (current - 1) * pageSize,
        limit: pageSize,
      },
    });

    this.setState({
      page: current,
    });
  }

  test() {
    console.log(this.state);
  }

  render() {
    const { historyDatas } = this.props;
    const { historyData, count } = historyDatas;
    const { page, pageSize } = this.state;

    // constructe the page footer
    const paginationProps = {
      current: page,
      pageSize,
      showQuickJumper: true,
      total: count,
      showTotal: total => `共 ${total} 条`,
    };


    return (
      <div>
        <h1>HHHISTORY</h1>
        <Button onClick={this.test.bind(this)}>test</Button>
        <Table
          columns={columns}
          dataSource={historyData}
          pagination={paginationProps}
          onChange={this.handleChange.bind(this)}
        />

      </div>
    );
  }
}

export default connect(({ historyDatas }) => ({
  historyDatas,
}))(HistoryTable);
