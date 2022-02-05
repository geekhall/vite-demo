import { request } from "../request";

export function getUser() {
    return request({
        url: `/getUser`,
        method: 'get',
        data: {},
        params: {}
    });
}

