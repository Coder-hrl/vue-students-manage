<template>
  <div class="app-container">
    <h2>我要举报</h2>
    <el-form label-width="100px" :model="form">
      <el-row>
        <el-col :span="10">
          <el-form-item label="提醒内容">
            <el-input
              type="textarea"
              v-model="form.remindContent"
              :rows="10"
              class="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="addSend">发送</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { addRemind } from '../../server/api/other'
const { proxy } = getCurrentInstance()
const store = useStore()
const form = ref({
  remindContent: null,
  remindStuId: store.state.userInfo.id,
})
const addSend = () => {
  proxy.$modal
    .confirm('是否确认提交提醒内容')
    .then(function () {
      console.log(form.value)
      return addRemind(form.value)
    })
    .then(() => {
      proxy.$modal.msgSuccess('已发送到宿管')
      form.value = {
        remindContent: null,
        remindStuId: store.state.userInfo.id,
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="scss">
h2 {
  margin: 10px;
  border-bottom: 2px solid black;
}
.textarea {
  height: 250px;
  width: 600px;
}
.el-form {
  .el-button {
    font-size: 18px;
    margin-left: 80px;
    width: 100px;
    height: 50px;
  }
}
</style>
