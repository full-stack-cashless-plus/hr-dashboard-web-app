/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  IItem Name: Human Resources Application
  Author: Hazem Ashraf
  Author URL: https://www.linkedin.com/in/hazem-ashraf-1242169b/
==========================================================================================*/

export default {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_ITEMS_TOTAL(state, total) {
    state.total = total;
  },
  SET_ITEMS_NUM_PAGES(state, num) {
    state.num_of_pages = num;
  }
};
