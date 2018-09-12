import React, { PureComponent } from 'react';
import styles from './Reversi.less';

const map = [];

class ReversiGame extends PureComponent {


  render() {
    for (let i = 0; i < 64; i = i + 1) {
      map.push(<li key={i} />);
    }

    return (
      <div className={styles.wholeWindow}>
        <h1 className={styles.header}>ReversiGame</h1>
        <h1 className={styles.header}> Point Vs Point </h1>
        <ul className={styles.chessplane}>
          {map}
        </ul>
      </div>
    );
  }
}

export default ReversiGame;
