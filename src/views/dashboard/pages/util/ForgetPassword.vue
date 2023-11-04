<template>
  <div id="forgetpass">
    <v-container class="hcontainer">
      <v-row>
        <v-col md="3"> </v-col>
        <v-col md="6">
          <v-row>
            <v-col md="12">
              <v-card class="elevation-12">
                <v-form>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Forgot Password Form</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      prepend-icon="mdi-account-check"
                      v-model="user.email"
                      type="text"
                    >
                      <template #label>
                        {{ $t("Email") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="$v.user.email.$error"
                      class="red--text"
                      style="color: red"
                    >
                      This field is required
                    </p>
                    <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="user.mobile"
                      label="Mobile No"
                      type="text"
                    >
                    </v-text-field>
                    <p
                      v-if="$v.user.mobile.$error"
                      class="red--text"
                      style="color: red; float-right;"
                    >
                      This field is required
                    </p>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn color="#1b6030" class="mr-0" @click="goBack">
                      Back
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      depressed
                      style="background-color: #1867c0"
                      @click="sendEmail"
                    >
                      Send Link
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="3"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import ApiService from "@/services/ApiService";
export default {
  name: "ForgetPassword",

  data: () => ({
    user: {
      mobile: "",
      email: "",
    },
    error: "",
    msg: "",
  }),

  //   mounted() {
  //     this.path = this.$route.path;
  //   },

  methods: {
    goBack() {
      this.$router.push("/login");
    },
    sendEmail() {
      this.user.base_url = window.location.origin;
      this.$v.user.$touch();
      if (!this.$v.user.$error) {
        ApiService.post("api/forget-password", this.user)
          .then((res) => {
            console.log(res);
            (this.user.email = ""),
              (this.user.mobile = ""),
              (this.msg = res.data.message),
              console.log(res);
            console.log(this.msg);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },

  validations() {
    const validations = {
      user: {
        email: {
          required,
        },
        mobile: {
          required,
        },
      },
    };
    return validations;
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
