import $ from 'jquery';
import React, { PureComponent } from 'react';
import { Input, Menu, Button, Layout, Icon } from 'antd';
import style from './CalculatorComp.less';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

function objDeepCopy(source) {
  // check it is the array or object
  const sourceCopy = source instanceof Array ? [] : {};

  for (const item in source) {
    if (source != null) {
      // recursively check the obj in array
      sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
  }
  return sourceCopy;
}

class CalculatorComp extends PureComponent {
  constructor(props) {
    super(props);

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.opClick = this.opClick.bind(this);
    this.numberClick = this.numberClick.bind(this);
    this.sendToBack = this.sendToBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.modeChange = this.modeChange.bind(this);

    this.state = {
      input: '',
      currentNumber: '',
      inputStr: [],
      OperatingMode: '0',
      answer: '',
    };
  }

  // deal with the delete button
  handleDelete() {
    let { input, currentNumber } = this.state;
    const { inputStr } = this.state;
    const tempStr = objDeepCopy(inputStr);

    // remove the last item in array if lenght > 0
    if (currentNumber.length !== 0) {
      currentNumber = currentNumber.substring(0, currentNumber.length - 1);
      input = input.substring(0, input.length - 1);
    } else if (tempStr.length > 0) {
      // remove the last item in array
      const lastItem = tempStr.pop();
      if (lastItem === 'exp(') {
        input = input.substring(0, input.length - 4);
      } else {
        input = input.substring(0, input.length - 1);
      }
    }


  // store back to this.state
    this.setState({
      input,
      currentNumber,
      inputStr: tempStr,
    });
  }

  numberClick(e) {
  // console.log(e.target.id);
    let { input, currentNumber } = this.state;
    // let tempStr = objDeepCopy(inputStr);
    input += e.target.id;
    currentNumber += e.target.id;

    this.setState({
      input,
      currentNumber,
    });
  }

  opClick(e) {
    let { input } = this.state;
    const { inputStr, currentNumber } = this.state;
    const tempStr = objDeepCopy(inputStr);
    input += e.target.id;

    tempStr.push(currentNumber);

    if (e.target.id === '+') {
      tempStr.push('a');
    } else {
      tempStr.push(e.target.id);
    }

    this.setState({
      input,
      inputStr: objDeepCopy(tempStr),
      currentNumber: '',
    });
  }

  sendToBack() {
    const { inputStr, OperatingMode, currentNumber } = this.state;
    // push the current one then clear
    inputStr.push(currentNumber);

    const obj = {
      InputOp: inputStr,
      OperatingMode: parseInt(OperatingMode, 0),
    };

    // sending the request 47.96.95.207:8888
    $.post('http://18.222.148.18:8888/calProcess', {
    // $.post('http://localhost:8888/calProcess', {
      first: JSON.stringify(obj),
    },
        (data) => {
        // change back to json
          let sendBackData = JSON.parse(data);

        // IDK why this is so magic that I need convert from []byte->string->json
          sendBackData = JSON.parse(sendBackData);
        // if no error show result
          if (sendBackData.ErrorMsg === 'Good') {
            let answer = '';

            // forming different answer
            if (OperatingMode === '0') {
              answer = sendBackData.Real;
            } else if (OperatingMode === '1') {
              answer = `${sendBackData.Real} + ${sendBackData.Imaginary}i`;
            } else {
              answer = `模长:${sendBackData.Real} + 角度:${sendBackData.Imaginary}`;
            }

            this.setState({
              answer,
            });
          // if there is error show error
          } else {
            this.setState({
              answer: sendBackData.ErrorMsg,
            });
          }
        });

    // reset everything
    this.setState({
      input: '',
      currentNumber: '',
      inputStr: [],
    });
  }

  modeChange(e) {
    console.log(e);
    this.setState({
      OperatingMode: e.target.id,
    });
  }

  clear() {
    this.setState({
      input: '',
      currentNumber: '',
      inputStr: [],
      OperatingMode: 0,
      answer: '',
    });
  }
  // <Button onClick={this.showState.bind(this)}> state </Button>
  // showState(){
  //   console.log(this.state);
  // }

  render() {
    const { input, answer, OperatingMode } = this.state;
    let currentName = '';
    let imagenryEnable = true;
    // remember here is string
    if (OperatingMode === '0') {
      currentName = 'Normal Mode';
      imagenryEnable = true;
    } else if (OperatingMode === '1') {
      currentName = 'Imaginary Mode';
      imagenryEnable = false;
    } else if (OperatingMode === '2') {
      currentName = 'Absolute Mode';
      imagenryEnable = false;
    } else {
      currentName = '?? Mode';
      imagenryEnable = true;
    }

    return (
      <Layout>
        <Sider className={style.Sider} width={300}>
          <h1>选择模式</h1>

          <Menu style={{ height: '100%' }} defaultSelectedKeys={['0']} mode="inline">
            <SubMenu
              key="Normal Calculation"
              title={<span><Icon type="user" /><span>Normal Calculation</span></span>}
            >
              <Menu.Item key="Real" style={{ height: '90px' }}>
                <Button id={0} onClick={this.modeChange} className={style.modeButton}> Real </Button>
              </Menu.Item>
              <Menu.Item key="Imaginary" style={{ height: '90px' }}>
                <Button
                  id={1}
                  onClick={this.modeChange}
                  className={style.modeButton}
                > Imaginary </Button>
              </Menu.Item>
              <Menu.Item key="Absolute" style={{ height: '90px' }}>
                <Button
                  id={2}
                  onClick={this.modeChange}
                  className={style.modeButton} 
                > Absolute </Button>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="One ValFunc Calculation"
              title={<span><Icon type="user" /><span>One ValFunc Calculation(Not Finish)</span></span>}
            >
              <Menu.Item key="1st Order" style={{ height: '90px' }}>
                <Button id={3} onClick={this.modeChange} className={style.modeButton}> 1st Order </Button>
              </Menu.Item>
              <Menu.Item key="2nd Order" style={{ height: '90px' }}>
                <Button 
                  id={4}
                  onClick={this.modeChange}
                  className={style.modeButton}
                > 2nd Order </Button>
              </Menu.Item>
              <Menu.Item key="3rd Order" style={{ height: '90px' }}>
                <Button
                  id={5}
                  onClick={this.modeChange}
                  className={style.modeButton} 
                > 3rd Order </Button>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="Integral Calculation"
              title={<span><Icon type="user" /><span>Integral Calculation(Not Finish)</span></span>}
            >
              <Menu.Item key="single" style={{ height: '90px' }}>
                <Button id={6} onClick={this.modeChange} className={style.modeButton}> single </Button>
              </Menu.Item>
              <Menu.Item key="double" style={{ height: '90px' }}>
                <Button 
                  id={7}
                  onClick={this.modeChange}
                  className={style.modeButton}
                > double </Button>
              </Menu.Item>
              <Menu.Item key="triple" style={{ height: '90px' }}>
                <Button
                  id={8}
                  onClick={this.modeChange}
                  className={style.modeButton} 
                > triple </Button>
              </Menu.Item>
              <Menu.Item key="quadruple" style={{ height: '90px' }}>
                <Button
                  id={9}
                  onClick={this.modeChange}
                  className={style.modeButton} 
                > quadruple </Button>
              </Menu.Item>
            </SubMenu>
          </Menu>


        </Sider>
        <Content>
          <div className={style.modeName}>
            <h1>Current Mode</h1>
            <h2>{currentName}</h2>
          </div>
          <Layout className={style.outputPanel}>
            <Content>
              <h1>Operation</h1>
              <Input className={style.outputText} value={input} placeholder="Operation" />
            </Content>
          </Layout>

          <Layout className={style.outputPanel}>
            <Content>
              <h1>Answer</h1>
              <Input value={answer} className={style.outputText} placeholder="Answer" />
            </Content>
          </Layout>
          <Layout className={style.inputPanel}>
            <Sider width={600} className={style.opPanel}>
              <div >
                <Button id="+" onClick={this.opClick} className={style.button}> + </Button>
                <Button id="-" onClick={this.opClick} className={style.button}> - </Button>
                <Button id="*" onClick={this.opClick} className={style.button}> * </Button>
                <Button id="/" onClick={this.opClick} className={style.button}> / </Button>
                <Button id="(" onClick={this.opClick} className={style.button}> ( </Button>
                <Button id=")" onClick={this.opClick} className={style.button}> ) </Button>
                <Button id="=" onClick={this.sendToBack} className={style.button}> = </Button>
                <Button id="<" onClick={this.handleDelete} className={style.button}> <Icon type="left-square-o" /> </Button>
                <Button id="^" onClick={this.opClick} className={style.button}> ^ </Button>
                <Button id="exp(" onClick={this.opClick} className={style.button}> exp </Button>
                <Button id="i" onClick={this.numberClick} disabled={imagenryEnable} className={style.button}> i </Button>
                <Button id="clear" onClick={this.clear.bind(this)} className={style.button}> clc </Button>
                <br />
              </div>
            </Sider>

            <Content>
              <Button id="1" onClick={this.numberClick} className={style.button}> 1 </Button>
              <Button id="2" onClick={this.numberClick} className={style.button}> 2 </Button>
              <Button id="3" onClick={this.numberClick} className={style.button}> 3 </Button>
              <br />
              <Button id="4" onClick={this.numberClick} className={style.button}> 4 </Button>
              <Button id="5" onClick={this.numberClick} className={style.button}> 5 </Button>
              <Button id="6" onClick={this.numberClick} className={style.button}> 6 </Button>
              <br />
              <Button id="7" onClick={this.numberClick} className={style.button}> 7 </Button>
              <Button id="8" onClick={this.numberClick} className={style.button}> 8 </Button>
              <Button id="9" onClick={this.numberClick} className={style.button}> 9 </Button>
              <br />
              <Button id="0" onClick={this.numberClick} className={style.button}> 0 </Button>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default CalculatorComp;
