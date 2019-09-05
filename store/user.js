export const state=()=>({
    userInfo:{
        user:{},
        token:''
    }
   })

export const mutations={
    changeuser(state,data){
      state.userInfo.user=data.user;
      state.userInfo.token=data.token;
    },
    clearuser(state){
        state.userInfo.user={};
        state.userInfo.token="";
    }
}