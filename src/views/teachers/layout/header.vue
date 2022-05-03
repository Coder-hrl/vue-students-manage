<template>
  <div class="header">
    <div class="left">
      <span>欢迎来到石院宿舍管理平台,请遵守宿舍规章管理制度.</span>
    </div>
    <div class="right">
      <el-dropdown>
        <span @click="logOut" class="el-dropdown-link"> 退出系统 </span>
        <!-- <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </template> -->
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const logOut = () => {
  ElMessageBox.confirm('你确定要退出本系统吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '已退出',
      })
      router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出',
      })
    })
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid #282c34;
  .left {
    margin-left: 20px;
    flex: 1;
    span {
      color: #282c34;
      line-height: 60px;
      font-size: 22px;
    }
  }
  .right {
    flex: 1;
    .el-dropdown {
      float: right;
      right: 20px;
      .el-dropdown-link {
        font-size: 18px;
        cursor: pointer;
        line-height: 60px;
      }
    }
  }
}
</style>
