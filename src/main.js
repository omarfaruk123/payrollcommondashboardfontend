// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
//Loading Overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
//services
import ApiService from './services/ApiService'
//validation
import Vuelidate from 'vuelidate'
import Swal from 'sweetalert2'
import VueCryptojs from 'vue-cryptojs'
import DataTableMixin from "./mixins/DataTableMixin";
import CommonMixin from "./mixins/CommonMixin";
import PermissionMixin from "./mixins/PermissionMixin";
import YearMonthListMixin from "./mixins/YearMonthListMixin";
import CustomValidation from "./mixins/CustomValidation";
import Vue2OrgTree from 'vue2-org-tree'
import POAutoSelect from "./mixins/POAutoSelect";
import POAutoSelect2 from "./mixins/POAutoSelect2";

import InputDropdown from "@/components/forms/InputDropdown";
import UserFeedbackInput from "@/components/forms/UserFeedbackInput";
import FeedbackModal from "@/components/modal/FeedbackModal";

// VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#1f6030',
  cancelButtonColor: '#bd3635',
});

Vue.use(Vue2OrgTree)
Vue.use(VueCryptojs);
window.DataTableMixin = DataTableMixin;
window.PermissionMixin = PermissionMixin;
window.YearMonthListMixin = YearMonthListMixin;
window.CustomValidation = CustomValidation;
window.POAutoSelect = POAutoSelect;
window.POAutoSelect2 = POAutoSelect2;
Vue.mixin(CommonMixin);

// global component registration
Vue.component('input-dropdown', InputDropdown);
Vue.component('user-feedback-input', UserFeedbackInput);
Vue.component('feedback-modal', FeedbackModal);


Vue.use(Vuelidate)
Vue.use(Loading, {
  // props
  color: '#0084FF',
  isFullPage: false,
  backgroundColor: '#fff',
  width: 128,
  height: 128,
})

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});



window.Toast = Toast

Vue.config.productionTip = false
//init api service
ApiService.init();
window.ApiService = ApiService


import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
window.axios = axios

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
