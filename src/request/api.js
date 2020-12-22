/**
 * api接口统一管理
 */
import {get,post,postFile,putFile,put,delet} from './http';
import {ipConfig} from '@/config/ipConfig';
import store from '../store/store.js'

export const user = p => get(ipConfig.urlLY + '/api/v1/user/user/', p); //获取用户
export const user_add = p => post(ipConfig.urlLY + '/api/v1/user/user/', p); //新增用户
export const user_edit = p => put(ipConfig.urlLY + '/api/v1/user/user/', p); //修改用户
export const user_del = p => delet(ipConfig.urlLY + '/api/v1/user/user/'+ p['id'], p); //删除用户


export default {
  /*ly接口*/
   user,user_add,user_edit,user_del,
}
