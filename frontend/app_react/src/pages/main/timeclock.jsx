import React from 'react';
import {Button, Card, Col, Row, Statistic} from 'antd';
import moment from "moment";
import {add_time_entry} from "../../api/time_entry";


class TimeClockCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clocked_in: false,
            start_time: moment(),
            now: moment(),
            duration: moment.duration(),
            duration_display: moment()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.state.clocked_in ?
            this.setState({
                now: moment(),
                duration: moment.duration(this.state.now.diff(this.state.start_time)),
                duration_display: this.get_duration()
            }) :
            this.setState({
                now: moment(),
                start_time: moment(),
                duration_display: this.get_duration()

            })
    }

    get_duration() {
        return moment.utc(moment(this.state.now, "DD/MM/YYYY HH:mm:ss")
            .diff(moment(this.state.start_time, "DD/MM/YYYY HH:mm:ss")))
            .add(0.5, 'seconds');
    }

    clock_out() {
        this.setState({
            clocked_in: false,
            duration: this.get_duration(),
            duration_display: moment.utc(moment(this.state.now, "DD/MM/YYYY HH:mm:ss")
                .diff(moment(this.state.start_time, "DD/MM/YYYY HH:mm:ss")))
        });

        const id = localStorage.getItem('employee_id');
        console.log(id)
        const new_entry = {
            start_time: this.state.start_time,
            end_time: this.state.now,
            employee_id: id,
            duration: moment.utc(moment(this.state.now)
                .diff(moment(this.state.start_time)))
        }
        add_time_entry(new_entry).then(function (res) {
            console.log(res);
            // if (!res['success']) {
            //     message.error(res['mess']);
            // } else {
            //     message.success("Congradulation! You have registered successfully!");
            // }
        });
    }

    clock_in() {
        this.setState({
            start_time: moment(),
            clocked_in: true
        });
    };

    render() {
        return (
            <Card title="Time Clock" style={{width: '100%', minHeight: "500px"}}>
                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title="Status" value={this.state.clocked_in ? 'Clocked In' : 'Off the clock'}/>
                        </Col>
                        <Col span={12}>
                            <Statistic title="Duration"
                                       value={this.state.duration_display.format("HH:mm:ss")}/>

                        </Col>
                        <Col span={24} style={{marginTop: 32}}>
                            <Statistic title="Start time"
                                       value={this.state.clocked_in ? this.state.start_time : this.state.now}/>
                        </Col>
                        <Col span={24} style={{marginTop: 32}}>
                            <Statistic title="Now"
                                       value={this.state.now}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 84}}>
                        <Col span={20} offset={2}>
                            <div>
                                {
                                    this.state.clocked_in ? (
                                        <Button type="primary" size={'large'} block danger
                                                onClick={() => this.clock_out()}>Clock Out</Button>
                                    ) : (
                                        <Button type="primary" size={'large'} block onClick={() => this.clock_in()}>Clock
                                            In</Button>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        );
    };
}

export default TimeClockCard;