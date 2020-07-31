import {List, message, Spin} from 'antd';
import reqwest from 'reqwest'
import React from "react";

import InfiniteScroll from 'react-infinite-scroller';
import {get_all_entry} from "../../api/time_entry";
import {withRouter} from "react-router";

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

    fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    handleInfiniteOnLoad = () => {
        let {data} = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    render() {
        return (
            <div style={infinite_container}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[<a key="list-loadmore-edit">edit</a>,
                                           <a key="list-loadmore-more">more</a>]}
                            >
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.start_time}</a>}
                                    // description=
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div style={loading_container}>
                                <Spin/>
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(InfiniteListExample);