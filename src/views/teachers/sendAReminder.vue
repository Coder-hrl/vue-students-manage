<template>
  <div class="app-container">
    <el-form :model="queryFrom" label-width="100px" size="large">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-form-item label="内容">
            <el-input v-model="queryFrom.remindContent" />
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button type="primary" @click="addNotes" class="create"
            >发送新的提醒</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="remindContent" align="center" label="内容" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" type="text" @click="editForm(row)"
            >编辑</el-button
          >
          <el-button size="small" type="text" @click="delForm(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="currentPage"
      :total="total"
      :page-sizes="[1, 5, 10, 50]"
      background
      layout="total,sizes, prev, pager, next"
      @update:current-page="currentPageChange"
    />
    <el-dialog
      v-model="dialogVisible"
      top="20vh"
      width="60%"
      :title="title"
      center
    >
      <el-form label-width="100px" :model="form">
        <el-form-item label="提醒内容">
          <el-input
            type="textarea"
            v-model="form.remindContent"
            :rows="10"
            class="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNotes">发送</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import {
  listRemind,
  addRemind,
  editRemind,
  delRemind,
} from '../../server/api/remind'
const queryFrom = reactive({ remindContent: null })
const { proxy } = getCurrentInstance()
let currentPage = ref(0)
const sizePage = ref(10)
const total = ref(0)
const title = ref('发送提醒内容')
const dialogVisible = ref(false)
const store = useStore()
const tableData = ref([])
const form = ref({
  remindContent: null,
  remindKeeperId: store.state.userInfo.id,
})
const getList = () => {
  listRemind({
    offset: currentPage.value * (sizePage.value - 1),
    size: sizePage.value,
    ...queryFrom,
  }).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}
const editForm = (row) => {
  form.value = row
  title.value = '修改'
  dialogVisible.value = true
}
const delForm = (row) => {
  const id = row.id
  proxy.$modal
    .confirm('是否确定要删除提醒吗')
    .then(function () {
      return delRemind(id)
    })
    .then(() => {
      proxy.$modal.msgSuccess('删除成功')
      getList()
    })
    .catch((err) => {
      console.log(err)
    })
}
const searchList = () => {
  console.log('123')
  getList()
}
const addNotes = () => {
  dialogVisible.value = true
}
const submitNotes = () => {
  if (title.value == '发送提醒内容') {
    addRemind(form.value).then((res) => {
      console.log(res)
      proxy.$modal.msgSuccess('新增成功')
      dialogVisible.value = false
      getList()
    })
  } else {
    editRemind(form.value).then((res) => {
      proxy.$modal.msgSuccess('修改成功')
      dialogVisible.value = false
      getList()
    })
  }
}
const currentPageChange = (currPage) => {
  currentPage.value = currPage
  getList()
}
getList()
</script>

<style scoped lang="scss">
.textarea {
  margin: 20px 0;
  height: 250px;
  width: 600px;
}
.el-dialog {
  .el-form {
    .el-form-item {
      .el-button {
        display: block;
        width: 100px;
        height: 50px;
        font-size: 18px;
      }
    }
  }
}
</style>
