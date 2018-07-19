import React from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location }) {
  return (
    <MainLayout location={location}>
      <Carousel autoplay className={styles.indexPage}>
        <div><h3 className={styles.CarouselWord}>欢迎来到color的个人主页</h3></div>
        <div><h3 className={styles.CarouselWord}>这个是测试服务器</h3></div>
        <div><h3 className={styles.CarouselWord}>看什么看没见过自动换页吗</h3></div>
        <div><h1 className={styles.CarouselWord}>还不快去学习</h1></div>
      </Carousel>
    </MainLayout>
  );
}


export default connect()(IndexPage);
