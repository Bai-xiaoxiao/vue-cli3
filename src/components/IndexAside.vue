<template>
  <el-menu :default-active="nowMenu" class="index-aside">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>

      <el-menu-item-group>
        <template slot="title">分组一</template>

        <el-menu-item v-for="(item, index) in menuData" :key="`1-${index}`" :index="`1-${index}`" @click="routerLink(item.path)">
            {{item.name}}
        </el-menu-item>
        
        <!-- <el-menu-item index="1-1">
            <router-link class="routerLink" to="/">HelloWorld</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
            <router-link class="routerLink" to="/about">关于</router-link>
        </el-menu-item> -->
      </el-menu-item-group>

      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>

      <el-submenu index="1-4">
        <template slot="title">选项4</template>

        <el-menu-item index="1-4-1">当前视图的菜单</el-menu-item>
      </el-submenu>

    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>展开这里</span>
      </template>
        <el-menu-item-group>
            <el-menu-item v-for="(item, index) in menuData2" :key="`1-${index}`" :index="`1-${index}`" @click="routerLink(item.path)">
                {{item.name}}
            </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    props:{
        // 默认展开的菜单选项
        // 此处菜单数据由服务端返回，
        // 菜单需要有对应index来判断当前的激活菜单
        // 路由跳转时，监听当前路由是否绑定了菜单，有的话就修改这里的default显示


        // 前端控制权限： 登录之后返回用户身份标识---1-2-3-4-5
        // 列出所有的路由，根据不同的身份匹配对应的路由，然后添加到路由表中
        // 这里的菜单就只能在路由对象里加上身份字段，如果等于当前用户的身份就添加
        // （处理比较方便，不需要找服务端的数据，但是身份多起来就比较麻烦）

        // 后台直接返回能访问的页面，然后添加，这里的菜单也有对应的index（权限明显，简单，但是添加页面的时候比较麻烦）
        nowMenu:{
            default: '1-4-1'
        },

        menuData:{
            default:[
                // 假设只有一级
                {
                    name: '主页',
                    path: '/'
                },
                {
                    name: '关于我们',
                    path: '/about'
                }
            ]
        },
        menuData2:{
            default:[
                // 假设只有一级
                {
                    name: '表格',
                    path: '/shopIndex'
                },
                {
                    name: '关于我们',
                    path: '/about'
                }
            ]
        }
    },
    methods:{
        routerLink(url){
            this.$router.push(url);
        }
    }
};
</script>

<style lang="scss">
// 侧边栏的a标签
    .routerLink {
      display: block;
      height: 100%;
    }
</style>


