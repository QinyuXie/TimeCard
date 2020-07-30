import {List, message, Spin} from 'antd';
import reqwest from 'reqwest'
import React from "react";

import InfiniteScroll from 'react-infinite-scroller';

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

export default class InfiniteListExample extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.results,
            });
        });
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
                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                    description={item.email}
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
