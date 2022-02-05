/**
 * 封装Promise版本的定时器
 * @param delay 延迟时间
 */
export function wait(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}
