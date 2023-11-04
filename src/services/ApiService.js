import axios from 'axios';
// import TokenService from "./TokenService";
//this service is use for send api request to endpoint with Bearer token
const ApiService = {
  init() {
    // axios.defaults.baseURL = 'http://127.0.0.1:8000';
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    // axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'https://pksf-laravel.local/';
    // axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  },

  get(resource, params) {
    return axios.get(`${resource}`, params);
  },

  async post(resource, params) {
    return await axios.post(`${resource}`, params)
      .then((res) => {
        if(res.data.message){
          Toast.fire({
            icon : 'success',
            title: res.data.message
          })
        }
        
        return res
      })
      .catch((errors) => {
        this.ErrorResponse(errors)
        return errors.response
      })
  },

  async update(resource, params) {
    return await axios.put(`${resource}`, params)
      .then((res) => {
        Toast.fire({
          icon : 'success',
          title: res.data.message
        })
        return res
      })
      .catch((errors) => {
        this.ErrorResponse(errors)
        return errors.response
      })
  },

  delete(resource) {
    return axios.delete(resource)
      .then((res) => {
        Toast.fire({
          icon : 'success',
          title: res.data.message
        })
        return res
      }).catch((errors) => {
        Toast.fire({
          icon : 'error',
          title: errors
        })
        return errors.response
      })
  },

  getDropData(routeUrl,query_Data) {
    let options2 = {
        params: query_Data,
    //     headers: {
    //         Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    //     }
    };
    const url = routeUrl;
    return axios.get(url, options2).then(res => {
        return res.data
    }).catch(error => {
        return error.response.data
    });
    
  }, 

  ErrorResponse(res) {
    let message = '';
    if (res.response.status == 422) {
      Object.values(res.response.data.errors).map((ele) => {
        ele.map((msg) => {
          message = message + msg + "<br>"
        })
      })
      Toast.fire({
        icon : 'error',
        title: message
      })
    } else {
      Toast.fire({
        icon : 'error',
        title: res
      })
    }
  }
};

export default ApiService;
