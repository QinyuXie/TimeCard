import {serverUrl} from "../utils/config";
import {post} from "../utils/request";
import axios from 'axios';

const apiUrl = serverUrl + '/api/time_entry/'

const add_time_entry = async (data) => {
    return post(`${apiUrl}`, data).then(function (res) {
        console.log(res);
        return res.data;
    })
}

const get_all_entry = async (id) => {
    //从本地缓存获取token添加到headers
    let token = localStorage.getItem('django_auth_token');
    let headers = {
        auth: token
    }
    let res = await axios.get(`${apiUrl}${id}/all_entry/`, {headers});
    if (res.status === 200) {
        let auth_token = res.headers.auth;
        if (auth_token) localStorage.setItem('django_auth_token', auth_token);    //刷新本地存储的token
        console.log(res);
        return res.data;
    }

}

export {
    add_time_entry,
    get_all_entry
}