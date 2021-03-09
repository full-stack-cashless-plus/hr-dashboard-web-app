// axios
import axios from 'axios'

const domain = ""

const authHeaders = (localStorage.getItem('accessToken') !== null) ? { 'Authorization':  localStorage.getItem('accessToken'), 'content-type': 'multipart/form-data' } : { 'content-type': 'multipart/form-data' };
export default axios.create({
  domain,
  headers: authHeaders,

  validateStatus: function (status) {
    if (status === 401 || status === 403) {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
    return status >= 200 && status < 300; // default
  },

  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    if (JSON.parse(data).code === 301 || JSON.parse(data).code === 403) {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
    return JSON.parse(data);
  }],

  // You can add your headers here
})
