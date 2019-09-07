import {Message} from "element-ui"
export default ({$axios})=>{
    $axios.onError(res=>{
        // if(res.response.data.statusCode===400){
            Message.error(res.response.data.message)
        // }
    })
}