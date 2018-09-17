import React, { PureComponent } from 'react';
import $ from 'jquery';
import { Row, Col } from 'antd';
import styles from './Reversi.less';
import whiteChess from '../../assets/Reversi/white chess.png';
import blackChess from '../../assets/Reversi/black chess.png';
// import ableMove from '../../assets/Reversi/able move chess.png';


class ReversiGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      map: [],
      movePos: [],
    };
  }

  componentWillMount() {
    const map = [];
    for (let i = 0; i < 8; i += 1) {
      map[i] = [];
      for (let j = 0; j < 8; j += 1) {
        map[i].push('_');
      }
    }
    map[3][3] = 'B';
    map[3][4] = 'W';
    map[4][3] = 'W';
    map[4][4] = 'B';
    console.log(map);

// set up the initial plane
// map[27].setAttribute("src", value: DOMString)
    this.setState({
      map,
    });
  }

  sendToBack(target) {
    console.log(target.target.id);
    const curMove = parseInt(target.target.id, 10);
    const curMoveStr = (Math.floor(curMove / 8)).toString() + (curMove % 8).toString();
    const { map } = this.state;

    const obj = {
      Move: curMoveStr,
    };


    $.post('http://localhost:8007/Reversi', {
      first: JSON.stringify(obj),
    },
    (data) => {
      console.log(data);
    // change back to json
      let sendBackData = JSON.parse(data);

    // IDK why this is so magic that I need convert from []byte->string->json
      sendBackData = JSON.parse(sendBackData);
      const { Board } = sendBackData;

      this.setState({
        map: Board,
      });
    });
  }

  render() {
    const { map } = this.state;

    const chessBoard = [];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        if (map[i][j] === 'W') {
          chessBoard.push(
            <li key={(i * 8) + j} >
              <img src={whiteChess} alt="whiteChess" />
            </li>,
          );
        } else if (map[i][j] === 'B') {
          chessBoard.push(
            <li key={(i * 8) + j}>
              <img src={blackChess} alt="blackChess" />
            </li>,
          );
        } else {
          chessBoard.push(
            <li key={(i * 8) + j} id={(i * 8) + j} onClick={this.sendToBack.bind(this)} />,
          );
        }
      }
    }

    return (
      <div className={styles.wholeWindow}>
        <h1 className={styles.header}>ReversiGame</h1>
        <div className={styles.headHolder}>
          <Row>
            <Col span={6}>
              <Row>
                <Col span={12}>
                  <img className={styles.scoreBoardTag} src={blackChess} alt="blackChess" />
                </Col>
                <Col span={12}>
                  <div className={styles.AIUserTag}>
                    <p>User</p>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <h1 className={styles.header}> Point Vs Point </h1>
            </Col>

            <Col span={6}>
              <Row>
                <Col span={12}>
                  <img className={styles.scoreBoardTag} src={whiteChess} alt="whiteChess" />
                </Col>
                <Col span={12}>
                  <div className={styles.AIUserTag}>
                    <p>AI</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <ul className={styles.chessplane}>
          {chessBoard}
        </ul>
      </div>
    );
  }
}

export default ReversiGame;
