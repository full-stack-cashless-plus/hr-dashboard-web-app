/*=========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
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
  fetchItemsMainReport({ commit },page) {
    
    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/city/?page=${page}`)
        .then(response => {
          commit("SET_ITEMS", response.data.data);
          commit("SET_ITEMS_TOTAL", response.data.total_data);
          commit("SET_ITEMS_NUM_PAGES", response.data.num_of_pages);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItemsAttendance({ commit },items) {

    items.start_date_ms = new Date(items.start_date_ms).getTime();
    items.end_date_ms = new Date(items.end_date_ms).getTime();

    // //////console.log( items)
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
  fetchItemsTimeAttendance({ commit },items) {

    items.start_date_ms = new Date(items.start_date_ms).getTime();
    items.end_date_ms = new Date(items.end_date_ms).getTime();
    // items = JSON.stringify(items);
    // //////console.log(items)
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
