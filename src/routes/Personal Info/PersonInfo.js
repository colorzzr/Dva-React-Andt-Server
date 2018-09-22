import React, { PureComponent } from 'react';
import { Card, Collapse, List, Avatar, Icon } from 'antd';
import myImg from '../../assets/Personal Info/Avtar.jpg';
import styles from './PersonInfo.less';

const text = (
  <p style={{ paddingLeft: 24 }}>
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
</p>
);

const Panel = Collapse.Panel;

const listData = [];

listData.push({
  title: 'Voluntary translator in FuZhou West Lake International School',
  description: 'Being Volunteer in the summer camp (from 2016.7.7 to 2016.7.28)',
  content: 'Translate language for the foreign teachers Take care children including teaching security for 21 days',
});

listData.push({
  title: 'Info-session for first year UofT student in Vancouver',
  description: 'Participating the Info-session held by uoft Cantonese Association (2017.5.11)',
  content: 'Engage in answer the question for first year engineering students',
});

listData.push({
  title: 'IEEE Power Case Competition',
  description: 'Optimizing the energy Allocation for given senario (2017.3.17)',
  content: 'Engage in 4 students group to compute optimizing power plan, and compete with other 20 undergrade student',
}); 


const IconText = ({ type, texts }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {texts}
  </span>
);
class PersonalInfo extends PureComponent {
  render() {
    return (
      <div className={styles.background}>
        <h1> Zhan Zhiren </h1>
        <div className={styles.headInfo}>
          <h1> About Myself </h1>
          <div className={styles.shortInfo}>
            <Card className={styles.shortInfoCard}>
              <p> School: University of Toronto</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> Grade: Third Year Electric and Computer Engineer</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> Language: C, C++, Go, Javascript, Swift</p>
            </Card>
            <Card className={styles.shortInfoCard}>
              <p> GitHub: <a href="https://github.com/colorzzr">https://github.com/colorzzr</a></p>
            </Card>
          </div>

          <div className={styles.avtarImg}>
            <img src={myImg} alt="Personal img" />
          </div>
        </div>

        <div className={styles.mainContent}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={<h1 className={styles.collapseHeader}>Non-Profossional</h1>} key="1">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={listData}
                footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>)}
              />
            </Panel>
            <Panel header={<h1 className={styles.collapseHeader}>Professional Experience</h1>} key="2">
              {text}
            </Panel>
            <Panel header={<h1 className={styles.collapseHeader}>One more thing</h1>} key="3">
              <h1> There is nothing </h1>
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}


export default PersonalInfo;
