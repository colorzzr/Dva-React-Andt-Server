import React, { PureComponent } from 'react';
import styles from './Reversi.less';
import whiteChess from '../../assets/Reversi/white chess.png';
import blackChess from '../../assets/Reversi/black chess.png';
// import ableMove from '../../assets/Reversi/able move chess.png';


class ReversiGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      map: [],
      ableMovePos: [],
    };
  }

  componentWillMount() {
    const map = [];
    for (let i = 0; i < 8; i += 1) {
      map[i] = [];
      for (let j = 0; j < 8; j += 1) {
        map[i].push(-1);
      }
    }
    map[3][3] = 1;
    map[3][4] = 0;
    map[4][3] = 0;
    map[4][4] = 1;
    console.log(map);

// set up the initial plane
// map[27].setAttribute("src", value: DOMString)
    this.setState({
      map,
    });
  }

  render() {
    const { map } = this.state;

    const chessBoard = [];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        if (map[i][j] === 1) {
          chessBoard.push(
            <li key={(i * 8) + j}>
              <img src={whiteChess} alt="whiteChess" />
            </li>,
);
        } else if (map[i][j] === 0) {
          chessBoard.push(
            <li key={(i * 8) + j}>
              <img src={blackChess} alt="blackChess" />
            </li>,
);
        } else {
          chessBoard.push(
            <li key={(i * 8) + j} />,
);
        }
      }
    }

    return (
      <div className={styles.wholeWindow}>
        <h1 className={styles.header}>ReversiGame</h1>
        <h1 className={styles.header}> Point Vs Point </h1>
        <ul className={styles.chessplane}>
          {chessBoard}
        </ul>
      </div>
    );
  }
}

export default ReversiGame;
