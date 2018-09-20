import React from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <Carousel autoplay className={styles.indexPage}>
        <div><h3 className={styles.CarouselWord}>Welcome to Color's Web Page</h3></div>
        <div><h3 className={styles.CarouselWord}>This is test server</h3></div>
        <div><h3 className={styles.CarouselWord}>There is nothing after this</h3></div>
        <div><h1 className={styles.CarouselWord}>NOW GO BACK TO STUDY!</h1></div>
      </Carousel>
    </MainLayout>
  );
}


export default connect()(IndexPage);
