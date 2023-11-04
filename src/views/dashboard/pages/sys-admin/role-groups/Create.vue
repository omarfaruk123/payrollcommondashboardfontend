<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined>
          <v-card-title class="component-title">
            <h4 class="ma-3">
              {{ $t('roleGroup.roleGroup') }} {{ !isEdit ? $t('create') : $t('edit') }}
            </h4>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="mt-5">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field class="purple-input" :label="$t('name')" outlined dense
                      v-model="roleGroupForm.name" />
                    <p v-if="$v.roleGroupForm.name.$error && !$v.roleGroupForm.name.required" class="red--text">This
                      field is
                      required</p>
                    <p v-if="$v.roleGroupForm.name.$error && !$v.roleGroupForm.name.minLength" class="red--text">
                      This field must have at least
                      {{ $v.roleGroupForm.name.$params.minLength.min }}
                      character
                    </p>
                    <p v-if="$v.roleGroupForm.name.$error && !$v.roleGroupForm.name.maxLength" class="red--text">
                      This field must not have
                      {{ $v.roleGroupForm.name.$params.maxLength.max }}
                      character
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field class="purple-input" :label="$t('description')" outlined dense
                      v-model="roleGroupForm.description" />

                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox v-model="roleGroupForm.status" :label="$t('active')" color="info" :value="true"
                      hide-details></v-checkbox>
                    <template v-slot:label>
                      <label>{{ $t('status') }}</label>
                    </template>
                  </v-col>

                  <v-col md="6"></v-col>
                  <v-col md="12">
                    <label>{{ $t('role.role') }}s</label>
                  </v-col>
                  <v-col cols="12" md="4" v-for="(group, i) in roleSet">
                    <v-checkbox v-for="role in roleList.slice(i * 5, (i + 1) * 5)" v-model="roleGroupForm.roles"
                      :label="role.name" :value="role.id" color="info"></v-checkbox>

                  </v-col>
                  <v-col md="12" v-if="$v.roleGroupForm.roles.$error">
                    <p v-if="$v.roleGroupForm.roles.$error" class="red--text">Choose at least one role</p>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn color="#bd3635" class="mr-5" @click="$router.push('/system-admin/role-groups')">
                      {{ $t('cancel') }}
                    </v-btn>
                    <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                      {{ isEdit ? $t("update") : $t("save") }}
                    </v-btn>
                    <v-btn color="#1b6030" class="mr-0 hidden-lg-and-down" id="resetValidation"
                      @click="$v.roleGroupForm.$reset">
                      reset validation
                    </v-btn>
                  </v-col>





                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import ApiService from "@/services/ApiService";

export default {
  name: "Create",
  mixins: [validationMixin],
  data: () => ({
    roleGroupForm: {
      name: '',
      status: true,
      description: '',
      roles: [],
    },
    isEdit: false,
    editedItem: {},
    roleList: [],
    roleGroup: {},
    roleGroupRoles: []
  }),
  computed: {
    roleSet() {
      return Array.from(Array(Math.ceil(this.roleList.length / 5)).keys())
    }
  },
  mounted() {
    this.getRoleList()
    if (this.$route.params.id) {
      this.isEdit = true;
      this.user_id = this.$route.params.id;
      this.setEditData();
    }
  },
  methods: {
    setEditData() {
      this.roleGroup = JSON.parse(localStorage.getItem('editData'));
      this.isEdit = true;
      this.editedItem = this.roleGroup;
      this.roleGroupForm.name = this.roleGroup.name;
      this.roleGroupForm.status = this.roleGroup.status == 1 ? true : false;
      this.roleGroupForm.description = this.roleGroup.description;
      this.roleGroup.roles.map((x) => {
        this.roleGroupForm.roles.push(x.pivot.role_id)
      });
    },
    submitForm() {
      this.$v.roleGroupForm.$touch()
      if (!this.$v.roleGroupForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm()
        } else {
          this.saveCreateForm()
        }
      }
    },
    getRoleList() {
      ApiService.get('api/role-list')
        .then((res) => {
          this.roleList = res.data;
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
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post('api/role-groups', this.roleGroupForm)
      if (apiResponse.status == 200) {
        this.$router.push('/system-admin/role-groups')
      }
      loader.hide()
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.update('api/role-groups/' + this.editedItem.id, this.roleGroupForm)
      console.log(apiResponse.status)
      if (apiResponse.status == 200) {
        localStorage.removeItem('editData')
        this.$router.push('/system-admin/role-groups')
      }
      loader.hide()
    },

  },
  validations() {
    const validations = {
      roleGroupForm: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(35)
        },
        status: {},
        roles: {
          required
        },
        description: {},
      }

    };
    if (!this.isEdit) {

    }

    return validations;

  },
}
</script>

<style scoped>
</style>
