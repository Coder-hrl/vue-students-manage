<template>
  <div>
    <div class="header">
      <img src="../../../assets/image/schoolLogo.png" alt="" />
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#364056"
      class="el-menu-vertical-demo"
      default-active="studentInformation"
      text-color="#fff"
      router
    >
      <el-menu-item index="studentManagement">
        <span>学生管理</span>
      </el-menu-item>
      <el-menu-item index="dormRooms">
        <span>宿舍房间</span>
      </el-menu-item>
      <el-menu-item index="maintenanceEquipment">
        <span>维修设备</span>
      </el-menu-item>
      <el-menu-item index="sendAReminder">
        <span>发送提醒</span>
      </el-menu-item>
      <el-menu-item index="studentsAreWarned">
        <span>警告管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.header {
  width: 230px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  padding: 5px 5px;
  box-sizing: border-box;

  img {
    width: 90%;
    height: 100%;
  }
}
.el-menu {
  .el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
    }
  }
  .is-active {
    background-color: #262d3c;
  }
}
</style>
