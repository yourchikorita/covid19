<template>
  <div id="app">
  <tool-bar></tool-bar>
  <router-view></router-view>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'

export default {
 
  name: 'App',
  components: {
  ToolBar,
 
  }
}
</script>


<style scoped>
#app{
  padding: 20px;
}
</style>