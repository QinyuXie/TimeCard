import {Button, Col, List, message, Row, Statistic} from 'antd';
import React from "react";

import InfiniteScroll from 'react-infinite-scroller';
import {get_all_entry} from "../../api/time_entry";
import {withRouter} from "react-router";
import moment from "moment";

const infinite_container = {
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    overflow: 'auto',
    padding: '8px 24px',
    height: '380px',
}

const loading_container = {
    position: 'absolute',
    bottom: '40px',
    width: '100%',
    textAlign: 'center'
}

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class InfiniteListExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
    }


    async componentDidMount() {
        let res = await get_all_entry(localStorage.getItem('employee_id')).then(function (res) {
            // console.log(res);
            return res;
        });
        // console.log(res);
        if (res['success']) {
            this.setState({
                data: res['data'],
            });
        } else {
            message.error(res['ess']);
            this.props.history.push('/login');
        }
    }

    fetchData = async () => {
        let res = await get_all_entry(localStorage.getItem('employee_id')).then(function (res) {
            // console.log(res);
            return res;
        });
        this.setState({
            data: res['data'],
        });
    };

    // handleInfiniteOnLoad = () => {
    //     let {data} = this.state;
    //     // this.setState({
    //     //     loading: true,
    //     // });
    //     // if (data.length > 14) {
    //     //     message.warning('Infinite List loaded all');
    //     //     this.setState({
    //     //         hasMore: false,
    //     //         loading: false,
    //     //     });
    //     //     return;
    //     // }
    //     this.fetchData(res => {
    //         // data = data.concat(res.results);
    //         this.setState({
    //             data,
    //             loading: false,
    //         });
    //     });
    // };

    render() {
        return (
            <div>
                <div style={infinite_container}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        // loadMore={this.handleInfiniteOnLoad}
                        // hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    {/*<List.Item.Meta*/}
                                    {/*    // title={ <Statistic title="Start time"*/}
                                    {/*    //                    value={moment(item.start_time).format("YYYY-MM-DD HH:mm:ss")} />}*/}
                                    {/*    // description=*/}
                                    {/*/>*/}
                                    <div>
                                        <Row gutter={32}>
                                            <Col span={12}>
                                                <Statistic title="Start time"
                                                           value={moment(item.start_time).format("DD/MM/YYYY HH:mm:ss")}/>
                                            </Col>
                                            <Col span={6} offset={6}>
                                                <Statistic title="Duration"
                                                           value={moment(item.duration).format("HH:mm:ss")}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </List.Item>
                            )}
                        >
                            {/*{this.state.loading && this.state.hasMore && (*/}
                            {/*    <div style={loading_container}>*/}
                            {/*        <Spin/>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </List>
                    </InfiniteScroll>
                </div>
                <div style={{marginTop: 30}}>
                    <Row>
                        <Col span={8} offset={18}>
                            <Button size={"large"} type={"primary"} onClick={this.fetchData}>Refresh</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(InfiniteListExample);