<template>
  <div class="layout">
    <el-container>
      <el-aside><sideBar /></el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import sideBar from './layout/siderBar.vue'
import Header from './layout/header.vue'
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      width: 250px;
      background-color: #364056;
    }
    .el-container {
      .el-header {
        height: 60px;
      }
      .el-main {
        padding: 20px;
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
