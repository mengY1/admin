import axios from "axios";
import { Message, Loading } from 'element-ui';
let AUTH_TOKEN = (function () {
    return sessionStorage.getItem('token')
})();

var instance = axios.create({});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let loading  //定义loading变量
 
function startLoading() { //使用Element loading-start 方法
 loading = Loading.service({
  lock: true,
  text: '拼命加载中……',
  background: 'rgba(0, 0, 0, 0.7)'
 })
}
function endLoading() { //使用Element loading-close 方法
 loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
 if (needLoadingRequestCount === 0) {
  startLoading()
 }
 needLoadingRequestCount++
}
 
export function tryHideFullScreenLoading() {
 if (needLoadingRequestCount <= 0) return
 needLoadingRequestCount--
 if (needLoadingRequestCount === 0) {
  endLoading()
 }
}
instance.interceptors.request.use(function (config) {
    let url = config.url;
    // if (url.indexOf("outLogin")) {
    //     config.headers.ContentType = "application/x-www-form-urlencoded";
    // }
        if (url.indexOf("login") > -1) {
            sessionStorage.setItem('token', "");
            config.headers.Authorization = "";
        }
        if (url.indexOf("login") == -1) {
            var token = ' '
            token += sessionStorage.getItem('token')
            config.headers.Authorization = "Bearer" + token
        }
        showFullScreenLoading()
        return config;
    },
    function (err) {
        return Promise.reject(err)
    });

    
instance.interceptors.response.use(function (res) {
    if (res.headers.token) {
        sessionStorage.setItem('token', res.headers.token);
    }
    tryHideFullScreenLoading()
    return res;
}, function (err) {
    tryHideFullScreenLoading()
    if (err.response.status == 422) {
      return Promise.reject(err.response.data)
   }else if(err.response.status == 401){
       sessionStorage.removeItem("user")
       sessionStorage.removeItem("token")
       location.href = '/';
   }else if(err.response.status == 404){
    alert("资源不存在")
   }else if(err.response.status == 429){
    alert("接口请求频繁")
   }else if(err.response.status == 403){
    alert("暂无操作权限")
   }else if(err.response.status == 500){
    alert("服务器错误")
   }
});
export default instance;