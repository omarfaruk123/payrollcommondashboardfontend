<template>
  <div id="changepassword">
    <v-container class="hcontainer">
      <v-row>
        <v-col md="3"> </v-col>
        <v-col md="6">
          <v-row>
            <v-col md="12">
              <v-card class="elevation-8">
                <v-form>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Change Password </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field prepend-icon="mdi-lock" v-model="changePassword.password" ref="password"
                      :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'" :type="passwordshow ? 'text' : 'password'"
                      @click:append="passwordshow = !passwordshow">
                      <template #label>
                        {{ $t('New Password') }} <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.changePassword.password.$error" class="red--text pl-5" style="color: red">
                      This field is required
                    </p>
                    <v-text-field prepend-icon="mdi-lock" v-model="changePassword.confirm_password"
                      name="confirm_password" :append-icon="
                        confirmPasswordshow ? 'mdi-eye' : 'mdi-eye-off'
                      " :type="confirmPasswordshow ? 'text' : 'password'"
                      @click:append="confirmPasswordshow = !confirmPasswordshow">
                      <template #label>
                        {{ $t('Confirm Password') }} <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.changePassword.confirm_password.$error" class="red--text pl-4" style="color: red">
                      This field is required
                    </p>
                    <p v-if="
                      $v.changePassword.confirm_password.$error &&
                      !$v.changePassword.confirm_password.sameAsPassword
                    " class="red--text pl-4">
                      Confirm password not match with password
                    </p>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed style="background-color: #1867c0" @click="passwordChange">
                      Change Password
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
  name: "ChangePassword",
  data: () => ({
    changePassword: {
      password: "",
      confirm_password: "",
    },
    passwordshow: false,
    confirmPasswordshow: false,
  }),

  methods: {
    passwordChange() {
      this.$v.changePassword.$touch();
      if (!this.$v.changePassword.$error) {
        console.log(axios.defaults.headers.common["Authorization"]);
        console.log("jfdkl");
        axios
          .post("api/change-password", this.changePassword)
          .then((res) => {
            console.log(res);
            console.log("ttt");

            localStorage.removeItem("token");
            localStorage.removeItem("editData");
            localStorage.removeItem("user");
            localStorage.removeItem("permissions");
            localStorage.removeItem("parenturls");
            localStorage.removeItem("modulelists");
            this.$store.dispatch("user", null);
            this.$store.dispatch("parenturls", null);
            axios.defaults.headers.common["Authorization"] = "Bearer " + null;
            this.$router.push("/login");
            // this.changePassword.password         = "";
            // this.changePassword.confirm_password = "";
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
          })
          .catch((errors) => {
            console.log("fdk" + errors);
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
    const validations = {
      changePassword: {
        confirm_password: {
          required,
          sameAsPassword: sameAs("password"),
        },
        password: {
          required,
        },
      },
    };
    return validations;
  },
};
</script>
