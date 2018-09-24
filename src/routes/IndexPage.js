import React from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.CarouseHolder}>
        <Carousel autoplay className={styles.indexPage}>
          <div><h3 className={styles.CarouselWord}>{"Welcome to Color's Web Page"}</h3></div>
          <div><h3 className={styles.CarouselWord}>This is test server</h3></div>
          <div><h3 className={styles.CarouselWord}>There is nothing after this</h3></div>
          <div><h1 className={styles.CarouselWord}>NOW GO BACK TO STUDY!</h1></div>
        </Carousel>
      </div>
      <div>
        <h1> Under-Construction </h1>
        <h3> Persional Page </h3>
        <h3> Calculator Higher Order </h3>
        <h3> Tube Game Page </h3>
        <h3> Login Cookie </h3>
        <h3> Main Layout </h3>

        <br />
        <h1> Done </h1>
        <h3> History Page </h3>
        <h3> Reversi Page </h3>

      </div>
    </MainLayout>
  );
}


export default connect()(IndexPage);

