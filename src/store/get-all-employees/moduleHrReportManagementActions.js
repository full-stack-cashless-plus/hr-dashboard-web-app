/*=========================================================================================
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
==========================================================================================*/

import axios from "@/axios.js";

export default {

  fetchItems({ commit }, params) {
    
    return new Promise((resolve, reject) => {

      axios
        .get(`${process.env.VUE_APP_BASE_URI}/dashboard/user/?page=${params.page}&name=${params.empName}`)
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

};
