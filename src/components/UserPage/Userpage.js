import React, { PureComponent } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';

class UserPage extends PureComponent {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		// const { match } = this.props;
		console.log(this.props);
	}

	render(){
		return(
			<h1> asdfasdfasdf </h1>
		);
	}
}

export default connect()(UserPage);