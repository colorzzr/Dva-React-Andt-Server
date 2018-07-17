import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Counter from '../components/Counter';

function CounterTop({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <Counter />
      </div>
    </MainLayout>
  );
}

export default connect()(CounterTop);
