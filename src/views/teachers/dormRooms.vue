<template>
  <div class="app-container">
    <el-form :model="queryFrom" label-width="100px" size="large">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="宿舍号">
            <el-input v-model="queryFrom.roomNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-button type="primary" @click="searchList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" @click="addRoom" class="create">新增</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="roomNumber" align="center" label="宿舍号" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" @click="delRoom(row)" type="text"
            >删除</el-button
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
      <el-form label-width="130px" :model="dormForm">
        <el-form-item label="宿舍房间">
          <el-input v-model="dormForm.roomNumber" class="textarea" />
        </el-form-item>
        <el-form-item label="是否有损坏" prop="ifDmg">
          <el-radio
            v-model="dormForm.ifDmg"
            @change="change"
            label="0"
            size="large"
            >无损坏</el-radio
          >
          <el-radio
            v-model="dormForm.ifDmg"
            @change="change"
            label="1"
            size="large"
            >有损坏</el-radio
          >
        </el-form-item>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的桌子">
              <el-input v-model="dormForm.dmgDesk" class="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的桌子">
              <el-input v-model="dormForm.undmgDesk" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的柜子">
              <el-input v-model="dormForm.dmgCabinet" class="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的柜子">
              <el-input v-model="dormForm.undmgCabinet" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的椅子">
              <el-input v-model="dormForm.dmgChair" class="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的椅子">
              <el-input v-model="dormForm.undmgChair" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的窗户">
              <el-input v-model="dormForm.dmgWindow" class="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的窗户">
              <el-input v-model="dormForm.undmgWindow" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的纱窗">
              <el-input v-model="dormForm.dmgScreen" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的纱窗">
              <el-input v-model="dormForm.undmgScreen" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的床">
              <el-input v-model="dormForm.dmgBed" class="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的床">
              <el-input v-model="dormForm.undmgBed" class="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
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
  listRoomd,
  addRoomd,
  editRoomd,
  deleteRoomd,
} from '../../server/api/dormRoom'
// 查询form
const dialogVisible = ref(false)
const queryFrom = reactive({
  roomNumber: null,
})
const { proxy } = getCurrentInstance()
let currentPage = ref(0)
const sizePage = ref(10)
const total = ref(0)

const getList = () => {
  listRoomd({
    offset: currentPage.value * 10,
    size: sizePage.value,
    ...queryFrom,
  }).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}
const searchList = () => {
  getList()
}
const title = ref('新增')
const dormForm = ref({
  ifDmg: '',
  roomNumber: null,
  umdmgDesk: null,
  dmgDesk: null,
  undmgCabinet: null,
  dmgCabinet: null,
  undmgChair: null,
  dmgChair: null,
  undmgWindow: null,
  dmgWindow: null,
  undmgScreen: null,
  dmgScreen: null,
  undmgBed: null,
  dmgBed: null,
})
const addRoom = () => {
  dialogVisible.value = true
  dormForm.value = {
    ifDmg: '',
    roomNumber: null,
    undmgDesk: null,
    dmgDesk: null,
    undmgCabinet: null,
    dmgCabinet: null,
    undmgChair: null,
    dmgChair: null,
    undmgWindow: null,
    dmgWindow: null,
    undmgScreen: null,
    dmgScreen: null,
    undmgBed: null,
    dmgBed: null,
  }
}
// 确定按钮
const AddRommd = () => {
  if (title.value == '新增') {
    addRoomd(dormForm.value).then(() => {
      dialogVisible.value = false
      getList()
    })
  }
}
// 修改
const editInfo = (row) => {
  dialogVisible.value = true
  title.value = '修改'
  dormForm.value = row
}
const delRoom = (row) => {
  const id = row.id
  proxy.$modal
    .confirm('是否确定要删除' + row.roomNumber + '吗')
    .then(function () {
      return deleteRoomd(id)
    })
    .then(() => {
      proxy.$modal.msgSuccess('删除成功')
      getList()
    })
    .catch((err) => {
      console.log(err)
    })
}
// 显示层
// 表格元素
const tableData = ref([])
// 查询方法
const change = (value) => {
  console.log(value)
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

<style scoped lang="scss">
.create {
  margin-bottom: 20px;
}
</style>
