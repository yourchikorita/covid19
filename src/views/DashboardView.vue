<template>
    <div id="all_container" style="position: relative;
    height: 800px;
    width: 1000px;
    margin: auto;">


   <!-- <test></test> -->
    
        <line-chart  ></line-chart>
      
        <!-- <bar-chart></bar-chart> -->
 
        <div id="footer">
           <p> API: https://developer.smartable.ai/</p>
            <p>developer email : yourchikorita@gmail.com</p>
        </div>
    </div>
</template>

<script>
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'

export default {
  
    components:{
        LineChart,
        BarChart
        // test
    },
   
    // created(){
    //    return  this.$store.dispatch('FETCH_KOREA'),this.$store.dispatch('FETCH_ITALY'),this.$store.dispatch('FETCH_CHINA'),this.$store.dispatch('FETCH_AMERICA')

    // }
}
</script>



<style scoped>
#footer{
    margin-top: 300px;
    color: darkgray;
    font-size: 10px;
    height: 10%
}
</style>