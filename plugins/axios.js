import {Message} from "element-ui"
export default ({$axios,redirect})=>{
    $axios.onError(res=>{
        // if(res.response.data.statusCode===400){
            Message.error(res.response.data.message)
        // }
        if(res.response.data.statusCode===401||res.response.data.statusCode===403){
            // 利用nuxt下的redirect方法进行路由跳转,参数是一个对象
            redirect({path:"/user/login"})
        }
    })
}