/*=========================================================================================
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

import axios from "@/axios.js";

export default {

  // fetchItems({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`${process.env.VUE_APP_BASE_URI}/users/getAllHRWorkerPlanner`)
  //       .then(response => {
  //         commit("SET_ITEMS", response.data.data);
  //         resolve(response);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },  
  fetchItemsMainReport({ commit }, items) {

    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/main_report/`, {
          params: {
            start_date: items.start_date,
            end_date: items.end_date,
            category: items.category.name,
            company: items.company.name,
            department: items.department,
            job_title: items.job_title,
            employee_name: items.employee_name,
            employee_code: items.employee_code,
            reporting_to: items.reporting_to,
            city: items.city,
            area: items.area,
            area_name: items.area_name,
            Absenteeism_Days: items.Absenteeism_Days
          }
        })
        .then(response => {
          commit("SET_ITEMS", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItemsVacationReport({ commit }, items) {

    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/vacation_report/`, {
          params: {
            from: items.from,
            to: items.to,
            category: items.category.name,
            company: items.company.name,
            department: items.department,
            job_title: items.job_title,
            employee_name: items.employee_name,
            code: items.employee_code,
            reporting_to: items.reporting_to,
            city: items.city,
            area: items.area,
            status: items.status,
            annual_pool: items.annual_pool
          }
        })
        .then(response => {
          commit("SET_ITEMSV", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItemsExcuseReport({ commit }, items) {
   
    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/excuse_report/?`, {
          params: {
            from: items.from,
            to: items.to,
            category: items.category.name,
            company: items.company.name,
            department: items.department,
            job_title: items.job_title,
            employee_name: items.employee_name,
            code: items.employee_code,
            reporting_to: items.reporting_to,
            city: items.city,
            area: items.area,
            status: items.status,
          }
        })
        .then(response => {
         
          commit("SET_ITEMSE", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItemsMissionReport({ commit }, items) {
    
    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/mission_report/?`, {
          params: {
            from: items.from,
            to: items.to,
            category: items.category.name,
            company: items.company.name,
            department: items.department,
            job_title: items.job_title,
            employee_name: items.employee_name,
            code: items.employee_code,
            reporting_to: items.reporting_to,
            city: items.city,
            area: items.area,
            status: items.status,
          }
        })
        .then(response => {
         
          commit("SET_ITEMSM", response.data.result);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchItemsVariablesReport({ commit }, items) {
    

    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/variable_report/`, {
          params: {
            start_date: items.start_date,
            end_date: items.end_date,
            category: items.category.name,
            company: items.company.name,
            department: items.department,
            job_title: items.job_title,
            employee_name: items.employee_name,
            employee_code: items.employee_code,
            reporting_to: items.reporting_to,
            city: items.city,
            area: items.area,
            area_name: items.area_name,
            page: items.num_of_pages
            // Absenteeism_Days: items.Absenteeism_Days
          }
        })
        .then(response => {
          // ////console.log('requested -> ' + items.start_date + ' - ' + items.end_date + ' - ' + items.category.name + ' - ' + items.company.name)
          // ////console.log('the items JSON is-> ' + JSON.stringify(response.data))
          commit("SET_ITEMS_NUM_PAGESVAR", response.data.number_of_pages);
          commit("SET_ITEMSVAR", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  
  fetchItemsAttendance({ commit }, items) {

    items.start_date_ms = new Date(items.start_date_ms).getTime();
    items.end_date_ms = new Date(items.end_date_ms).getTime();

    // ////console.log( items)
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.VUE_APP_BASE_URI}/users/generate_hr_time_attendance`, {
          params: {
            start_date_ms: items.start_date_ms,
            end_date_ms: items.end_date_ms
          }
        })
        .then(response => {
          commit("SET_ITEMS", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItemsTimeAttendance({ commit }, items) {

    items.start_date_ms = new Date(items.start_date_ms).getTime();
    items.end_date_ms = new Date(items.end_date_ms).getTime();
    // items = JSON.stringify(items);
    // ////console.log(items)
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.VUE_APP_BASE_URI}/users/generate_erp_hr_time_attendance`, {
          params: {
            start_date_ms: items.start_date_ms,
            end_date_ms: items.end_date_ms
          }
        })
        .then(response => {
          commit("SET_ITEMS", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

};
