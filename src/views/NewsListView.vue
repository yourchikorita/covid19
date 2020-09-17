<template>
    <div>
        newslist
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        get_KR_hostpital(){
             return axios.get('http://coronavirus-smartable.p.rapidapi.com/news/v1/KR?ServiceKey=8b31c440ebmshe14d40cdfd2a7aep11cfe1jsnf4524782f7d3&pageNo=1&numOfRows=10&spclAdmTyCd=A0'
             ,)
				
				.then((res)=>{ console.log(res)})
				.catch((error)=>{console.log(error)})
            },
            

            
    },
    created() {
        this.get_KR_hostpital()
    },
}
</script>