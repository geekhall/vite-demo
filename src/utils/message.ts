import { ElMessage } from 'element-plus'

export const successMsg = (msg: string) => {
  ElMessage({
    message: msg,
    grouping: true,
    type: 'success'
  })
}
export const warningMsg = (msg: string) => {
    ElMessage({
      message: msg,
      grouping: true,
      type: 'warning'
    })
  }