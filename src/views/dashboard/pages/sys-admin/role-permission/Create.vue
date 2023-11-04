<template>
  <v-container id="user-profile" fluid tag="section">

    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined>
          <v-card-title class="component-title">
            <p class="ma-3">
              {{ $t('rolePermission.rolePermission') }} {{ !isEdit ? $t('create') : $t('edit') }}
            </p>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="mt-5">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-autocomplete :items="roleList" item-text="name" item-value="id" :label="$t('role.role')"
                      :filter="customFilter" outlined dense v-model="rolePermissionForm.role_id"
                      v-on:change="getRoleActionListActive(1)"></v-autocomplete>
                    <p v-if="$v.rolePermissionForm.role_id.$error" class="red--text">This field is required</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-autocomplete :items="dropdownmoduleList" item-text="name" item-value="id"
                      :label="$t('module.module')" :filter="customFilter" outlined dense
                      v-model="rolePermissionForm.module_id" v-on:change="getModuleList(1)"></v-autocomplete>

                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="12" class="px-0 ma-0">

                    <input type="checkbox" :checked="all_module_status" @click="all_module($event)"> Select All
                  </v-col>
                  <v-col cols="12" md="12" class="px-0 ma-0">
                    <v-row class="pl-5">
                      <v-col cols="12" md="2" v-for="item in moduleLists2.actionlist" :key="item.id">
                        <input type="checkbox" :checked="item.checked"
                          @change="all_up_to_down_action($event, item.label)"> {{ item.label }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="pa-0 mb-2" cols="12" v-for="module_info  in moduleLists2.data" :key="module_info.id">
                    <v-row class="green accent-1 pa-0 ma-0" style="border-radius:5px;">
                    <input type="checkbox" :checked="module_info.checked" style="margin-top:2px;margin-left:2px;"
                              @click="module_all_action($event, module_info)"> <span style="margin-top:5px;margin-left:4px;margin-bottom:2px;">{{ module_info.name }}</span>
                     
                      <v-col cols="12" md="12" class="pa-0 ma-0">
                        <v-row class="pl-5">
                          <v-col cols="12" md="2" style="margin-bottom:2px;" v-for="actionlistitem in module_info.module_action_list"
                            :key="actionlistitem.id">
                            <input type="checkbox" :checked="actionlistitem.checked"
                              @change="module_up_to_down_action($event, module_info, actionlistitem.label)">
                            {{ actionlistitem.label }}
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row v-for="value in module_info.parenturls" :key="value.id" class="pa-0 ma-0">
                    <v-col class="pl-2 ml-0 pb-0 mb-0 mt-2 blue accent-1" cols="12" md="12" style="border-radius:5px;padding-top:2px;">
                    
                    <input type="checkbox" style="margin-top:4px;margin-left:2px;" @change="url_all_action($event, value, module_info.id)"
                          :checked="value.checked"> <span style="margin-top:0px;margin-left:4px;margin-bottom:2px;">{{ value.url_name }}</span> 
                    </v-col>
                    <v-col class="pl-5 ml-0 pb-0 mb-0" cols="12" md="12">
                      <v-row>
                          <v-col class="pt-0" cols="12" md="2" v-for="(item, index) in moduleLists2.actionlist"
                            :key="item.id">
                            <v-col class="pl-0" cols="12" md="2" v-if="index == 0" style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'list'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                            <v-col class="pl-1" cols="12" md="2" v-else-if="index == 1"
                              style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'create'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                            <v-col class="pl-1" cols="12" md="2" v-else-if="index == 2"
                              style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'edit'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                            <v-col class="pl-1" cols="12" md="2" v-else-if="index == 3"
                              style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'view'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                            <v-col class="pl-2" cols="12" md="2" v-else-if="index == 4"
                              style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'delete'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                            <v-col class="pl-2 pr-0" cols="12" md="2" v-else-if="index == 5"
                              style="max-width:100%!important;">
                              <span v-for="url in value.actionlist" :key="url.id">
                                <span v-if="url.action == 'approve'"><input type="checkbox" :checked="url.checked"
                                    @change="single_action($event, url, url.action, module_info.id)"> {{ url.action }}</span>
                              </span>
                            </v-col>
                          </v-col>
                        </v-row>
                    </v-col>
               
                    </v-row>
                  </v-col>
                </v-row>




                <v-row>
                  <v-col cols="12" class="text-right">

                    <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                      {{ $t('save') }}
                    </v-btn>

                  </v-col>
                </v-row>
                <!-- <pre>{{moduleLists2.actionlist}}</pre>
                  <pre>{{moduleLists2.data}}</pre> -->

              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import ApiService from "@/services/ApiService";
import xitem from '../../../component/xitem'
export default {
  name: "Create",
  components: {
    xitem
  },
  mixins: [validationMixin, DataTableMixin],
  data: () => ({
    rolePermissionForm: {
      role_id: '',
      module_id: '',
      urls: [],
    },
    isEdit: false,
    editedItem: {},
    roleList: [],
    moduleList: [],
    dropdownmoduleList: [],
    moduleLists: [],
    actionlist: [
      { label: 'List', checked: false },
      { label: 'Create', checked: false },
      { label: 'Edit', checked: false },
      { label: 'View', checked: false },
      { label: 'Delete', checked: false },
      { label: 'Approved', checked: false },

    ],
    module_actionlist: [
      { label: 'List', checked: false },
      { label: 'Create', checked: false },
      { label: 'Edit', checked: false },
      { label: 'View', checked: false },
      { label: 'Delete', checked: false },
    ],
    moduleLists2: [],
    selected: [],
    all_module_status: false,
    rolePermissionList: [],
    urlActionListCheck: 0,


  }),
  computed: {
    roleSet() {
      return Array.from(Array(Math.ceil(this.roleList.length / 5)).keys())
    },
    urlactionlistcheck() {
      return this.urlActionListCheck;
    }
  },
  mounted() {

    this.getRoleList()
    this.getModuleList()
    this.getDropDownModuleList()
    /*if (this.$route.params.id) {
      this.isEdit  = true;
      this.user_id = this.$route.params.id;
      this.setEditData();
    }*/
  },

  methods: {
    all_up_to_down_action(e, action) {
      var parent_url_actionlist = 0;
      var parent_url = 0;
      var total_module = this.moduleLists2.data.length;
      var total_module_active = 0;


      this.moduleLists2.data.forEach((ele, index) => {
        var parent_url_active = 0
        parent_url = ele.parenturls.length;
        ele.parenturls.forEach((pele, pindex) => {
          var parent_url_actionlist_active = 0
          parent_url_actionlist = pele.actionlist.length;

          pele.actionlist.forEach((aele, aindex) => {
            if (aele.action == action.toLowerCase()) {
              // console.log(this.all_action_status);
              // console.log("before " , aele);
              aele.checked = e.target.checked;
              // console.log("after " , aele);
            }
            if (aele.checked == true) {
              parent_url_actionlist_active++;
            }
          })

          // parent url active check
          if (parent_url_actionlist == parent_url_actionlist_active) {
            pele.checked = true;
          }
          else {
            pele.checked = false;
          }
          // parent url active check count
          if (pele.checked == true) {
            parent_url_active++;
          }

        })
        // parent module check active and inactive
        if (parent_url == parent_url_active) {
          ele.checked = true;
        }
        else {
          ele.checked = false;
        }


        ele.module_action_list.forEach((actionitem, actionindex) => {
          if (actionitem.label == action) {
            actionitem.checked = e.target.checked;
          }
        })

        if (ele.checked == true) {
          total_module_active++;
        }

        // check all module active
        if (total_module == total_module_active) {
          this.all_module_status = true;
        }
        else {
          this.all_module_status = false;
        }



      })

      this.moduleLists2.actionlist.forEach((topactionitem, topactionindex) => {
        if (topactionitem.label == action) {
          topactionitem.checked = e.target.checked;
        }
      })
    },

    module_up_to_down_action(e, module, action) {
      var parent_url_actionlist = 0;
      var parent_url = 0
      var parent_url_active = 0
      var module_action_list = 0
      var module_action_list_active = 0

      var total_module = this.moduleLists2.data.length;

      var count = 0;

      this.moduleLists2.data.forEach((ele, index) => {

        ele.module_action_list.forEach((moduleActionList, index) => {
          // check module same item total
          if (moduleActionList.label == action) {
            module_action_list++;
            if (ele.id == module.id && moduleActionList.label == action) {
              moduleActionList.checked = e.target.checked;
            }
          }
          // check module same item active count
          if (moduleActionList.checked == true && moduleActionList.label == action) {
            module_action_list_active++;
          }
        })



        if (ele.id != module.id) { return false }
        else {


          parent_url = ele.parenturls.length;
          ele.parenturls.forEach((pele, pindex) => {
            var parent_url_actionlist_active = 0
            parent_url_actionlist = pele.actionlist.length;
            pele.actionlist.forEach((aele, aindex) => {
              if (aele.action == action.toLowerCase()) {
                // console.log(this.all_action_status);
                // console.log("before " , aele);
                aele.checked = e.target.checked;
                // console.log("after " , aele);
              }
              if (aele.checked == true) {
                parent_url_actionlist_active++;
              }

            })

            // parent url will be active when paren url all item active
            if (parent_url_actionlist == parent_url_actionlist_active) {
              pele.checked = true;
            }
            else {
              pele.checked = false;
            }


            if (pele.checked == true) {
              parent_url_active++;
            }

          })
          // module and module item active check
          if (parent_url_active == parent_url) {
            ele.checked = true;
            // ele.module_action_list.forEach((moduleActionList,index) =>{
            //     moduleActionList.checked = true;
            // })
          }
          else {
            ele.checked = false;
            // ele.module_action_list.forEach((moduleActionList,index) =>{
            //     moduleActionList.checked = false;
            // })

          }


        }
        // module item check
        ele.module_action_list.forEach((actionitem, actionindex) => {
          if (actionitem.label == action) {
            count++;
            actionitem.checked = e.target.checked;
          }
        })

      })


      // active top same item when all module same actionlist check
      if (module_action_list == module_action_list_active) {
        this.moduleLists2.actionlist.forEach((topActionList, index) => {
          if (action == topActionList.label) {
            topActionList.checked = e.target.checked;
          }
        });
      }
      else {
        this.moduleLists2.actionlist.forEach((topActionList, index) => {
          if (action == topActionList.label) {
            topActionList.checked = false;
          }
        });
      }
      // check all module active or not
      var total_module_active = 0;
      this.moduleLists2.data.forEach((ele, index) => {
        if (ele.checked == true) {
          total_module_active++;
        }
      })

      if (total_module == total_module_active) {
        this.all_module_status = true;
      }
      else {
        this.all_module_status = false;
      }

      console.log('total module', total_module);
      console.log('Total module active', total_module_active);


    },

    url_all_action(e, url, module_id) {

      var total_module = this.moduleLists2.data.length;
      var total_module_active = 0;
      var total_module_url = 0;
      var total_module_url_active = 0;
      this.moduleLists2.data.forEach((ele, index) => {
        if (module_id == ele.id) {
          total_module_url = ele.parenturls.length;
          ele.parenturls.forEach((pele, pindex) => {
            if (pele.id != url.id) { return false }
            else {
              pele.checked = e.target.checked;
              pele.actionlist.forEach((aele, aindex) => {
                aele.checked = e.target.checked;
              })
            }
          })

          ele.parenturls.forEach((singleurl, index) => {
            if (singleurl.checked == true) {
              total_module_url_active++;
            }
          })

          // when single module all url check then check module and module action list 
          if ((ele.id == module_id) && (total_module_url == total_module_url_active)) {
            ele.checked = true;
            // single module actionlist check
            ele.module_action_list.forEach((moduleActionList, index) => {
              moduleActionList.checked = true;
            })
          }
          // when single module all url check then check module and module action list 
          else {
            ele.checked = false;
            // single module actionlist uncheck
            url.actionlist.forEach((urlActionList, index) => {
              console.log(urlActionList);
              ele.module_action_list.forEach((moduleActionList, index) => {
                if (moduleActionList.label.toLowerCase() == urlActionList.action) {
                  moduleActionList.checked = false;
                }
              })
            })

          }
        }
        // check all module count active
        if (ele.checked == true) {
          total_module_active++;
          if (total_module_active == total_module) {
            this.all_module_status = true;
            this.moduleLists2.actionlist.forEach((moduleTopActionList, index) => {
              moduleTopActionList.checked = true;
            })
          }
          else {
            this.all_module_status = false;
            url.actionlist.forEach((urlActionList, index) => {
              this.moduleLists2.actionlist.forEach((moduleTopActionList, index) => {
                if (moduleTopActionList.label.toLowerCase() == urlActionList.action) {
                  moduleTopActionList.checked = false;
                }

              })
            })
          }
        }

      })

      //  console.log('total module',total_module);
      //  console.log('total module active',total_module_active);
      //  console.log('total module url',total_module_url);
      //  console.log('total module url active',total_module_url_active);

    },
    module_all_action(e, module) {
      var total_module = this.moduleLists2.data.length;
      var total_module_active = 0;
      this.moduleLists2.data.forEach((ele, index) => {
        if (ele.id == module.id) {
          ele.module_action_list.forEach((actionitem, actionindex) => {
            actionitem.checked = e.target.checked;
          })
          ele.checked = e.target.checked;
          ele.parenturls.forEach((pele, pindex) => {
            pele.checked = e.target.checked;
            pele.actionlist.forEach((aele, aindex) => {
              aele.checked = e.target.checked;
            })
          })
        }
        if (ele.checked == true) {
          total_module_active++;
        }
      })
      if (total_module == total_module_active) {
        this.all_module_status = true;
        this.moduleLists2.actionlist.forEach((topActionList, index) => {
          topActionList.checked = true;
        })
      }
      else {
        this.all_module_status = false;
        this.moduleLists2.actionlist.forEach((topActionList, index) => {
          topActionList.checked = false;
        })
      }
    },

    all_module(e) {
      this.moduleLists2.data.forEach((ele, index) => {
        ele.module_action_list.forEach((actionitem, actionindex) => {
          actionitem.checked = e.target.checked;
        })
        this.moduleLists2.actionlist.forEach((topactionitem, topactionindex) => {
          topactionitem.checked = e.target.checked;

        })
        ele.checked = e.target.checked;
        ele.parenturls.forEach((pele, pindex) => {
          pele.checked = e.target.checked;
          pele.actionlist.forEach((aele, aindex) => {
            aele.checked = e.target.checked;
          })
        })
      })
    },
    single_action(e, url, action, module_id) {
      var total_url = 0;
      var total_url_active = 0;
      var total_url_action_item = 0;
      var total_url_action_item_active = 0;
      var total_module = this.moduleLists2.data.length;
      var total_module_active = 0;
      var total_url_single_same_item = 0; // like list,edit,create
      var total_url_single_same_item_active = 0; // like list,edit,create
      var total_module_single_item = 0; // like system admin list ,bis list total =2

      this.moduleLists2.data.forEach((ele, index) => {
        if (module_id == ele.id) {
          ele.parenturls.forEach((pele, pindex) => {

            if (pele.id == url.parent_url_id) {
              total_url_action_item = pele.actionlist.length;
              pele.actionlist.forEach((aele, aindex) => {

                if (aele.action == action) {
                  aele.checked = e.target.checked;
                }

                if (aele.checked == true) {
                  total_url_action_item_active++;
                }
              })

              if (total_url_action_item == total_url_action_item_active) {
                pele.checked = true;
              }
              else {
                pele.checked = false;
              }
            }
            // check active single module total url
            if (pele.checked == true) {
              total_url_active++;
            }
            // check total module url
            if (ele.id == module_id) {
              total_url = ele.parenturls.length;
            }

            // check single module all url er same item count like list ,edit
            pele.actionlist.forEach((aele, aindex) => {
              if ((aele.action == action)) {
                total_url_single_same_item++;
              }
              if (aele.action == action && (aele.checked == true)) {
                total_url_single_same_item_active++;
              }
            })





          })
          // single module check when all url check
          if ((ele.id == module_id) && (total_url == total_url_active)) {
            ele.checked = true;
            // single module actionlist check
            ele.module_action_list.forEach((moduleActionList, index) => {
              moduleActionList.checked = true;
            })
          }
          // single module check when all url check
          else {
            ele.checked = false;
            // single module actionlist uncheck
            ele.module_action_list.forEach((moduleActionList, index) => {
              if (moduleActionList.label.toLowerCase() == action) {
                moduleActionList.checked = false;
              }

            })
          }

          // check single select top single item  like list , edit check and uncheck
          if (total_url_single_same_item_active == total_url_single_same_item) {
            ele.module_action_list.forEach((moduleTopActionList, index) => {
              if (moduleTopActionList.label.toLowerCase() == action) {
                moduleTopActionList.checked = true;
              }

            })
          }

        }
        // check all select

        if (ele.checked == true) {
          total_module_active++;
        }
        if (total_module == total_module_active) {
          this.all_module_status = true;
          this.moduleLists2.actionlist.forEach((moduleTopActionList, index) => {
            moduleTopActionList.checked = true;
          })
        }
        else {
          this.all_module_status = false;
          this.moduleLists2.actionlist.forEach((moduleTopActionList, index) => {
            if (moduleTopActionList.label.toLowerCase() == action) {
              moduleTopActionList.checked = false;
            }

          })
        }

        // check all module single item count  like sysadmin list ,bis list total = 2

        ele.module_action_list.forEach((moduleActionList, index) => {
          if (moduleActionList.label.toLowerCase() == action) {
            if (moduleActionList.checked == true) {
              total_module_single_item++;
            }
          }

        })

        if (total_module == total_module_single_item) {
          this.moduleLists2.actionlist.forEach((moduleTopActionList) => {
            if (moduleTopActionList.label.toLowerCase() == action) {
              moduleTopActionList.checked = true;
            }
          })
        }



      })

      console.log('total url action_active', total_url_action_item_active);
      console.log('total url action', total_url_action_item);
      console.log('total module', total_module);
      console.log('total module active', total_module_active);
      console.log('total url', total_url);
      console.log('total url_active', total_url_active);
      console.log('total module url same item', total_url_single_same_item);
      console.log('total module url same item active', total_url_single_same_item_active);
      console.log('total module single same item', total_module_single_item);


    },
    setEditData() {
      this.roleGroup = JSON.parse(localStorage.getItem('editData'));
      this.isEdit = true;
      this.editedItem = this.roleGroup;
      this.rolePermissionForm.name = this.roleGroup.name;
      this.rolePermissionForm.status = this.roleGroup.status == 1 ? true : false;
      this.rolePermissionForm.description = this.roleGroup.description;
      this.roleGroup.roles.map((x) => {
        this.rolePermissionForm.roles.push(x.pivot.role_id)
      });
    },

    getDropDownModuleList() {
      var queryData = {
        'table_name': "modules",
        'field_name': ["id", "name", "code"],
        'condition': { status: 1 }
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.dropdownmoduleList = res.data;
        })
        .catch((error) => console.log(error));
    },

    submitForm() {

      this.$v.rolePermissionForm.$touch()
      if (!this.$v.rolePermissionForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm()
        } else {
          this.saveCreateForm()
        }
      }
    },

    getRoleList() {
      var queryData = {
        'table_name': "roles",
        'field_name': ["id", "name", "code"],
        'condition': { status: 1 }
      };
      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.roleList = res.data;
        })
        .catch((error) => console.log(error));
    },

    getModuleList(status = 0) {
      var queryData = {
        'id': this.rolePermissionForm.module_id
      };

      ApiService.getDropData("api/module-url-list", queryData)
        .then((res) => {
          // this.moduleLists = res.data;
          this.moduleLists2 = res.data;
          if (status == 1) {
            this.getRoleActionListActive();
          }
          // this.moduleLists2.actionlist =this.actionlist;
          // this.moduleLists2.data.forEach((module)=> {

          //   // module.actionlist = this.module_actionlist;
          //   module.actionlist = this.actionlist;
          // })
          // console.log(this.moduleLists2);


          // this.moduleLists.children = this.moduleList;

        })
    },

    async getRoleActionListActive(status = 0) {
      this.getModuleList();
      await axios.get('api/role-permission/' + this.rolePermissionForm.role_id)
        .then((res) => {

          this.rolePermissionList = res.data.data;

          if (this.rolePermissionList.length) {
            var totalModule = this.moduleLists2.data.length;
            var totalModuleActive = 0;
            var modulesamelistitem = 0;
            var modulesamecreateitem = 0;
            var modulesameedititem = 0;
            var modulesameviewitem = 0;
            var modulesamedeleteitem = 0;
            var modulesamelistitemActive = 0;
            var modulesamecreateitemActive = 0;
            var modulesameedititemActive = 0;
            var modulesameviewitemActive = 0;
            var modulesamedeleteitemActive = 0;
            this.moduleLists2.data.forEach((module, mindex) => {

              var parentUrlListActive = 0;
              var parentUrlList = module.parenturls.length;
              var parenturlsamelistitem = 0;
              var parenturlsamecreateitem = 0;
              var parenturlsameedititem = 0;
              var parenturlsameviewitem = 0;
              var parenturlsamedeleteitem = 0;
              var parenturlsamelistitemActive = 0;
              var parenturlsamecreateitemActive = 0;
              var parenturlsameedititemActive = 0;
              var parenturlsameviewitemActive = 0;
              var parenturlsamedeleteitemActive = 0;
              module.parenturls.forEach((parenturl, pindex) => {
                var actionList = parenturl.actionlist.length;
                var actionListActive = 0;
                this.rolePermissionList.forEach((rolepermision, rindex) => {
                  if (module.id == rolepermision.module_id && parenturl.id == rolepermision.parent_url_id) {
                    parenturl.actionlist.forEach((url, uindex) => {
                      if (url.action == "list") {
                        parenturlsamelistitem++;
                      }
                      else if (url.action == "create") {
                        parenturlsamecreateitem++;
                      }
                      else if (url.action == "edit") {
                        parenturlsameedititem++;
                      }
                      else if (url.action == "view") {
                        parenturlsameviewitem++;
                      }
                      else if (url.action == "delete") {
                        parenturlsamedeleteitem++;
                      }
                      rolepermision.role_permissionaction.forEach((roleaction, raindex) => {
                        if (url.id == roleaction.url_id && url.parent_url_id == roleaction.parent_url_id) {
                          url.checked = roleaction.checked;
                          actionListActive++;

                          if (url.action == "list" && url.checked == true) {
                            parenturlsamelistitemActive++;
                          }
                          else if (url.action == "create" && url.checked == true) {
                            parenturlsamecreateitemActive++;
                          }
                          else if (url.action == "edit" && url.checked == true) {
                            parenturlsameedititemActive++;
                          }
                          else if (url.action == "view" && url.checked == true) {
                            parenturlsameviewitemActive++;
                          }
                          else if (url.action == "delete" && url.checked == true) {
                            parenturlsamedeleteitemActive++;
                          }
                        }


                      })

                    })
                  }

                })
                // check parent url
                if (actionList == actionListActive) {
                  parenturl.checked = true;
                }
                // count parent url activelit
                if (parenturl.checked == true) {
                  parentUrlListActive++;
                }
              })


              // check module  and  check module action item
              if (parentUrlList == parentUrlListActive) {
                module.checked = true;
                module.module_action_list.forEach((moduleactinlist, macindex) => {
                  moduleactinlist.checked = true;
                })
              }
              else {
                module.module_action_list.forEach((moduleactinlist, macindex) => {

                  if (moduleactinlist.label == "List" && parenturlsamelistitem == parenturlsamelistitemActive) {
                    moduleactinlist.checked = true;
                  }
                  else if (moduleactinlist.label == "Create" && parenturlsamecreateitem == parenturlsamecreateitemActive) {
                    moduleactinlist.checked = true;
                  }
                  else if (moduleactinlist.label == "Edit" && parenturlsameedititem == parenturlsameedititemActive) {
                    moduleactinlist.checked = true;
                  }
                  else if (moduleactinlist.label == "View" && parenturlsameviewitem == parenturlsameviewitemActive) {
                    moduleactinlist.checked = true;
                  }
                  else if (moduleactinlist.label == "Delete" && parenturlsamedeleteitem == parenturlsamedeleteitemActive) {
                    moduleactinlist.checked = true;
                  }
                })
              }
              // check module active
              if (module.checked == true) {
                totalModuleActive++;

              }

              if (totalModule == totalModuleActive) {
                this.all_module_status = true;
                this.moduleLists2.actionlist.forEach((topActionList, tcindex) => {
                  topActionList.checked = true;
                });
              }

              // module same item count and check active
              module.module_action_list.forEach((moduleActionlist, moacindex) => {
                if (moduleActionlist.label == "List") {
                  modulesamelistitem++;
                }
                else if (moduleActionlist.label == "Create") {
                  modulesamecreateitem++;
                }
                else if (moduleActionlist.label == "Edit") {
                  modulesameedititem++;
                }
                else if (moduleActionlist.label == "View") {
                  modulesameviewitem++;
                }
                else if (moduleActionlist.label == "Delete") {
                  modulesamedeleteitem++;
                }

                if (moduleActionlist.label == "List" && moduleActionlist.checked == true) {

                  modulesamelistitemActive++;
                }
                else if (moduleActionlist.label == "Create" && moduleActionlist.checked == true) {
                  modulesamecreateitemActive++;
                }
                else if (moduleActionlist.label == "Edit" && moduleActionlist.checked == true) {
                  modulesameedititemActive++;
                }
                else if (moduleActionlist.label == "View" && moduleActionlist.checked == true) {
                  modulesameviewitemActive++;
                }
                else if (moduleActionlist.label == "Delete" && moduleActionlist.checked == true) {
                  modulesamedeleteitemActive++;
                }
              })
              // console.log('modulesamelistitem' + modulesamelistitem);
              // console.log('modulesamecreateitem' + modulesamecreateitem);
              // console.log('modulesameedititem' + modulesameedititem);
              // console.log('modulesamelistitem' + modulesamelistitem);
              // console.log('modulesameviewitem' + modulesameviewitem);


              // console.log('modulesamelistitemActive' + modulesamelistitemActive);
              // console.log('modulesamecreateitemActive' + modulesamecreateitemActive);
              // console.log('modulesameedititemActive' + modulesameedititemActive);
              // console.log('modulesameviewitemActive' + modulesameviewitemActive);
              // console.log('modulesamedeleteitemActive' + modulesamedeleteitemActive);


              this.moduleLists2.actionlist.forEach((topActionListitem, topcindex) => {

                if (topActionListitem.label == "List" && modulesamelistitem == modulesamelistitemActive) {
                  topActionListitem.checked = true;
                  console.log('l');
                }
                else if (topActionListitem.label == "Create" && modulesamecreateitem == modulesamecreateitemActive) {
                  topActionListitem.checked = true;
                  console.log('c');
                }
                else if (topActionListitem.label == "Edit" && modulesameedititem == modulesameedititemActive) {
                  topActionListitem.checked = true;
                  console.log('e');
                }
                else if (topActionListitem.label == "View" && modulesameviewitem == modulesameviewitemActive) {
                  topActionListitem.checked = true;
                  console.log('v');
                }
                else if (topActionListitem.label == "Delete" && modulesamedeleteitem == modulesamedeleteitemActive) {
                  topActionListitem.checked = true;
                  console.log('d');
                }
              });


            });

          }
          else {
            this.getModuleList();
            this.all_module_status = false;

          }

        })
        .catch((error) => {
          console.log(error);
        })


    },

    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
    async saveCreateForm() {
      this.moduleLists2.role_id = this.rolePermissionForm.role_id;
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post('api/role-permission', this.moduleLists2)
      if (apiResponse.status == 200) {
        console.log(apiResponse);
        // this.$router.push('/system-admin/role-permission/create')
      }
      loader.hide()
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.update('api/role-groups/' + this.editedItem.id, this.rolePermissionForm)
      console.log(apiResponse.status)
      if (apiResponse.status == 200) {
        localStorage.removeItem('editData')
        // this.$router.push('/system-admin/role-permission/create')
      }
      loader.hide()
    },

  },
  validations() {
    const validations = {
      rolePermissionForm: {
        role_id: {
          required,
        },
      }

    };
    if (!this.isEdit) {

    }

    return validations;

  },
}
</script>

<style scoped>
p.custom_css {
  font-size: 14px;
  padding-top: 6px;
}
</style>
