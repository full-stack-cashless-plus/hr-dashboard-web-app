/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

export default {
    isUserLoggedIn: () => {
        return localStorage.getItem('accessToken') ? true : false
    },
}
