<template>
  <div id="adminlogin">
    <v-container class="hcontainer">
      <v-row>
        <v-col md="3"></v-col>
        <v-col md="6">
          <v-row>
            <v-col md="12">
              <v-card class="elevation-12">
                <v-form>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Login Form</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      prepend-icon="mdi-account-check"
                      v-model="loginForm.email"
                      type="text"
                    >
                      <template #label>
                        {{ $t("Email") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="$v.loginForm.email.$error"
                      class="red--text"
                      style="color: red"
                    >
                      This field is required
                    </p>
                    <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="loginForm.password"
                      type="password"
                    >
                      <template #label>
                        {{ $t("Password") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="$v.loginForm.password.$error"
                      class="red--text"
                      style="color: red; float: right"
                    >
                      This field is required
                    </p>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      depressed
                      color="pink"
                      style="background-color: #1a5f30"
                      @click="goForgetPassword"
                    >
                      Forgot Password
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      depressed
                      style="background-color: #1867c0"
                      @click="loginHandel"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Apiservice from "../../services/ApiService.js";
import { required } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data: () => ({
    loginForm: {
      email: "",
      password: "",
    },
    error: "",
    path: null,
  }),

  mounted() {
    this.path = this.$route.path;
  },

  methods: {
    goForgetPassword() {
      this.$router.push("/forget-password");
    },
    loginHandel() {
      this.$v.loginForm.$touch();
      if (!this.$v.loginForm.$error) {
        axios
          .post("/api/login", this.loginForm)
          .then((res) => {
            this.error = "";
            this.email = "";
            this.password = "";
            localStorage.setItem("token", res.data.data.token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.data.token;
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            localStorage.setItem(
              "permissions",
              JSON.stringify(res.data.data.permissions)
            );
            localStorage.setItem(
              "parenturls",
              JSON.stringify(res.data.data.parenturls)
            );
            localStorage.setItem(
              "modulelists",
              JSON.stringify(res.data.data.modulelists)
            );
  
            this.$store.dispatch("parenturls", res.data.data.parenturls);
            this.$store.dispatch("user", "user", res.data.data.user);
            //this.$store.dispatch("menulist");
            this.$router.push("/");
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
          })
          .catch((errors) => {
            const errorMsg = errors?.response?.data?.data?.error;
            if (errorMsg) {
              Toast.fire({
                icon: "error",
                title: errors.response.data.data.error,
              });
            }
          });
      }
    },
  },

  validations() {
    return {
      loginForm: {
        email: {
          required,
        },
        password: {
          required,
        },
      },
    };
  },
};
</script>

<style scoped>
#loginsignup {
  /* background-color: #fff; */
  margin-top: 7px;
}

.hcontainer {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.mcontainer {
  margin-top: 17px;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.login_form {
  background-color: #ddd;
  padding: 10px 10px;
}

.logincardhw {
  height: auto;
  width: 90%;
  font-size: 14px;
  padding: 6px 10px;
  margin: 20px 0px;
}

.signupcardhw {
  height: auto;
  width: 90%;
  font-size: 14px;
  padding: 6px 10px;
  margin: 20px 0px;
}
</style>
