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

          <el-tabs type="border-card" closable @tab-remove="removeTab">
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-date"></i> 我的行程
              </span>
              我的行程
            </el-tab-pane>
            <el-tab-pane v-for="i in 3" label="消息中心"></el-tab-pane>
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
    return {};
  },
  components: {
    // 侧边栏
    IndexAside: () => import("./components/IndexAside.vue")
  }
};
</script>


<style lang="scss">
#app {
  height: 100%;
  .appContainer {
    height: 100%;
  }
}
</style>
