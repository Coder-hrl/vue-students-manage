<template>
  <div class="app-container">
    <el-form :model="queryFrom" label-width="100px" size="large">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-form-item label="宿舍号">
            <el-input v-model="queryFrom.roomNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="损坏设备">
            <el-select v-model="queryFrom.isDmg" placeholder="请输入">
              <el-option label="未损坏" value="0"></el-option>
              <el-option label="损坏" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="searchList">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        prop="roomNumber"
        align="center"
        label="宿舍号"
        width="100"
      />
      <el-table-column prop="dmgDesk" align="center" label="坏桌子" />
      <el-table-column prop="dmgCabinet" align="center" label="坏柜子" />
      <el-table-column prop="dmgChair" align="center" label="坏椅子" />
      <el-table-column prop="dmgWindow" align="center" label="坏窗户" />
      <el-table-column prop="dmgScreen" align="center" label="坏纱窗" />
      <el-table-column prop="dmgBed" align="center" label="坏床" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" type="text" @click="changedmg(row)"
            >修改</el-button
          >
          <el-button
            size="small"
            v-if="row.isDmg"
            :disabled="!row.isDmg"
            @click="isDmg(row)"
            type="text"
            >已修</el-button
          >
          <el-button
            size="small"
            v-else
            :disabled="row.isDmg"
            @click="isDmg(row)"
            type="text"
            >未修</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      :total="total"
      :page-sizes="[1, 5, 10, 50]"
      background
      layout="total,sizes, prev, pager, next"
      @update:current-page="currentPageChange"
    />
    <el-dialog v-model="dialogVisible" top="20vh" title="修改" center>
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
import { useStore } from 'vuex'
import { listRoomd, editRoomd } from '../../server/api/dormRoom'
const queryFrom = reactive({ roomNumber: null })
const { proxy } = getCurrentInstance()
let currentPage = ref(0)
const dialogVisible = ref(false)
const tableData = ref([])
const total = ref(0)
const store = useStore()
const getList = () => {
  listRoomd({
    ...queryFrom,
  }).then((res) => {
    console.log(res)
    tableData.value = res.records
    total.value = res.size
  })
}
const searchList = () => {
  getList()
  console.log('123')
}
const currentPageChange = (currPage) => {
  currentPage.value = currPage
  getList()
}
const isDmg = (row) => {
  const row1 = { ...row, ifDmg: '0' }
  proxy.$modal
    .confirm('宿舍是否维修成功?')
    .then(function () {
      return editRoomd(row1)
    })
    .then(() => {
      proxy.$modal.msgSuccess('修改状态成功')
      getList()
    })
    .catch((err) => {
      console.log(err)
    })
}
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
const changedmg = (row) => {
  dialogVisible.value = true
  dormForm.value = row
}
const AddRommd = () => {
  editRoomd(dormForm.value).then(() => {
    dialogVisible.value = false
    getList()
  })
}
getList()
</script>

<style scoped lang="scss"></style>
