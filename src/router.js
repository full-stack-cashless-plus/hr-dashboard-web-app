/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
import Store from "./store/store.js";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/hr-report/attendance",
          name: "attendance",
          component: () => import("@/views/hr-report/attendance/Attendance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Attendance", active: true }
            ],
            pageTitle: "Attendance",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/time-attendance",
          name: "time-attendance",
          component: () => import("@/views/hr-report/time-attendance/TimeAttendance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Time Attendance", active: true }
            ],
            pageTitle: "Time Attendance",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/main-report",
          name: "main-report",
          component: () => import("@/views/hr-report/main-report/MainReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Main Report", active: true }
            ],
            pageTitle: "Main Report",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/vacation-report",
          name: "vacation-report",
          component: () => import("@/views/hr-report/vacation-report/VacationReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Vacation Report", active: true }
            ],
            pageTitle: "Vacation Report",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/excuse-report",
          name: "excuse-report",
          component: () => import("@/views/hr-report/excuse-report/ExcuseReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Excuse Report", active: true }
            ],
            pageTitle: "Excuse Report",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/mission-report",
          name: "mission-report",
          component: () => import("@/views/hr-report/mission-report/MissionReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Mission Report", active: true }
            ],
            pageTitle: "Mission Report",
            rule: "editor"
          }
        },
        {
          path: "/hr-report/variables-report",
          name: "variables-report",
          component: () => import("@/views/hr-report/variables-report/VariablesReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "HR Report" },
              { title: "Variables Report", active: true }
            ],
            pageTitle: "Variables Report",
            rule: "editor"
          }
        },
        {
          path: "/Update/Employee",
          name: "update-employee",
          component: () => import("@/views/Employee/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Employee", url:"/GetAll/Employee"},
              { title: "Update Employee", active: true }
            ],
            pageTitle: "Update Employee",
            rule: "editor"
          }
        },
        {
          path: "/Add/Employee",
          name: "add-employee",
          component: () => import("@/views/Employee/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Employee", url:"/GetAll/Employee"},
              { title: "Add Employee", active: true }
            ],
            pageTitle: "Add Employee",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Employee",
          name: "get-employees",
          component: () => import("@/views/Employee/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Employee" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Employees",
            rule: "editor"
          }
        },
        {
          path: "/Update/Company",
          name: "update-company",
          component: () => import("@/views/Company/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Company", url: "/" },
              { title: "Company", url: "/GetAll/Company" },
              { title: "Update Company", active: true }
            ],
            pageTitle: "Update Company",
            rule: "editor"
          }
        },
        {
          path: "/Add/Company",
          name: "add-company",
          component: () => import("@/views/Company/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Company", url: "/" },
              { title: "Company", url: "/GetAll/Company" },
              { title: "Add Company", active: true }
            ],
            pageTitle: "Add Company",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Company",
          name: "get-companies",
          component: () => import("@/views/Company/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Company" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Companies",
            rule: "editor"
          }
        },
        {
          path: "/Update/Department",
          name: "update-department",
          component: () => import("@/views/Department/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Department", url: "/GetAll/Department" },
              { title: "Update Department", active: true }
            ],
            pageTitle: "Update Department",
            rule: "editor"
          }
        },
        {
          path: "/Add/Department",
          name: "add-department",
          component: () => import("@/views/Department/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Department", url: "/GetAll/Department" },
              { title: "Add Department", active: true }
            ],
            pageTitle: "Add Department",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Department",
          name: "get-departments",
          component: () => import("@/views/Department/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Department" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Departments",
            rule: "editor"
          }
        },
        {
          path: "/Update/Job",
          name: "update-job",
          component: () => import("@/views/Job/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Job", url: "/GetAll/Job" },
              { title: "Update Job", active: true }
            ],
            pageTitle: "Update Job",
            rule: "editor"
          }
        },
        {
          path: "/Add/Job",
          name: "add-job",
          component: () => import("@/views/Job/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Job", url: "/GetAll/Job" },
              { title: "Add Job", active: true }
            ],
            pageTitle: "Add Job",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Job",
          name: "get-jobs",
          component: () => import("@/views/Job/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Job" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Jobs",
            rule: "editor"
          }
        },
        {
          path: "/location/getall/cities",
          name: "get-cities",
          component: () => import("@/views/Location/cities/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "cities" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Cities",
            rule: "editor"
          }
        },
        {
          path: "/location/add/cities",
          name: "add-city",
          component: () => import("@/views/Location/cities/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "cities", url: "/location/getall/cities" },
              { title: "Add", active: true }
            ],
            pageTitle: "Add City",
            rule: "editor"
          }
        },
        {
          path: "/location/update/cities",
          name: "update-city",
          component: () => import("@/views/Location/cities/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "cities", url: "/location/getall/cities" },
              { title: "Update", active: true }
            ],
            pageTitle: "Update City",
            rule: "editor"
          }
        },
        {
          path: "/location/getall/areas",
          name: "get-areas",
          component: () => import("@/views/Location/areas/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "areas" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Areas",
            rule: "editor"
          }
        },
        {
          path: "/location/add/areas",
          name: "add-area",
          component: () => import("@/views/Location/areas/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "areas", url: "/location/getall/areas" },
              { title: "Add", active: true }
            ],
            pageTitle: "Add Area",
            rule: "editor"
          }
        },
        {
          path: "/location/update/areas",
          name: "update-area",
          component: () => import("@/views/Location/areas/Update.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Location" },
              { title: "areas", url: "/location/getall/areas" },
              { title: "Update", active: true }
            ],
            pageTitle: "Update Area",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Notification",
          name: "get-notifications",
          component: () => import("@/views/Notification/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Notification" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Notifications",
            rule: "editor"
          }
        },
        {
          path: "/Add/Notification",
          name: "add-notification",
          component: () => import("@/views/Notification/Add.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Notification", url: "/GetAll/Notification" },
              { title: "Send Message", active: true }
            ],
            pageTitle: "Send Message",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/Reporting_to",
          name: "get-reporting-to",
          component: () => import("@/views/reporting-to/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Reporting-To" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Reporting-To",
            rule: "editor"
          }
        },
        {
          path: "/GetAll/SignInOut_logs",
          name: "get-sign-in-out-logs",
          component: () => import("@/views/sign-in-out/GetAll.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Sign-In-Out-Log" },
              { title: "GetAll", active: true }
            ],
            pageTitle: "Sign-In-Out-Log",
            rule: "editor"
          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue")
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  if (
    to.path === "/pages/error-404" ||
    to.path === "/pages/error-500"
    // to.path === "/pages/register" ||
    // to.path === "/callback" ||
  ) {
    return next();
  }

  // If auth required, check login. If login fails redirect to login page

  if (
    !Store.state.auth.isUserLoggedIn() &&
    to.path !== "/login" &&
    from.path !== "/login"
  ) {
    router.push({ name: "login", query: { to: to.path } });

  }
  if (Store.state.auth.isUserLoggedIn() && to.path === "/login") {
    router.push({ name: "home", query: { to: to.path } });
  }
  return next();

});

export default router;
