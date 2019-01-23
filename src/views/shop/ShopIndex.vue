<template>
  <div class="home">
    <el-table :data="tableData" highlight-current-row border fit="false" style="width: 100%">
      <!-- el-table可以写style样式 -->
      <el-table-column prop="name" label="姓名" width="300">
        <!-- 宽度px -->
      </el-table-column>
      <el-table-column prop="id" label="店铺ID" width="100"></el-table-column>
      <el-table-column prop="area" label="地址" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <!-- 自定义表头 -->
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <!-- 自定义内容 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleClick(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [] // 表格数据
    };
  },
  methods: {
    handleClick(data) {
      // 返回当前的行的数据
      debugger;
    },
    del(data) {
      this.tableData.splice(data.$index, 1);
    }
  },
  created() {
    this.$api.shop.shopList().then(res => {
      this.tableData = res.data.list;
    });
  }
};
</script>
