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
      playerPoint: 2,
      AIPoint: 2,
      winner: '',
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

    map[3][3] = 'W';
    map[3][4] = 'B';
    map[4][3] = 'B';
    map[4][4] = 'W';

    // map[0][0] = "W";
    // map[0][1] = "W";
    // map[0][2] = "W";
    // map[0][3] = "B";
    // map[0][4] = "B";
    // map[0][5] = "W";
    // map[0][7] = "W";

    // map[1][0] = "W";
    // map[1][1] = "B";
    // map[1][2] = "B";
    // map[1][3] = "B";
    // map[1][4] = "B";
    // map[1][5] = "B";
    // map[1][6] = "B";
    // map[1][7] = "W";

    // map[2][0] = "W";
    // map[2][1] = "W";
    // map[2][2] = "B";
    // map[2][3] = "W";
    // map[2][4] = "B";
    // map[2][5] = "W";
    // map[2][6] = "W";
    // map[2][7] = "W";

    // map[3][0] = "W";
    // map[3][1] = "B";
    // map[3][2] = "B";
    // map[3][3] = "B";
    // map[3][4] = "B";
    // map[3][5] = "B";
    // map[3][6] = "W";
    // map[3][7] = "W";

    // map[4][0] = "W";
    // map[4][2] = "B";
    // map[4][3] = "B";
    // map[4][4] = "B";
    // map[4][5] = "B";
    // map[4][6] = "B";
    // map[4][7] = "W";


    // map[5][0] = "W";
    // map[5][4] = "B";
    // map[5][7] = "B";


    this.setState({
      map,
    });

    // $.post('http://18.222.148.18:8007/ReversiInit', {
    //   first: '',
    // },
    // (data) => {
    //   console.log(data);
    // // change back to json
    //   let sendBackData = JSON.parse(data);

    // // IDK why this is so magic that I need convert from []byte->string->json
    //   sendBackData = JSON.parse(sendBackData);
    //   const { Board, UserPoint, AIPoint, Winner } = sendBackData;
    //   console.log(Board, UserPoint, AIPoint);

    //   this.setState({
    //     map: Board,
    //     playerPoint: UserPoint,
    //     AIPoint,
    //     winner: Winner,
    //   });
    // });
  }

  sendToBack(target) {
    // console.log(target.target.id);
    const curMove = parseInt(target.target.id, 10);
    const curMoveStr = (Math.floor(curMove / 8)).toString() + (curMove % 8).toString();

    const { map } = this.state;

    const obj = {
      Move: curMoveStr,
      Map: map,
    };

    // $.post('http://localhost:8007/Reversi', {
    $.post('http://18.223.112.55:8007/Reversi', {
      first: JSON.stringify(obj),
    },
    (data) => {
      console.log(data);
    // change back to json
      let sendBackData = JSON.parse(data);

    // IDK why this is so magic that I need convert from []byte->string->json
      sendBackData = JSON.parse(sendBackData);
      const { Board, UserPoint, AIPoint, Winner } = sendBackData;
      console.log(Board, UserPoint, AIPoint, Winner);

      this.setState({
        map: Board,
        playerPoint: UserPoint,
        AIPoint,
        winner: Winner,
      });
    });
  }

  render() {
    const { map, playerPoint, AIPoint, winner } = this.state;

    const chessBoard = [];
    // change to loading later <-----------------------look at this!
    if (map !== undefined) {
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
    }

    let scoreBoard;
    if (winner === 'AI') {
      scoreBoard = <h1 className={styles.header}> AI Wins! </h1>;
    } else if (winner === 'Player') {
      scoreBoard = <h1 className={styles.header}> Player Wins! </h1>;
    } else if (winner === 'Draw') {
      scoreBoard = <h1 className={styles.header}> Draw! </h1>;
    } else {
      scoreBoard = <h1 className={styles.header}> {playerPoint} Vs {AIPoint} </h1>;
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
              {scoreBoard}
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
