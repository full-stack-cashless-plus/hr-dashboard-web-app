/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Human Resources Application
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/

import jwt from "../../http/requests/auth/jwt/index.js"

import router from '@/router'

export default {
  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.username, payload.userDetails.password)
        .then(response => {


          // If there's user data in response
          if (response.data.code === 200) {

            if (response.data.access_token !== null && response.data.access_token !== undefined) {


              // Set accessToken
              localStorage.setItem("accessToken", response.data.access_token)

              // Set token in axios
              commit("SET_TOKEN", response.data.access_token);

              resolve(response)
              router.push(router.currentRoute.query.to || '/');

            } else {
              reject({ message: "Wrong Not Authorized" })
              return
            }
          } else {
            reject({ message: response.data.message })
            return
          }

        })
        .catch(error => { reject(error) })
    })
  },


}
