<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <h3 class="animated rollIn delay-1s">animate.css动画</h3>
    </div>
    <router-view/>-->
    <!-- 总体布局模式 -->
    <el-container class="appContainer">
      <el-aside width="200px">
        <index-aside></index-aside>
      </el-aside>
      <el-container>
        <el-header>
          header
        </el-header>
        <el-main>

          <el-tabs type="border-card" editable @tab-click="clickTab" @tab-remove="removeTab">
            <!-- 带图标的tab -->
            <!-- <el-tab-pane>
              <span slot="label">
                <i class="el-icon-date"></i> 我的行程
              </span>
              我的行程
            </el-tab-pane> -->
            <el-tab-pane v-for="(item, index) in tabRoute" :label="item" :key="index"></el-tab-pane>
          </el-tabs>

          <transition name="el-fade-in-linear">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabRoute:[]
    };
  },
  methods:{
    clickTab(tab){
      // tab.index是下标
      if(tab.index == this.tabIndex){
        return;
      }

      // let {tabIndex} = this;
      // 结构赋值之后，相当于重新var一个出来，
      // tabIndex != this.tabIndex
      // 结构复制的对象可以读取值，但是最好不要赋值
      // 必须加上this
      this.tabIndex = tab.index;
      
      this.$notify.info({
        title: '标签切换',
        message: `当前下标是：${this.tabIndex}`
      });
      // 下标变化时，获取到标签页里的所有路由数组,然后根据数组下标执行
      this.$router.push(this.tabRoute[this.tabIndex])
    },
  },
  watch:{
    $route(to, from) {
      // 没有找到才增加
      if(this.tabRoute.indexOf(to.fullPath) < 0){
        this.tabRoute.push(to.fullPath);
      }
    },
  },
  components: {
    // 侧边栏
    IndexAside: () => import("./components/IndexAside.vue")
  }
};
</script>


<style lang="scss" scoped>
#app {
  height: 100%;
  .appContainer {
    height: 100%;
  }
}
</style>
