import React from "react";
import {Card, Col, Progress, Row} from 'antd';

const OverViewTab = () => {
    return (
        <>
            <Row gutter={32}>
                <Col span={12}>
                    <Card type="inner" title="DAY TOTAL">
                        <Progress type="circle" width={140} percent={75}
                                  format={percent => `${percent} hr ${percent} min`}/>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card type="inner" title="WEEK TOTAL">
                        <Progress type="circle" width={140} percent={100} format={percent => `${percent} Days`}/>
                    </Card>
                </Col>

            </Row>
        </>
    );
}

export default OverViewTab;