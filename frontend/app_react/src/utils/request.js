import axios from "axios";
import {serverUrl} from "./config";
import {getToken} from "./auth";

const instance = axios.create({
    baseURL: serverUrl,
    timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers["auth"] = getToken();
        config.headers['Access-Control-Allow-Origin'] = "*";
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Alter defaults after instance has been created
instance.defaults.headers.common['auth'] = getToken();

//
// // Add a response interceptor
// //  请求返回之后执行
// instance.interceptors.response.use(
//     function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response.data;
//     },
//     function (error) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         return Promise.reject(error);
//     }
// );

/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params  url参数
 */
export function get(url, params) {
    return instance.get(url, {params});
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function post(url, data) {
    return instance.post(url, data);
}

/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function put(url, data) {
    return instance.put(url, data);
}

/**
 * delete请求
 * @param {*} url   请求地址
 */
export function del(url) {
    return instance.delete(url);
}