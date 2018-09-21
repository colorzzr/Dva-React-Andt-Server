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
for (let i = 0; i < 23; i += 1) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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
            <Panel header="Non-Professional Experience" key="1">
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
                    extra={<img width={272} alt="logo" src={myImg} />}
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
            <Panel header="Professional Experience" key="2">
              {text}
            </Panel>
            <Panel header="One more thing" key="3">
              <h1> There is nothing </h1>
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}


export default PersonalInfo;
