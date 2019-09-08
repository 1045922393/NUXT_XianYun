export const state =()=>({
    history:[]
})

export const mutations={
    addHistory(state,addObj){
        state.history.push(addObj)
    }
}