<template>
  <div class="app-container">
    <el-form :model="queryFrom" label-width="100px" size="large">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-form-item label="被警告人id">
            <el-input v-model="queryFrom.warningStuId" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="警告内容">
            <el-input v-model="queryFrom.warningContent" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="warningContent" align="center" label="警告内容" />
      <el-table-column prop="warningStuId" align="center" label="被警告人id" />
      <el-table-column prop="warningIfRead" align="center" label="是否已读" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" @click="editWarning(row)" type="text"
            >编辑</el-button
          >
          <el-button size="small" @click="delWarns(row)" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="currentPage"
      :page-sizes="[1, 5, 10, 50]"
      background
      layout="total,sizes, prev, pager, next"
      @update:current-page="currentPageChange"
      @size-change="handleSizeChange"
      :total="total"
    />
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import {
  listWarn,
  // addWarn,
  editWarn,
  delWarn,
} from '../../server/api/warn-remid.js'
// import { addWarn } from '../../server/api/warn-remid'
const queryFrom = reactive({
  stuName: null,
  stuGrade: null,
  roomNumber: null,
  stuFaculty: null,
})
const tableData = ref([])
const dialogVisible = ref(false)
const { proxy } = getCurrentInstance()
const title = ref('新增')
let currentPage = ref(0)
const total = ref(0)
const sizePage = ref(10)

const getList = () => {
  listWarn({
    offset: currentPage.value * 10,
    size: sizePage.value,
    ...queryFrom,
  }).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}

const stuForm = ref({
  stuName: null,
  stuNumber: null,
  stuPhone: null,
  stuSex: null,
  stuMajor: null,
  stuFaculty: null,
  stuGrade: null,
  roomNumber: null,
})
const searchList = () => {
  getList()
}
const editWarning = (row) => {
  proxy.$modal
    .prompt('请输入修改后的警告内容')
    .then((res) => {
      return editWarn({
        warningContent: res.value,
        id: row.id,
        // warningIfRead: '0',
      })
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('修改成功')
    })
  console.log('addWarning')
}
const delWarns = (row) => {
  const id = row.id
  proxy.$modal
    .confirm('是否确定要删除警告吗')
    .then(function () {
      return delWarn(id)
    })
    .then(() => {
      proxy.$modal.msgSuccess('删除成功')
      getList()
    })
    .catch((err) => {
      console.log(err)
    })
}
const currentPageChange = (currPage) => {
  currentPage.value = currPage
  getList()
}
const handleSizeChange = (size) => {
  sizePage.value = size
  getList()
}
getList()
</script>

<style scoped lang="scss"></style>
