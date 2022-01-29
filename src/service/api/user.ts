import { request } from "../request";

export function getList() {
    return request({
        url: `/getList`,
        method: 'get',
        data: {},
        params: {}
    });
}

