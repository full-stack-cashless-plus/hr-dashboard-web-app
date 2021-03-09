/*=========================================================================================
  File Name: moduleUserManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/


import state from './moduleHrReportManagementState.js'
import mutations from './moduleHrReportManagementMutations.js'
import actions from './moduleHrReportManagementActions.js'
import getters from './moduleHrReportManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

