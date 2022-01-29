import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from 'ant-design-vue'
import { useRouter } from "vue-router"

const router = useRouter()

export function request(config: AxiosRequestConfig) {
    // 1 创建实例
    const instance = axios.create({
        baseURL: "api",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });
    // 2 拦截器
    // 请求拦截
    instance.interceptors.request.use(
        (config) => {
            message.loading();
            return config;
        },
        (err) => {
            console.log(err);
        }
    );
    // 响应拦截
    instance.interceptors.response.use((response: AxiosResponse<any>) => {
        message.destroy();
        return response.data;
    }),
        (error: any) => {
            if (error?.response) {
                switch (error.response.status) {
                    case 400: message.error('请求错误(400)'); break;
                    case 401: router.push({ name: 'login' }); break;
                    case 403: message.error('拒绝访问(403)'); break;
                    case 404: message.error('请求出错(404)'); break;
                    case 408: message.error('请求超时(408)'); break;
                    case 500: message.error('服务器错误(500)'); break;
                    case 501: message.error('服务未实现(501)'); break;
                    case 502: message.error('网络错误(502)'); break;
                    case 503: message.error('服务不可用(503)'); break;
                    case 504: message.error('网络超时(504)'); break;
                    case 505: message.error('HTTP版本不受支持(505)'); break;
                    default: message.error(`连接出错(${error.response.status})!`);
                }
            } else {
                message.error('连接服务器失败!');
            }
            message.destroy();
            console.log(error);
        };
    // 3 返回实例，instance本身就是一个pormise
    return instance(config);
}
