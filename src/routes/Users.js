import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UserPage from '../components/UserPage/Userpage.js';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UserPage />
      </div>
    </MainLayout>
  );
}

export default connect()(Users);
