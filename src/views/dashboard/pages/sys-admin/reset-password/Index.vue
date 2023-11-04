<template>
  <v-container id="activity-log-list" fluid tag="section">
    <v-card outlined class="mt-2">
      <v-card-title class="component-title">
        <div class="title-left">
          <h4 class="title-text">Resseting user password</h4>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row class="mb-3 mt-5">
          <v-col cols="10" md="5" class="py-0">
            <v-autocomplete
              :items="userList"
              item-text="email"
              item-value="id"
              v-model="userSearchForm.id"
              outlined
              dense
            >
              <template #label>
                {{ $t("userList.email") }}
                <span class="red--text"><strong> </strong></span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="auto" class="py-0" @click="getUserInfo">
                <v-btn color="#1b6030">Search</v-btn>
              </v-col>
              <v-col cols="auto" class="py-0" @click="clear">
                <v-btn color="#bd3635"> Refresh</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <hr />
        <v-row class="py-0 mt-5 ml-3 mb-3" v-if="showUser">
          <v-col cols="12" md="3">
            <v-img
              max-height="180"
              max-width="120"
              cover
              :src="asset_url + '/' + userInfo.image"
            >
            </v-img>
          </v-col>

          <v-col cols="12" md="6">
            <div>
              <p>
                <span class="font-weight-black">Name:</span> {{ userInfo.name }}
              </p>
              <p>
                <span class="font-weight-black">User Name:</span>
                {{ userInfo.user_name }}
              </p>
              <p>
                <span class="font-weight-black">Phone:</span>
                {{ userInfo.phone }}
              </p>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="showUser" class="mt-5">
          <v-col cols="12">
            <v-card-title class="component-title">
              <div class="title-left">
                <h4 class="title-text">Please fill up below form</h4>
              </div>
            </v-card-title>
            <v-card-text>
              <v-form id="form" class="mt-5">
                <v-container>
                  <v-row
                    class="d-flex flex-column mb-6 bg-surface-variant"
                    align="center"
                    justify="center"
                  >
                    <v-col cols="12" md="6">
                      <v-text-field
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
                        v-if="error.password && !$v.userForm.password.minLength"
                        class="mb-0"
                        style="color: red; font-size: 11px"
                      >
                        Your password must be more than This field must not have
                        more than
                        {{ $v.userForm.password.$params.minLength.min }}
                        character characters long,should contain at-least 1
                        Uppercase, 1 Lowercase, 1 Numeric and 1 special
                        characters
                      </p>
                      <p
                        v-if="
                          $v.userForm.password.$error &&
                          !$v.userForm.password.required
                        "
                        class="red--text"
                      >
                        This field is required
                      </p>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        class="purple-input"
                        outlined
                        dense
                        hide-details
                        v-model="userForm.password_confirmation"
                        :append-icon="
                          confirmPasswordshow ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="confirmPasswordshow ? 'text' : 'password'"
                        @click:append="
                          confirmPasswordshow = !confirmPasswordshow
                        "
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

                    <v-col cols="6" class="text-center">
                      <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                        {{ $t("update") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Index",
  mixins: [DataTableMixin, PermissionMixin, validationMixin],
  data: () => ({
    userList: [],
    totalItems: 0,
    loading: true,
    showUser: false,
    asset_url: process.env.VUE_APP_API_BASE_URL,
    userSearchForm: {
      id: null,
      user_id: null,
      email: null,
    },
    error: "",
    userInfo: {},
    userForm: {
      password: "",
      password_confirmation: "",
    },
    passwordshow: false,
    confirmPasswordshow: false,
    isEdit: false,
  }),
  computed: {},
  mounted() {
    this.getUserList();
  },
  watch: {
    params: {
      handler() {},
      deep: true,
    },
  },
  methods: {
    getUserList() {
      var queryData = {
        table_name: "users",
        field_name: ["id", "email"],
        condition: { status: 1, status: "active" },
      };
      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.userList = res.data;
        })
        .catch((error) => console.log(error));
    },
    getUserInfo(id = null) {
      ApiService.get("api/user-profile/" + this.userSearchForm.id).then(
        (res) => {
          this.userInfo = res.data.data[0];
          if (this.userInfo != null) {
            this.showUser = true;
          } else {
            this.showUser = false;
          }
        }
      );
    },
    clear() {
      this.userInfo = {
        id: "",
        image: null,
        email: null,
        phone: null,
        user_name: null,
      };
      this.userSearchForm = {};
      this.showUser = false;
    },
    submitForm() {
      this.$v.userForm.$touch();
      if (!this.$v.userForm.$error) {
        let formData = new FormData(document.getElementById("form"));
        Object.entries(this.userForm).filter((item) => {
          formData.append(item[0], item[1]);
        });
        if (this.userSearchForm.id) {
          formData.append("id", this.userSearchForm.id);
        }
        ApiService.post("api/user/reset-password", formData)
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
              // this.$router.push("/system-admin/reset-password");
            }
          })
          .catch((errors) => {
            Toast.fire({
              icon: "error",
              title: errors,
            });
          });
      } else {
        Toast.fire({
          icon: "error",
          title: "Password at least 6 characters long",
        });
      }
    },
  },
  validations() {
    const validations = {
      userForm: {
        password: {},
        password_confirmation: {},
      },
    };
    validations.userForm.password = {
      required,
      minLength: minLength(6),
      maxLength: maxLength(12),
    };
    validations.userForm.password_confirmation = {
      required,
      sameAsPassword: sameAs("password"),
    };

    return validations;
  },
};
</script>
