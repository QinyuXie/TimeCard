import {serverUrl} from "../utils/config";
import {post} from "../utils/request";

const employeeApiUrl = serverUrl + '/api/employees'

const registerServer = async (data) => {
    return post(`${employeeApiUrl}/register/`, data).then(function (res) {
        console.log(res);
        return res.data;
    })
}

const loginServer = async (data) => {
    let resonse = post(`${employeeApiUrl}/login/`, data).then(function (res) {
        if (res.status === 200) {
            let auth_token = res.headers.auth;
            if (auth_token) {
                localStorage.setItem('django_auth_token', auth_token);
                localStorage.setItem('employee_id', res.data.data.id);
            }
            // console.log(localStorage.getItem('django_auth_token'));
            //     console.log(res.data);
            return res;
        }
    });

    return resonse;
}

export {
    registerServer,
    loginServer,
}
