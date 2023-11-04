import Vue from "vue";
import VueRouter from "vue-router";
import { publicPath } from "../vue.config";
// Vue.use(Router)
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/dashboard/Index"),
    meta: { authonly: true },
    children: [
      //test api
      {
        name: "Api test",
        path: "api-test",
        meta: { title: "Api Test" },
        component: () => import("@/views/dashboard/pages/TestApi"),
      },
      // Dashboard
      {
        name: "Dashboard",
        path: "",
        meta: { title: "Dashboard" },
        component: () => import("@/views/dashboard/Dashboard"),
      },
      
      //user
      {
        name: "User Create",
        path: "/system-admin/users/create",
        meta: { title: "User Create" },
        component: () => import("@/views/dashboard/pages/sys-admin/users/Create"),
      },
      {
        name: "User Edit",
        path: "/users/edit/:id",
        meta: { title: "User Edit" },
        component: () => import("@/views/dashboard/pages/sys-admin/users/Create"),
      },
      {
        name: "User",
        path: "/system-admin/users",
        meta: { title: "User Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/users/Index"),
      },
     
      {
        name: "Grade",
        path: "/system-admin/grade",
        meta: { title: "Grade Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/grade/Index"),
        
      },

      
      {
        name: "User Profile",
        path: "system-admin/users/profile",
        meta: { title: "User Profile" },
        component: () => import("@/views/dashboard/pages/sys-admin/users/Profile"),
      },
      {
        name: "Change Password",
        path: "/change-password",
        meta: { title: "Change Password" },
        component: () => import("@/views/dashboard/pages/util/ChangePassword"),
      },
      {
        name: "Reset Password",
        path: "/system-admin/reset-password",
        meta: { title: "Reset Password" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/reset-password/Index"),
      },
      //role
      {
        name: "Role",
        path: "/system-admin/roles",
        meta: { title: "Roles Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/roles/Index"),
      },

      //role-group
      {
        name: "Role Group",
        path: "/system-admin/role-groups",
        meta: { title: "List Role Group" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/role-groups/Index"),
      },
      {
        name: "Role Group.Create",
        path: "/system-admin/role-group/create",
        meta: { title: "Create Role Group" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/role-groups/Create"),
      },
      {
        name: "Role Group.Edit",
        path: "/system-admin/role-group/edit/:id",
        meta: { title: "Edit Role Group Manage" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/role-groups/Create"),
      },

      // role-permission

      {
        name: "Role Permission",
        path: "/system-admin/role-permission",
        meta: { title: "Role Permission List" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/role-permission/Create"),
      },
      {
        name: "Role Permission Create",
        path: "/system-admin/role-permission/create",
        meta: { title: "Role Permission Create" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/role-permission/Create"),
      },

      {
        name: "Module",
        path: "/system-admin/modules",
        meta: { title: "Module Manage" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/modules/Index"),
      },
     
      {
        name: "URL",
        path: "/system-admin/urls",
        meta: { title: "URL Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/urls/Index"),
      },
      {
        name: "Menu",
        path: "/system-admin/menus",
        meta: { title: "Menu Manage" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/menus/Index"),
      },

      {
        name: "Division",
        path: "/system-admin/division",
        meta: { title: "Division Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/division/Index"),
      },
      {
        name: "District",
        path: "/system-admin/district",
        meta: { title: "District Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/district/Index"),
      },
      {
        name: "Upazila",
        path: "/system-admin/upazila",
        meta: { title: "Upazila Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/upazila/Index"),
      },
      {
        name: "Union",
        path: "/system-admin/union",
        meta: { title: "Union Manage" },
        component: () => import("@/views/dashboard/pages/sys-admin/union/Index"),
      },
      
      {
        name: "System Setting",
        path: "/system-admin/setting",
        meta: { title: "System Setting" },
        component: () =>
          import("@/views/dashboard/pages/sys-admin/setting/Index"),
      },

      // hr basic setup 

      {
        name: "Designation",
        path: "/hr-basic-setup/designation",
        meta: { title: "Designation Manage" },
        component: () => import("@/views/dashboard/pages/hr-basic-setup/designation/Index"),
        
      },
      {
        name: "Unit",
        path: "/hr-basic-setup/unit",
        meta: { title: "Unit Manage" },
        component: () => import("@/views/dashboard/pages/hr-basic-setup/unit/Index"),
      },
      {
        name: "Department",
        path: "/hr-basic-setup/department",
        meta: { title: "Department Manage" },
        component: () => import("@/views/dashboard/pages/hr-basic-setup/department/Index"),
      },


      // company management 

       //company
       {
        name: "Company Create",
        path: "/company-management/company/create",
        meta: { title: "Company Create" },
        component: () => import("@/views/dashboard/pages/company-management/company/Create"),
      },
      {
        name: "Company Edit",
        path: "/company-management/company/edit/:id",
        meta: { title: "Company Edit" },
        component: () => import("@/views/dashboard/pages/company-management/company/Create"),
      },
      {
        name: "Company",
        path: "/company-management/company",
        meta: { title: "Company Manage" },
        component: () => import("@/views/dashboard/pages/company-management/company/Index"),
      },

      // branch
      {
        name: "Branch Create",
        path: "/company-management/branch/create",
        meta: { title: "Branch Create" },
        component: () => import("@/views/dashboard/pages/company-management/branch/Create"),
      },
      {
        name: "Branch Edit",
        path: "/company-management/branch/edit/:id",
        meta: { title: "Branch Edit" },
        component: () => import("@/views/dashboard/pages/company-management/branch/Create"),
      },
      {
        name: "Branch",
        path: "/company-management/branch",
        meta: { title: "Branch Manage" },
        component: () => import("@/views/dashboard/pages/company-management/branch/Index"),
      },

      // employee management

       //employee
      {
        name: "Employee Create",
        path: "/employee-management/employee/create",
        meta: { title: "Employee Create" },
        component: () => import("@/views/dashboard/pages/employee-management/employee/Create"),
      },
      {
        name: "Employee Edit",
        path: "/employee-management/employee/edit/:id",
        meta: { title: "Employee Edit" },
        component: () => import("@/views/dashboard/pages/employee-management/employee/Create"),
      },
      {
        name: "Employee",
        path: "/employee-management/employee",
        meta: { title: "Employee Manage" },
        component: () => import("@/views/dashboard/pages/employee-management/employee/Index"),
      },
       //employee detail
       {
        name: "Employee Detail Create",
        path: "/employee-management/employee-detail/create",
        meta: { title: "Employee Detail Create" },
        component: () => import("@/views/dashboard/pages/employee-management/employee-detail/Create"),
      },
      {
        name: "Employee Detail Edit",
        path: "/employee-management/employee-detail/edit/:id",
        meta: { title: "Employee Detail Edit" },
        component: () => import("@/views/dashboard/pages/employee-management/employee-detail/Create"),
      },
      {
        name: "Employee Detail",
        path: "/employee-management/employee-detail",
        meta: { title: "Employee Detail Manage" },
        component: () => import("@/views/dashboard/pages/employee-management/employee-detail/Index"),
      },
     
    ]
  },
  {
    path: "/login",
    name: "LoginForm",
    component: () => import("@/views/login/LoginForm"),
    meta: { gusetonly: true },
  },
  {
    name: "Forgot Password",
    path: "/forget-password",
    component: () => import("@/views/dashboard/pages/util/ForgetPassword.vue"),
    meta: { gusetonly: true },
  },
  {
    name: "User Reset Password",
    path: "/user-reset-password/:reset_code",
    component: () =>
      import("@/views/dashboard/pages/util/UserResetPassword.vue"),
    meta: { gusetonly: true },
  },
 
  {
    path: "*",
    redirect: "/",
  },
];

function loggedIn() {
  return localStorage.getItem("token");
}

const router = new VueRouter({
  mode: 'history',
  routes,
  // base: process.env.VUE_APP_API_BASE_URL,
  base: publicPath,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.gusetonly)) {
    if (!loggedIn()) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  } else if (to.matched.some((record) => record.meta.authonly)) {
    if (loggedIn()) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next(); // make sure to always call next()!
  }
});

const DEFAULT_TITLE = 'Payroll-Management_Stystem(PMS)';
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title
      ? `${to.meta.title} - ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;
  });
});

export default router;
