import $ from 'jquery';
import React, { PureComponent } from 'react';
import { Input, Button, Layout } from 'antd';
import { connect } from 'dva';
import style from './CalculatorComp.less';
import GeneralMenu from './GeneralMenu.js';
import NormalPanel from './NormalPanel.js';
import HigherOrderPanel from './HigherOrderPanel.js';
import SingleInterPanel from './singleInterPanel.js';

const { Content, Sider, Header } = Layout;

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

    const { login } = this.props;
    const { status } = login;
    if (!status) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/needLogin',
      });
    }

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.opClick = this.opClick.bind(this);
    this.numberClick = this.numberClick.bind(this);
    this.sendToBack = this.sendToBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.modeChange = this.modeChange.bind(this);
    this.switchInputWindow = this.switchInputWindow.bind(this);
    this.finishInputIL = this.finishInputIL.bind(this);

    this.state = {
      input: '',
      currentNumber: '',
      inputStr: [],
      OperatingMode: '0',
      answer: '',

      // here is the state of intergral change later
      /** ************************************
       * 0 is the normal input window       *
       * 1 is the upper limit input window  *
       * 2 is the lower limit input window  *
       ************************************* */
      inputPos: 0,
      upperBound: '',
      lowerBound: '',
    };
  }

  // deal with the delete button
  handleDelete() {
    const { inputPos } = this.state;
    if (inputPos === 0) {
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
    } else if (inputPos === 1) {
      let { upperBound } = this.state;
      if (upperBound.length !== 0) {
        upperBound = upperBound.substring(0, upperBound.length - 1);
      }
      this.setState({
        upperBound,
      });
    } else {
      let { lowerBound } = this.state;
      if (lowerBound.length !== 0) {
        lowerBound = lowerBound.substring(0, lowerBound.length - 1);
      }
      this.setState({
        lowerBound,
      });
    }
  }

  numberClick(e) {
    let { input, currentNumber } = this.state;
    const { inputPos } = this.state;
    // let tempStr = objDeepCopy(inputStr);
    input += e.target.id;
    currentNumber += e.target.id;

    if (inputPos === 0) {
      this.setState({
        input,
        currentNumber,
      });
    } else if (inputPos === 1) {
      this.setState({
        upperBound: currentNumber,
        currentNumber,
      });
    } else {
      this.setState({
        lowerBound: currentNumber,
        currentNumber,
      });
    }
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
    const { inputStr, OperatingMode, currentNumber, input } = this.state;
    const { upperBound, lowerBound } = this.state;
    // push the current one then clear
    inputStr.push(currentNumber);

    const obj = {
      InputOp: inputStr,
      OperatingMode: parseInt(OperatingMode, 0),
      EquationText: input,
      extra: {
        upperBound,
        lowerBound,
      },
    };

    // sending the request 47.96.95.207:8888
    // $.post('http://18.222.148.18:8888/calProcess', {
    $.post('http://localhost:8888/calProcess', {
      first: JSON.stringify(obj),
    },
        (data) => {
        // change back to json
          let sendBackData = JSON.parse(data);

        // IDK why this is so magic that I need convert from []byte->string->json
          sendBackData = JSON.parse(sendBackData);
        // if no error show result
          if (sendBackData.ErrorMsg === 'Good') {
            const answer = sendBackData.Answer;
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
      upperBound: '',
      lowerBound: '',
    });
  }

  modeChange(e) {
    // console.log(e);
    this.setState({
      input: '',
      currentNumber: '',
      inputStr: [],
      OperatingMode: e.key,
      answer: '',
    });

    // AND reset aall
  }

  clear() {
    this.setState({
      input: '',
      currentNumber: '',
      inputStr: [],
      answer: '',
      inputPos: 0,
      upperBound: '',
      lowerBound: '',
    });
  }

  // setting the upper case or lower case
  switchInputWindow(e) {
    console.log(e.target.id);
    if (e.target.id === 'Upper') {
      this.setState({
        inputPos: 1,
        currentNumber: '',
      });
    } else {
      this.setState({
        inputPos: 2,
        currentNumber: '',
      });
    }
  }

  // click ok when finish the limit input
  finishInputIL() {
    this.setState({
      inputPos: 0,
    });
  }

  render() {
    const { input, answer, OperatingMode, upperBound, lowerBound } = this.state;
    let currentName = '';
    let operationalPanel;
    let inoutText;
    // remember here is string
    if (OperatingMode === '0') {
      currentName = 'Normal Mode';
      operationalPanel =
        (<NormalPanel
          sendToBack={this.sendToBack}
          opClick={this.opClick}
          handleDelete={this.handleDelete}
          numberClick={this.numberClick}
          clear={this.clear.bind(this)}
          imagenryEnable
        />);
    } else if (OperatingMode === '1') {
      currentName = 'Imaginary Mode';
      operationalPanel =
        (<NormalPanel
          sendToBack={this.sendToBack}
          opClick={this.opClick}
          handleDelete={this.handleDelete}
          numberClick={this.numberClick}
          clear={this.clear.bind(this)}
          imagenryEnable={false}
        />);
    } else if (OperatingMode === '2') {
      currentName = 'Absolute Mode';
      operationalPanel =
        (<NormalPanel
          sendToBack={this.sendToBack}
          opClick={this.opClick}
          handleDelete={this.handleDelete}
          numberClick={this.numberClick}
          clear={this.clear.bind(this)}
          imagenryEnable={false}
        />);
    } else if (OperatingMode === '3') {
      currentName = 'Higher Order Mode';
      operationalPanel =
        (<HigherOrderPanel
          sendToBack={this.sendToBack}
          opClick={this.opClick}
          handleDelete={this.handleDelete}
          numberClick={this.numberClick}
          clear={this.clear.bind(this)}
        />);
    } else if (OperatingMode === '4') {
      currentName = 'Single Intergral Mode';
      operationalPanel =
        (<SingleInterPanel
          sendToBack={this.sendToBack}
          opClick={this.opClick}
          handleDelete={this.handleDelete}
          numberClick={this.numberClick}
          clear={this.clear.bind(this)}
        />);
    } else {
      currentName = '?? Mode';
    }

    // switch the input && output text shown based on mode
    if (OperatingMode === '0' || OperatingMode === '1' || OperatingMode === '2' || OperatingMode === '3') {
      inoutText = (
        <div>
          <Layout className={style.outputPanel} style={{ background: '#fff' }}>
            <Header style={{ background: '#cde' }}><h1>Operation</h1></Header>
            <Content>
              <Input className={style.outputText} value={input} placeholder="Operation" />
            </Content>
          </Layout>

          <Layout className={style.outputPanel} style={{ background: '#fff' }}>
            <Header style={{ background: '#cde' }}><h1>Answer</h1></Header>
            <Content>
              <Input value={answer} className={style.outputText} placeholder="Answer" />
            </Content>
          </Layout>
        </div>);
    } else {
      inoutText = (
        <div>
          <Layout className={style.outputPanel} style={{ background: '#fff' }}>
            <Header style={{ background: '#cde' }}><h1>Operation</h1></Header>
            <Layout style={{ background: '#fff' }}>
              <Sider width={200}>
                <div style={{ background: '#ccc' }}>
                  <ul className={style.IntergralInout}>
                    <li>
                      <Button id="Upper" onClick={this.switchInputWindow}> Upper </Button>
                      <Button id="UpperOK" onClick={this.finishInputIL}> OK </Button>
                    </li>
                    <li>
                      <Input value={upperBound} placeholder="UpperInput" />
                    </li>

                    <li>
                      <Button id="Lower" onClick={this.switchInputWindow}> Lower </Button>
                      <Button id="LowerOK" onClick={this.finishInputIL}> OK </Button>
                    </li>
                    <li>
                      <Input value={lowerBound} placeholder="LowerInput" />
                    </li>
                  </ul>


                </div>
              </Sider>
              <Content>
                <Input className={style.outputText} value={input} placeholder="Operation" />
              </Content>
            </Layout>
          </Layout>

          <Layout className={style.outputPanel} style={{ background: '#fff' }}>
            <Header style={{ background: '#cde' }}><h1>Answer</h1></Header>
            <Content>
              <Input value={answer} className={style.outputText} placeholder="Answer" />
            </Content>
          </Layout>
        </div>);
    }

    return (
      <Layout style={{ background: '#fff' }}>
        <Sider className={style.Sider} width={300}>
          <h1>选择模式</h1>
          <GeneralMenu modeChange={this.modeChange} />


        </Sider>
        <Content>
          <div className={style.modeName}>
            <h1>Current Mode</h1>
            <h2>{currentName}</h2>
          </div>
          {inoutText}
          <Layout className={style.inputPanel} style={{ background: '#fff' }}>
            <Sider width={600} className={style.opPanel}>
              {operationalPanel}
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

export default connect(({ login }) => ({
  login,
}))(CalculatorComp);
