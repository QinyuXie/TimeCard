import React from 'react';
import {List, Space} from 'antd';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const couponListStyle = {
    "min-height": "350px",
}

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class CouponList extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    // componentDidMount() {
    //   this.getData(res => {
    //     this.setState({
    //       initLoading: false,
    //       data: res.results,
    //       list: res.results,
    //     });
    //   });
    // }

    // getData = callback => {
    //   reqwest({
    //     url: fakeDataUrl,
    //     type: 'json',
    //     method: 'get',
    //     contentType: 'application/json',
    //     success: res => {
    //       callback(res);
    //     },
    //   });
    // };

    render() {
        return (
            <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<a key="coupon-edit">edit</a>, <a key="coupon-more">delete</a>]}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {/*<div>{item.content}</div>*/}
                    </List.Item>
                )}
            />
        );
    }
}

export default CouponList;