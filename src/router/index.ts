import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '../utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/registered',
    name: 'registered',
    component: () => import('../views/login/registered.vue'),
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('../views/students/layout.vue'),
    redirect: '/studentInformation',
    children: [
      {
        path: '/studentInformation',
        name: 'studentInformation',
        component: () => import('../views/students/studentInformation.vue'),
      },
      {
        path: '/dormitoryAdministratorWarning',
        name: 'dormitoryAdministratorWarning',
        component: () =>
          import('../views/students/dormitoryAdministratorWarning.vue'),
      },
      {
        path: '/messageToRemind',
        name: 'messageToRemind',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/students/messageToRemind.vue'
          ),
      },
      {
        path: '/theDormitoryNotice',
        name: 'theDormitoryNotice',
        component: () => import('../views/students/theDormitoryNotice.vue'),
      },
      {
        path: '/toResport',
        name: 'toResport',
        component: () => import('../views/students/toResport.vue'),
      },
      {
        path: '/dormitoryManagement',
        name: 'dormitoryManagement',
        component: () => import('../views/students/dormitoryManagement.vue'),
      },
    ],
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('../views/teachers/layout.vue'),
    redirect: '/studentManagement',
    children: [
      {
        // 学生管理
        path: '/studentManagement',
        name: 'studentManagement',
        component: () => import('../views/teachers/studentManagement.vue'),
      },
      {
        // 宿舍房间管理
        path: '/dormRooms',
        name: 'dormRooms',
        component: () => import('../views/teachers/dormRooms.vue'),
      },
      {
        // 维修设备
        path: '/maintenanceEquipment',
        name: 'maintenanceEquipment',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/teachers/maintenanceEquipment.vue'
          ),
      },
      {
        // 发送提醒
        path: '/sendAReminder',
        name: 'sendAReminder',
        component: () => import('../views/teachers/sendAReminder.vue'),
      },
      {
        // 警告页面   
        path: '/studentsAreWarned',
        name: 'studentsAreWarned',
        component: () => import('../views/teachers/studentsAreWarned.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const token = localCache.getCache('token')
  if (to.name == "students" && token) next({ name: 'login' })
  // ...
  // 返回 false 以取消导航
  // return false
  next()
})

export default router
