import React from 'react';
import {Button, Card, Col, Row, Statistic} from 'antd';
import moment from "moment";

const {Countdown} = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
    console.log('finished!');
}

const TimeClockCard = () => {
    return (
        <Card title="Time Clock" style={{width: '100%', minHeight: "500px"}}>
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        moment.now();
                    </Col>
                    <Col span={12}>
                        <Statistic title="Million Seconds" value={moment.now()}/>
                    </Col>
                    <Col span={24} style={{marginTop: 32}}>
                        <Statistic title="Day Level" value={moment.now()} format="D 天 H 时 m 分 s 秒"/>
                    </Col>
                </Row>
            </div>
            <Button type="primary">Clock In</Button>
        </Card>
    )
}

export default TimeClockCard;