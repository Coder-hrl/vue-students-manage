<template>
  <div class="app-container">
    <h2>宿管警告</h2>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="warningContent" align="center" label="内容" />
      <!-- <el-table-column prop="warningStuId" align="center" label="警告人id" /> -->
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button
            size="small"
            :disabled="row.warningIfRead === 1"
            @click="isRead(row)"
            type="text"
            >已读</el-button
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
import { ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { listWarn, editWarn } from '../../server/api/warn-remid'
const store = useStore()
let currentPage = ref(0)
const { proxy } = getCurrentInstance()
const sizePage = ref(10)
const total = ref(0)
const getList = () => {
  listWarn({
    offset: currentPage.value * (sizePage.value - 1),
    size: sizePage.value,
    warningStuId: store.state.userInfo.id,
  }).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}
const tableData = ref([
  // { warningContent: '宿舍进贼啦!', remindKeeperId: '2' }
])

const isRead = (row) => {
  const editRow = { ...row, warningIfRead: 1 }
  proxy.$modal
    .confirm('是否确认修改已读状态?')
    .then(function () {
      return editWarn(editRow)
    })
    .then(() => {
      proxy.$modal.msgSuccess('修改状态成功')
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

<style scoped lang="scss">
h2 {
  margin: 10px;
  border-bottom: 2px solid black;
}
</style>
