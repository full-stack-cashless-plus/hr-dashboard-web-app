/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

export default [
  {
    url: "/",
    name: "Dashboard",
    slug: "home",
    icon: "HomeIcon",
  },

  {
    url: null,
    name: "Reports",
    icon: "FileIcon",
    
    submenu: [
      {
        url: null,
        name: "HR Reports",
        icon: "FileTextIcon",
        submenu: [
          {
            url: "/hr-report/main-report",
            name: "Main Report",
            slug: "main-report",
          },
          {
            url: "/hr-report/vacation-report",
            name: "Vacation Report",
            slug: "main-vacation-report",
          },
          {
            url: "/hr-report/mission-report",
            name: "Mission Report",
            slug: "mission-report",
          },
          {
            url: "/hr-report/excuse-report",
            name: "Excuse Report",
            slug: "excuse-report",
          },
          {
            url: "/hr-report/variables-report",
            name: "Variables Report",
            slug: "variables-report",
          },
    
        ],
      },
      {
        url: null,
        name: "ERP Reports",
        icon: "FileIcon",
        submenu: [
          {
            url: "",
            name: "HRWorkerPlanner(Importing Shifts)",
            slug: "HRWorkerPlanner",
          },
          {
            url: "",
            name: "Uploading HRTimeAttendance_IN&OUT",
            slug: "HRTimeAttendance_IN&OUT",
          }
     ],
      }
     
    ],
  },
  {
    url: null,
    name: "Administrator",
    icon: "SettingsIcon",
    slug: "show_Administrator",
    submenu: [
      {
        url: "",
        name: "Permissions",
        slug: "Permissions",
      },
      {
        url: "",
        name: "Log entries",
        slug: "Log_entries",
      },
      {
        url: "/GetAll/SignInOut_logs",
        name: "Sign in/out log",
        slug: "in_outLOG",
      },
      {
        url: "/GetAll/Reporting_to",
        name: "Reporting To",
        slug: "ReportingTo",
      }
    ]
  },
  {
    url: null,
    name: "Top Managment",
    icon: "UsersIcon",
    slug: "Top"
  },
  {
    url: null,
    name: "Audit",
    icon: "InfoIcon",
    slug: "audit"
  },

  {
    url: null,
    name: "Users",
    icon: "UserIcon",
    
    submenu: [
  {
    url: "/GetAll/Company",
    name: "Company",
    icon: "TrendingUpIcon",
    slug: "GetAll Companies"
  },
  {
    url: "/GetAll/Department",
    name: "Department",
    icon: "LayersIcon",
    slug: "GetAll Departments"
  },
  {
    url: "/GetAll/Job",
    name: "Job",
    icon: "BriefcaseIcon",
    slug: "GetAll jobs"
  },
  {
    url: "/GetAll/Employee",
    name: "Employee",
    icon: "UserIcon",
    slug: "GetAll Employees"
  }
    ]
  },

  {
    url: null,
    name: "Location",
    icon: "GlobeIcon",
    submenu: [
      {
        url: "/location/getall/cities",
        name: "Cities",
        icon: "MapPinIcon",
        slug: "GetAll Cities"
      },
      {
        url: "/location/getall/areas",
        name: "Areas",
        icon: "MapIcon",
        slug: "GetAll Areas"
      }
    ]
  },

  {
    url: "/GetAll/Notification",
    name: "Notifications",
    icon: "BellIcon",
    slug: "notify",
  },

];
