<template>
  <div class="app-container">
    <el-form :model="queryFrom" label-width="100px" size="large">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-form-item label="姓名">
            <el-input v-model="queryFrom.stuName" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="年级">
            <el-input v-model="queryFrom.stuGrade" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="宿舍号">
            <el-input v-model="queryFrom.roomNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="院系">
            <el-input v-model="queryFrom.stuFaculty" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="stuName" align="center" label="姓名" width="100" />
      <el-table-column
        prop="stuNumber"
        align="center"
        label="学号"
        width="100"
      />
      <el-table-column prop="roomNumber" align="center" label="宿舍号" />
      <el-table-column prop="stuSex" align="center" label="性别" width="60" />
      <el-table-column prop="stuFaculty" align="center" label="院系" />
      <el-table-column prop="stuMajor" align="center" label="专业" />
      <el-table-column prop="stuPhone" align="center" label="手机号" />
      <el-table-column prop="stuGrade" align="center" label="年级" />
      <el-table-column prop="warningNumber" align="center" label="警告数" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" @click="editStu(row)" type="text"
            >编辑</el-button
          >
          <el-button size="small" @click="addWarning(row)" type="text"
            >警告</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[1, 5, 10, 50]"
      background
      layout="total,sizes, prev, pager, next"
      @update:current-page="currentPageChange"
      @size-change="handleSizeChange"
      :total="total"
    />
    <el-dialog v-model="dialogVisible" top="20vh" :title="title" center>
      <el-form label-width="130px" :model="stuForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="宿舍房间">
              <el-input
                v-model="stuForm.roomNumber"
                class="textarea"
              /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="学号" prop="stuNumber">
              <el-input v-model="stuForm.stuNumber" /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="stuName">
              <el-input v-model="stuForm.stuName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="院系" prop="stuMajor">
              <el-input v-model="stuForm.stuMajor" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="stuSex">
              <el-input v-model="stuForm.stuSex" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业" prop="stuFaculty">
              <el-input v-model="stuForm.stuFaculty" /> </el-form-item></el-col
        ></el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="stuPhone">
              <el-input v-model="stuForm.stuPhone" /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="stuGrade">
              <el-input v-model="stuForm.stuGrade" />
            </el-form-item> </el-col
        ></el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="AddRommd">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import {
  listStudent,
  addStudent,
  editStudent,
  delStudent,
} from '../../server/api/students'
import { addWarn } from '../../server/api/warn-remid'
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
  listStudent({
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
const addWarning = (row) => {
  proxy.$modal
    .prompt('请输入警告内容')
    .then((res) => {
      return addWarn({
        warningContent: res.value,
        warningStuId: row.id,
        warningIfRead: '0',
      })
    })
    .then(() => {
      proxy.$modal.msgSuccess('警告成功')
      getList()
    })
  console.log('addWarning')
}
const editStu = (row) => {
  stuForm.value = row
  dialogVisible.value = true
}
const AddRommd = () => {
  editStudent(stuForm).then(() => {
    console.log(1)
    proxy.$modal.msgSuccess('修改成功')
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
