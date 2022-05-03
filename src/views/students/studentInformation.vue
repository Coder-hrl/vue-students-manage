<template>
  <div class="app-container">
    <h2>我的信息</h2>
    <div class="item">
      <span>姓名:{{ item.stuName }}</span>
      <span class="left">性别:{{ item.stuSex }}</span>
    </div>
    <div class="item">
      <span>宿舍号:{{ item.roomNumber }}</span>
      <span class="left">院系:{{ item.stuMajor }}</span>
    </div>
    <div class="item">
      <span>学号:{{ item.stuNumber }}</span>
      <span class="left">专业:{{ item.stuFaculty }}</span>
    </div>
    <div class="item">
      <span>手机号:{{ item.stuPhone }}</span>
      <span class="left">被警告数:{{ item.warningNumber }}</span>
    </div>
    <!-- <div class="item">
      <span>id:{{ item.id }}</span>
      <span class="left">年级:{{ item.studGrade }}</span>
    </div> -->
    <el-button style="margin-top: 20px" @click="editStu" type="primary"
      >修改</el-button
    >
    <el-dialog v-model="dialogVisible" top="20vh" title="修改" center>
      <el-form :model="item" label-width="120px">
        <el-form-item label="学号" prop="stuNumber">
          <el-input v-model="item.stuNumber" />
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="item.stuName" />
        </el-form-item>
        <el-form-item label="宿舍号" prop="stuName">
          <el-input v-model="item.roomNumber" />
        </el-form-item>
        <el-form-item label="院系" prop="stuMajor">
          <el-input v-model="item.stuMajor" />
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-input v-model="item.stuSex" />
        </el-form-item>
        <el-form-item label="专业" prop="stuFaculty">
          <el-input v-model="item.stuFaculty" />
        </el-form-item>
        <el-form-item label="手机" prop="stuPhone">
          <el-input v-model="item.stuPhone" />
        </el-form-item>
        <el-form-item label="年级" prop="stuGrade">
          <el-select v-model="item.stuGrade" placeholder="">
            <el-option
              v-for="item in StuGrades"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button @click="confirmClick" type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { listStudent, editStudent } from '../../server/api/students'
const store = useStore()
const { proxy } = getCurrentInstance()
const item = computed(() => store.state.userInfo)
const dialogVisible = ref(false)
const editStu = () => {
  dialogVisible.value = true
}
const cancelClick = () => {
  dialogVisible.value = false
}
const confirmClick = () => {
  editStudent(item.value).then(() => {
    // listStudent()
    // store.commit('changeUserInfo', res.data)
    proxy.$modal.msgSuccess('修改成功')
    dialogVisible.value = false
  })
}
</script>

<style scoped lang="scss">
h2 {
  margin: 10px;
  border-bottom: 2px solid black;
}
.item {
  height: 60px;
  font-size: 18px;
  width: 600px;
  display: flex;
  padding: 0 20px;
}
.item span {
  line-height: 60px;
  text-align: center;
  width: 250px;
  border-bottom: 1px solid black;
}
.item .left {
  width: 250px;
  margin-left: 80px;
}
</style>
