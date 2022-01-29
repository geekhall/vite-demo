import { request } from "../request";

export function getUserInfo() {
    return request({
        url: `/element-test`,
        method: 'get',
        data: {},
        params: {}
    });
}

