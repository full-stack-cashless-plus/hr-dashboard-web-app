/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

// import axios from "../../http/axios/index.js"
import axios from "@/axios.js";
export default {
  SET_TOKEN(state, accessToken) {
    axios.defaults.headers.common['Authorization'] =  accessToken
  }
}
