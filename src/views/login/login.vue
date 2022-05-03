<template>
  <div class="registered">
    <div class="login-box">
      <h2>石院宿舍管理平台</h2>

      <el-form
        :model="form"
        :rules="rules"
        hide-required-asterisk
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="form.userPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button @click="onRegister">注册</el-button>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <footer>
    <a href="https://beian.miit.gov.cn/" target="_blank">冀ICP备2022001771</a>
  </footer>
  <el-drawer v-model="showRegister" direction="rtl">
    <template #title>
      <h4>石院宿舍管理注册</h4>
    </template>
    <template #default>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="registerForm.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="registerForm.userPassword" />
        </el-form-item>
        <el-form-item label="注册身份" prop="userPower">
          <el-radio v-model="registerForm.userPower" label="0" size="large"
            >我是学生</el-radio
          >
          <el-radio v-model="registerForm.userPower" label="1" size="large"
            >我是宿管</el-radio
          >
        </el-form-item>
      </el-form>
      <div v-if="registerForm.userPower === '1'">
        <el-form
          :model="keeperRegisterForm"
          ref="registerRef"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="宿管ID" prop="id">
            <el-input v-model="keeperRegisterForm.id" />
          </el-form-item>
          <el-form-item label="宿管手机" prop="keeperPhone">
            <el-input v-model="keeperRegisterForm.keeperPhone" />
          </el-form-item>
          <el-form-item label="宿管姓名" prop="keeperName">
            <el-input v-model="keeperRegisterForm.keeperName" />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="registerForm.userPower === '0'">
        <el-form
          :model="stuRegisterForm"
          ref="registerRef"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="学生ID" prop="id">
            <el-input v-model="stuRegisterForm.id" />
          </el-form-item>
          <el-form-item label="学号" prop="stuNumber">
            <el-input v-model="stuRegisterForm.stuNumber" />
          </el-form-item>
          <el-form-item label="姓名" prop="stuName">
            <el-input v-model="stuRegisterForm.stuName" />
          </el-form-item>
          <el-form-item label="宿舍号" prop="stuName">
            <el-input v-model="stuRegisterForm.roomNumber" />
          </el-form-item>
          <el-form-item label="院系" prop="stuMajor">
            <el-input v-model="stuRegisterForm.stuMajor" />
          </el-form-item>
          <el-form-item label="性别" prop="stuSex">
            <el-input v-model="stuRegisterForm.stuSex" />
          </el-form-item>
          <el-form-item label="专业" prop="stuFaculty">
            <el-input v-model="stuRegisterForm.stuFaculty" />
          </el-form-item>
          <el-form-item label="手机" prop="stuPhone">
            <el-input v-model="stuRegisterForm.stuPhone" />
          </el-form-item>
          <el-form-item label="年级" prop="stuGrade">
            <el-select v-model="stuRegisterForm.stuGrade" placeholder="">
              <el-option
                v-for="item in StuGrades"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <el-button @click="cancelClick">取消</el-button>
        <el-button @click="confirmClick" type="primary">注册</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import {
  register,
  login,
  stuRegister,
  keeperRegister,
} from '@/server/api/login.js'
const router = useRouter()
let showRegister = ref(false)
const store = useStore()
const { proxy } = getCurrentInstance()

const form = reactive({
  userName: null,
  userPassword: null,
})

const onRegister = () => {
  showRegister.value = true
}
const onSubmit = () => {
  login(form)
    .then((res) => {
      console.log('res' + res)
      console.log(res)
      store.commit('changeUserInfo', res.data[0])
      store.commit('changeToken', res.data[1].token)
      // console.log(res.[header]);
      localCache.setCache('userInfo', res.data[0])
      localCache.setCache('token', res.data[1].token)
      if (res.data[0].stuName) {
        router.push('/students')
      } else {
        router.push('/teachers')
      }
      proxy.$modal.msgSuccess('登入成功')
    })
    .catch((err) => {
      // proxy.$modal.msgSuccess("删除成功");
      console.log(err)
      proxy.$modal.msgError('密码错误,或账号不存在')
    })
}

// 学生注册功能
const stuRegisterForm = reactive({
  id: null,
  stuName: null,
  stuNumber: null,
  stuPhone: null,
  stuSex: null,
  stuMajor: null,
  stuFaculty: null,
  stuGrade: null,
  roomNumber: null,
  warningNumber: '0',
})
const keeperRegisterForm = reactive({
  id: null,
  keeperName: null,
  keeperPhone: null,
})
// 通用注册功能
const registerForm = ref({
  userName: null,
  userPassword: null,
  userPower: '',
})

const registerRef = ref()
const cancelClick = () => {
  registerForm.value = {
    userName: null,
    userPassword: null,
    userPower: '',
  }
  showRegister.value = false
}
const confirmClick = () => {
  if (registerForm.value.userPower === '1') {
    register({
      ...registerForm.value,
      userKeeperId: keeperRegisterForm.id,
    }).then((res) => {
      console.log(res)
      console.log('1')
    })
    keeperRegister(keeperRegisterForm).then(() => {
      console.log('1')
    })
  } else {
    register({ ...registerForm.value, userStudentId: stuRegisterForm.id }).then(
      () => {
        console.log('1')
      }
    )
    stuRegister(stuRegisterForm).then(() => {
      console.log('1')
    })
  }
  showRegister.value = false
}

const rules = reactive({
  userName: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  userPassword: [
    {
      required: true,
      message: '密码不为空',
      trigger: 'blur',
    },
  ],
  userPower: [
    {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  ],
  id: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  ],
  stuNumber: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuPhone: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuSex: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuMajor: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuGrade: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  stuFaculty: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  keeperName: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
  keeperPhone: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur',
    },
  ],
})
const StuGrades = reactive([
  { id: 1, label: '2019级', value: '2019' },
  { id: 2, label: '2020级', value: '2020' },
  { id: 3, label: '2021级', value: '2021' },
  { id: 4, label: '2022级', value: '2022' },
])
</script>

<style scoped lang="scss">
.registered {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/image/backgroud.png') no-repeat;
  background-size: cover;
  .login-box {
    width: 400px;
    height: 250px;
    margin-bottom: 100px;
    padding: 20px;
    border: 1px solid;
    border-radius: 20px;
    background-color: #fff;
    h2 {
      margin-top: 20px;
      text-align: center;
    }
    .el-form {
      margin-top: 60px;
      margin-right: 70px;
      .el-button {
        margin: 0 20px;
      }
    }
  }
  .center {
    justify-content: center;
    align-items: center;
  }
}

.footer {
  display: flex;
  justify-content: space-around;
}
footer {
  position: fixed;
  font-size: 20px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
