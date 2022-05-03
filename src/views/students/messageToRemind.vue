<template>
  <div class="app-container">
    <h2>宿管提醒</h2>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="remindContent" align="center" label="内容" />
      <el-table-column prop="remindKeeperId" align="center" label="宿管id" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { listRemind } from '../../server/api/remind'
let currentPage = ref(0)
const sizePage = ref(10)
const total = ref(0)
const getList = () => {
  listRemind({
    offset: currentPage.value * (sizePage.value - 1),
    size: sizePage.value,
  }).then((res) => {
    tableData.value = res.records
    total.value = res.total
  })
}
const tableData = ref([
  // { remindContent: '宿舍进贼啦!', data: '2022-4-24 10:41:47' },
])
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
