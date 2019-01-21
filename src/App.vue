<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <h3 class="animated rollIn delay-1s">animate.css动画</h3>
    </div>
    <!-- 路由视图 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .animated{
    background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
}
</style>
