export default{
    SET_KOREA(state ,response){
        console.log('4.....여긴 뮤테이션 시작')
        // state.korea = response.data
        // var kr_date=[]
        // var kr_confirmed=[]

        // for (var i = 0; i < response.data.stats.history.length; i++) {
        //      kr_date.push(response.data.stats.history[i].date.slice(0,10))
        //      kr_confirmed.push(response.data.stats.history[i].confirmed)
        //     }	
        
        // state.kr_history = kr_date
        // state.kr_confirmed = kr_confirmed
        state.kr_date2= response
        console.log('5.....여긴 뮤테이션 끝')
        
    },
    SET_ITALY(state ,response){
        state.italy=response.data.stats
        // var it_date=[];
        var it_confirmed=[];
        for (var i = 0; i < response.data.stats.history.length; i++) {
            // it_date.push(response.data.stats.history[i].date.slice(0,10))
            it_confirmed.push(response.data.stats.history[i].confirmed)
           }	
        // state.it_date= it_date;
        state.it_confirmed = it_confirmed;   

    },
    SET_CHINA(state ,response){
        var cn_confirmed=[];
        for (var i = 0; i < response.data.stats.history.length; i++) {
            cn_confirmed.push(response.data.stats.history[i].confirmed)
           }	
        state.cn_confirmed = cn_confirmed;   

    },
    SET_AMERICA(state ,response){
        var am_confirmed=[];
        for (var i = 0; i < response.data.stats.history.length; i++) {
            am_confirmed.push(response.data.stats.history[i].confirmed)
           }	
        state.am_confirmed = am_confirmed;   

    },
    SET_GLOBAL(state,global){
        state.global = global
    }
    // SET_JOBS(state ,jobs){
    //     state.jobs = jobs
    // },
    // SET_ASKS(state,asks){
    //     state.asks = asks
    // },
    // SET_USER(state,user){
    //     state.user = user
    // },
    // SET_ASK_ITEM(state,id){
    //     state.item = id
    // },
    // SET_LIST(state,list){
    //     state.list = list
    // },
}