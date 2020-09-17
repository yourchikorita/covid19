import {fetchKoreaData,fetchGlobalData,fetchItalyData,fetchChinaData,fetchAmericaData} from '../api/index'
export default{
     async FETCH_KOREA(context){
        const response = await fetchKoreaData()
        .then( response => { 

            console.log('2.....api에서 다 가져왔으면 실행하는 부분 actions의 속부분')



            var kr_date2=[]

             for (var i = 0; i < response.data.stats.history.length; i++) {
             kr_date2.push(response.data.stats.history[i].date.slice(0,10))
            }	
        



            console.log('3.....for 문 돌리고 나서의 부분... 여기가 진짜 데이터 완성 ..아직 뮤테이션 보내기 전')
            context.commit('SET_KOREA',kr_date2);
            
            return response; //이렇게하면 promise객체를 반환하는거라서 갖다쓸때 then 으로 쓸수있음
        })
        .catch( error => console.log(error))
    },
    async FETCH_ITALY(context){
        console.log('FETCH_ITALY');
        const response = await fetchItalyData()
        .then( response => { 
            context.commit('SET_ITALY',response)
            return response; 
        })
        .catch( error => console.log(error))
    },
    async FETCH_CHINA(context){
        console.log('FETCH_CHINA');
        const response = await fetchChinaData()
        .then( response => { 
            context.commit('SET_CHINA',response)
            return response; 
        })
        .catch( error => console.log(error))
    },
    async FETCH_AMERICA(context){
        const response = await fetchAmericaData()
        .then( response => { 
            console.log('am===',response.data)
            context.commit('SET_AMERICA',response)
            return response; 
        })
        .catch( error => console.log(error))
    },
     FETCH_GLOBAL(context){
        fetchGlobalData()
        .then( response => { 
            context.commit('SET_GLOBAL',response.data)
            console.log(response.data)
            return response; //이렇게하면 promise객체를 반환하는거라서 갖다쓸때 then 으로 쓸수있음
        })
        .catch( error => console.log(error))
    },




    // FETCH_JOBS(context){
    //     fetchJobsList()
    //     .then( response => {
    //         context.commit('SET_JOBS',response.data)
    //     })
    //     .catch( error => console.log(error))

    // },
    // FETCH_ASKS({commit}){
    //     fetchAskList()
    //     .then( ({data}) => {
    //         commit('SET_ASKS',data)
    //         console.log('여긴됐따능')
    //     })
    //     .catch( error => console.log(error))
    // },
    // FETCH_USER({commit},name){
    //     return fetchUserInfo(name)
    //     .then( ({data}) => {
    //         commit('SET_USER',data)
    //     })
    //     .catch( error => console.log(error))
    // },
    // async FETCH_USER({commit},name){
    //    const response = await fetchUserInfo(name);
    //    commit('SET_USER',response.data)
    //    return response

    // },

}