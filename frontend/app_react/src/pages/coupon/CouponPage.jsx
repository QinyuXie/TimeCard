import React from 'react';
import CouponList from './CouponList';
import {Button} from 'antd';
import {get} from "../../utils/request";

const handleClick = () => {
    console.log(get("/test/testGet"));
}

class CouponPage extends React.Component {
    render() {
        return (
            <div>
                <CouponList/>
                <Button onClick={handleClick}>Test Controller</Button>
            </div>
        );
    }
}

export default CouponPage;