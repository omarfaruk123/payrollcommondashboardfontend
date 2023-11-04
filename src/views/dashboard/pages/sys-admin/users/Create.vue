<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="mt-0">
          <v-card-title class="component-title">
            <h4 class="ma-3">
              <v-icon>mdi-plus</v-icon>
              {{
                !isEdit
                  ? $t("createUser.userCreate")
                  : $t("createUser.userEdit")
              }}
            </h4>
          </v-card-title>
          <v-card-text class="mt-2">
            <v-form id="form">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      v-model="userForm.name"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("createUser.name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.userForm.name.$error && !$v.userForm.name.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.name.$error && !$v.userForm.name.minLength
                      "
                      class="red--text"
                    >
                      This field must have at least
                      {{ $v.userForm.name.$params.minLength.min }}
                      character
                    </p>
                    <p
                      v-if="
                        $v.userForm.name.$error && !$v.userForm.name.maxLength
                      "
                      class="red--text"
                    >
                      This field must not have more than
                      {{ $v.userForm.name.$params.maxLength.max }}
                      character
                    </p>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.user_id"
                    >
                      <template #label>
                        {{ $t("createUser.userId") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.userForm.user_id.$error" class="red--text">
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.user_id.$error &&
                        !$v.userForm.user_id.maxLength
                      "
                      class="red--text"
                    >
                      This field must not have more than
                      {{ $v.userForm.user_id.$params.maxLength.max }}
                      character
                    </p>

                    <p
                      v-if="
                        $v.userForm.user_id.$error &&
                        !$v.userForm.user_id.required
                      "
                      class="red--text"
                    >
                      This field allow only number
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      :label="$t('createUser.user_name')"
                      v-model="userForm.user_name"
                      outlined
                      dense
                      hide-details
                    />
                    <p
                      v-if="
                        $v.userForm.user_name.$error &&
                        !$v.userForm.user_name.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.user_name.$error &&
                        !$v.userForm.user_name.minLength
                      "
                      class="red--text"
                    >
                      This field must have at least
                      {{ $v.userForm.user_name.$params.minLength.min }}
                      character
                    </p>
                    <p
                      v-if="
                        $v.userForm.user_name.$error &&
                        !$v.userForm.user_name.maxLength
                      "
                      class="red--text"
                    >
                      This field must not have more than
                      {{ $v.userForm.user_name.$params.maxLength.max }}
                      character
                    </p>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.email"
                    >
                      <template #label>
                        {{ $t("createUser.email") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.userForm.email.$error && !$v.userForm.email.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.email.$error && !$v.userForm.email.minLength
                      "
                      class="red--text"
                    >
                      This field must have at least
                      {{ $v.userForm.email.$params.minLength.min }}
                      character
                    </p>
                    <p
                      v-if="
                        $v.userForm.email.$error && !$v.userForm.email.maxLength
                      "
                      class="red--text"
                    >
                      This field must not have
                      {{ $v.userForm.email.$params.maxLength.max }}
                      character
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.phone"
                    >
                      <template #label>
                        {{ $t("createUser.phone") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.userForm.phone.$error && !$v.userForm.phone.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.phone.$error && !$v.userForm.phone.minLength
                      "
                      class="red--text"
                    >
                      This field must have at least
                      {{ $v.userForm.phone.$params.minLength.min }}
                      character
                    </p>
                    <p
                      v-if="
                        $v.userForm.phone.$error && !$v.userForm.phone.maxLength
                      "
                      class="red--text"
                    >
                      This field must not have more than
                      {{ $v.userForm.phone.$params.maxLength.max }}
                      character
                    </p>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-if="!isEdit"
                      class="purple-input"
                      :label="$t('createUser.password')"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.password"
                      :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="passwordshow ? 'text' : 'password'"
                      @click:append="passwordshow = !passwordshow"
                    >
                    </v-text-field>
                    <p
                      v-if="error.password"
                      class="mb-0"
                      style="color: red; font-size: 11px"
                    >
                      Your password must be more than 6 characters long,should
                      contain at-least 1 Uppercase, 1 Lowercase, 1 Numeric and 1
                      special characters
                    </p>
                    <p v-if="$v.userForm.password.$error" class="red--text">
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-if="!isEdit"
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.password_confirmation"
                      :append-icon="
                        confirmPasswordshow ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="confirmPasswordshow ? 'text' : 'password'"
                      @click:append="confirmPasswordshow = !confirmPasswordshow"
                    >
                      <template #label>
                        {{ $t("createUser.confirmPassword") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.userForm.password_confirmation.$error &&
                        !$v.userForm.password_confirmation.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                    <p
                      v-if="
                        $v.userForm.password_confirmation.$error &&
                        !$v.userForm.password_confirmation.sameAsPassword
                      "
                      class="red--text"
                    >
                      Confirm password not match with password
                    </p>
                  </v-col>
                  <!-- dont remove this colum just hide
                  <v-col cols="12" md="6">
                    <v-menu
                      ref="menu"
                      v-model="datePicker"
                      :close-on-content-click="false"
                      :return-value.sync="userForm.password_expire"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      class="purple-input"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="userForm.password_expire"
                          :label="$t('createUser.password_expire')"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          class="purple-input"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="userForm.password_expire"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="datePicker = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="$refs.menu.save(userForm.password_expire)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <p
                      v-if="$v.userForm.password_expire.$error"
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col> -->

                  <v-col cols="12" md="6">
                    <v-autocomplete
                      :items="roleGroups"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="userForm.role_group_id"
                    >
                      <template #label>
                        {{ $t("roleGroup.roleGroup") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="$v.userForm.role_group_id.$error"
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0">
                    <v-row>
                      <v-col cols="12" md="10" class="pb-0">
                        <v-text-field
                          outlined
                          dense
                          label="Select Profile Picture"
                          @click="pickFile"
                          v-model="imageName"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="avatar"
                          accept="image/*"
                          @change="onFilePicked"
                        />
                      </v-col>
                      <v-col cols="12" md="2" class="pb-0">
                        <img v-if="imageUrl" :src="imageUrl" height="50" />

                        <img
                          v-else-if="userForm.image"
                          :src="asset_url + '/' + userForm.image"
                          height="50"
                        />
                      </v-col>
                      <p
                        class="mb-2 ml-3 pl-2 pt-1 pb-1 pr-2"
                        style="background: #efefef"
                      >
                        Supported Image Formats: JPG/JPEG/PNG &nbsp;&nbsp; Max
                        Image Size: 1MB
                      </p>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="6" class="pb-0">
                    <v-row>
                      <v-col cols="12" md="9">
                        <v-autocomplete
                          :items="newUserTypes"
                          item-text="name"
                          item-value="id"
                          outlined
                          dense
                          hide-details
                          v-model="userForm.user_type_id"
                        >
                          <template #label>
                            {{ $t("User Type") }}
                            <span class="red--text"><strong>* </strong></span>
                          </template>
                        </v-autocomplete>
                        <p
                          v-if="$v.userForm.user_type_id.$error"
                          class="red--text"
                        >
                          This field is required
                        </p>
                      </v-col>
                      <v-col cols="6" md="3">
                        <v-checkbox
                          v-model="userForm.status"
                          :label="$t('active')"
                          color="info"
                          value="1"
                          hide-details
                          style="margin-top: 5px"
                        ></v-checkbox>
                      </v-col>
                    
                    </v-row>
                  </v-col>

                  
                

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="#bd3635"
                      class="mr-5"
                      @click="$router.push('/system-admin/users')"
                    >
                      {{ $t("cancel") }}
                    </v-btn>

                    <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                      {{ isEdit ? $t("update") : $t("save") }}
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
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  email,
  minLength,
  maxLength,
  requiredIf,
  numeric,
} from "vuelidate/lib/validators";

import axios from "axios";

export default {
  name: "Create",
  mixins: [validationMixin, PermissionMixin],
  data: () => ({
    roleGroups: [],
    newUserTypes: [],
    userForm: {
      user_id: "",
      user_name: "",
      name: "",
      phone: "",
      email: "",
      role_group_id: "",
      image: "",
      status: "1",
      password: "",
      password_confirmation: "",
      user_type_id: "",
    },
    imageName: "",
    imageUrl: "",
    error: "",
    asset_url: process.env.VUE_APP_API_BASE_URL,
    passwordshow: false,
    confirmPasswordshow: false,
    isEdit: false,
    user_id: null,
    user: {},
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    datePicker: false,
    disabledPOName: false,
  }),
  mounted() {
    this.getNewUerTypeList();
    this.getRoleGroupList();
    if (this.$route.params.id) {
      this.isEdit = true;
      this.disabledPOName = true;
      this.user_id = this.$route.params.id;
      this.setEditData();
    }
    let user_type_value = JSON.parse(localStorage.getItem("user"));
  },

  methods: {
    validateField() {
      this.$refs.avatar.validate();
    },
   
  
    getRoleGroupList() {
      ApiService.get("api/role-group-list").then((res) => {
        this.roleGroups = res.data.data;
      });
    },
    getNewUerTypeList() {
      var queryData = {
        table_name: "user_types",
        field_name: ["id", "name"],
        condition: { status: 1 },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.newUserTypes = res.data;
        })
        .catch((error) => console.log(error));
    },
    setEditData() {
      this.user = JSON.parse(localStorage.getItem("editData"));
      if (this.user) {
        this.userForm.user_id = this.user.user_id;
        this.userForm.user_name = this.user.user_name;
        this.userForm.name = this.user.name;
        this.userForm.email = this.user.email;
        this.userForm.phone = this.user.phone;
        this.userForm.image = this.user.image;
        this.userForm.role_group_id = this.user.role_group_id;
        this.userForm.user_type_id = this.user.user_type_id;
        this.userForm.status = this.user.status.toLowerCase();
      }
    },
    submitForm() {
      this.$v.userForm.$touch();
      if (!this.$v.userForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    saveCreateForm() {
      let loader = this.$loading.show();
      let formData = new FormData(document.getElementById("form"));
      Object.entries(this.userForm).filter((item) => {
        formData.append(item[0], item[1]);
      });
      if (this.$refs.avatar.files[0]) {
        formData.append("image", this.$refs.avatar.files[0]);
      }
      ApiService.post("api/users", formData)
        .then((res) => {
          console.log(res);
          this.error = res.data.errors;
          let message = "";
          if (res.data.code == 2003) {
            Object.values(res.data.errors).map((ele) => {
              ele.map((msg) => {
                message = message + msg + "<br>";
              });
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          } else if (res.data.success) {
            console.log(res);
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
            this.$router.push("/system-admin/users");
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    saveUpdateForm() {
      let loader = this.$loading.show();
      let formData = new FormData(document.getElementById("form"));
      Object.entries(this.userForm).filter((item) => {
        formData.append(item[0], item[1]);
      });

      if (this.$refs.avatar.files && this.$refs.avatar.files[0]) {
        formData.append("new_image", this.$refs.avatar.files[0]);
      }
      formData.append("_method", "PUT");
      axios
        .post("api/users-update/" + this.user.id, formData)
        .then((res) => {
          let message = "";
          if (res.data.code == 2003) {
            Object.values(res.data.errors).map((ele) => {
              ele.map((msg) => {
                message = message + msg + "<br>";
              });
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          } else if (res.data.success) {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
            localStorage.removeItem("editData");
            this.$router.push("/system-admin/users");
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    pickFile() {
      this.$refs.avatar.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      } else {
        this.imageName = "";
        this.imageUrl = "";
      }
    },
    customFilter(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  validations() {
    const validations = {
      userForm: {
        user_id: {
          required,
          maxLength: maxLength(35),
        },
        user_name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(95),
        },
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(95),
        },
        phone: {
          required,
          numeric,
          minLength: minLength(7),
          maxLength: maxLength(11),
        },
        email: {
          required,
          email,
          minLength: minLength(5),
          maxLength: maxLength(35),
        },
        role_group_id: {
          required,
        },
        password: {},
        password_confirmation: {},
       
        user_type_id: {
          required,
        },
      },
    };
    if (!this.isEdit) {
      validations.userForm.password = {
        required,
      };
      validations.userForm.password_confirmation = {
        required,
        sameAsPassword: sameAs("password"),
      };
    }
    return validations;
  },
};
</script>

<style scoped></style>
