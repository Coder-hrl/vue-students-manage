<template>
  <div class="app-container">
    <h2>宿舍报修</h2>
    <el-button type="primary" @click="addRoom">新增报修</el-button>
    <div class="item">
      <span>宿舍号:{{ room.roomNumber }}</span>
      <span class="left"
        >是否需要维修:{{ room.ifDmg === 1 ? '损坏' : '未损坏' }}</span
      >
    </div>
    <div class="item">
      <span>损坏的桌子:{{ room.dmgDesk }}</span>
      <span class="left">未损坏的桌子:{{ room.undmgDesk }}</span>
    </div>
    <div class="item">
      <span>损坏的椅子:{{ room.dmgChair }}</span>
      <span class="left">未损坏的椅子:{{ room.undmgChair }}</span>
    </div>
    <div class="item">
      <span>损坏的床:{{ room.dmgBed }}</span>
      <span class="left">未损坏的床:{{ room.undmgBed }}</span>
    </div>
    <div class="item">
      <span>损坏的窗户:{{ room.dmgCabinet }}</span>
      <span class="left">未损坏的窗户:{{ room.undmgCabinet }}</span>
    </div>
    <div class="item">
      <span>损坏的纱窗:{{ room.dmgScreen }}</span>
      <span class="left">未损坏的纱窗:{{ room.undmgScreen }}</span>
    </div>
    <el-dialog v-model="dialogVisible" top="20vh" :title="title" center>
      <el-form label-width="130px" :model="dormForm">
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="是否损坏">
              <span>是</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="宿舍号">
              <span>{{ store.state.userInfo.roomNumber }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的桌子">
              <el-input v-model="dormForm.dmgDesk" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的桌子">
              <el-input v-model="dormForm.undmgDesk" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的柜子">
              <el-input v-model="dormForm.dmgCabinet" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的柜子">
              <el-input v-model="dormForm.undmgCabinet" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的椅子">
              <el-input v-model="dormForm.dmgChair" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的椅子">
              <el-input v-model="dormForm.undmgChair" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的窗户">
              <el-input v-model="dormForm.dmgWindow" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的窗户">
              <el-input v-model="dormForm.undmgWindow" />
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
              <el-input v-model="dormForm.undmgScreen" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="损坏的床">
              <el-input v-model="dormForm.dmgBed" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="没有损坏的床">
              <el-input v-model="dormForm.undmgBed" />
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { listRoomd, editRoomd } from '../../server/api/dormRoom'
const dialogVisible = ref(false)
const room = ref({})
const store = useStore()
const title = ref('新增')
const getList = () => {
  listRoomd({ roomNumber: store.state.userInfo.roomNumber }).then((res) => {
    room.value = res.records[0]
  })
}
const dormForm = ref({
  roomNumber: store.state.userInfo.roomNumber,
  ifDmg: '1',
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
const tableData = ref([
  { wupin: '桌子', damage: '3', Dodamage: '0' },
  { wupin: '椅子', damage: '6', Dodamage: '0' },
  { wupin: '柜子', damage: '6', Dodamage: '0' },
  { wupin: '床', damage: '6', Dodamage: '0' },
  { wupin: '窗户', damage: '2', Dodamage: '0' },
])
const addRoom = () => {
  dialogVisible.value = true
  dormForm.value = {
    ifDmg: '1',
    roomNumber: store.state.userInfo.roomNumber,
    ...room.value,
    // undmgDesk: null,
    // dmgDesk: null,
    // undmgCabinet: null,
    // dmgCabinet: null,
    // undmgChair: null,
    // dmgChair: null,
    // undmgWindow: null,
    // dmgWindow: null,
    // undmgScreen: null,
    // dmgScreen: null,
    // undmgBed: null,
    // dmgBed: null,
  }
}
const AddRommd = () => {
  editRoomd(dormForm.value).then(() => {
    dialogVisible.value = false
    // getList()
  })
}
getList()
</script>

<style scoped lang="scss">
h2 {
  margin: 10px;
  border-bottom: 2px solid black;
}
.el-button {
  margin-bottom: 10px;
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
