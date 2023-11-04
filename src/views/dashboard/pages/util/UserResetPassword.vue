<template>
    <v-container class="hcontainer">
      <v-row>
        <v-col md="3"> </v-col>
        <v-col md="6">
          <v-row>
            <v-col md="12">
              <v-card class="elevation-12">
                <v-form>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Reset password Form</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    
                    <v-text-field
                        id="password"
                        v-model="user.password"
                        ref="password"
                        label="New Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="passwordshow ? 'text' : 'password'" @click:append="passwordshow = !passwordshow"
                    >   
                    </v-text-field>
                    <p
                        v-if="$v.user.password.$error"
                        class="red--text pl-5"
                        style="color: red"
                        >
                        This field is required
                    </p>
                    <v-text-field
                        prepend-icon="mdi-lock"
                        v-model="user.password_confirmation"
                        name="confirm_password"
                        label="Confirm Password"
                        :append-icon="confirmPasswordshow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="confirmPasswordshow ? 'text' : 'password'"
                        @click:append="confirmPasswordshow = !confirmPasswordshow"
                    >
                    </v-text-field>
                    <p
                        v-if="$v.user.password_confirmation.$error"
                        class="red--text pl-4"
                        style="color: red"
                    >
                        This field is required
                    </p>
                    <p v-if="$v.user.password_confirmation.$error && !$v.user.password_confirmation.sameAsPassword"
                        class="red--text pl-4">Confirm password not match with password
                    </p>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#1b6030"
                      class="mr-0"
                      @click="savePassword"
                    >
                        Save
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
</template>


<script>
import axios from 'axios'
import { required,sameAs } from "vuelidate/lib/validators"
  import ApiService from "@/services/ApiService"
export default {
 name : "UserResetPassword",
  data: () => ({
    user: {
        password: "",
        password_confirmation: ""
    },
    passwordshow: false,
    confirmPasswordshow: false,
    
  }),

  
  methods: {
    savePassword() {
        this.user.reset_code = this.$route.params.reset_code;
        this.$v.user.$touch();
        if (!this.$v.user.$error) 
        {
            ApiService.post("api/reset-password", this.user)
            .then((res) => {
                console.log(res);
                this.$router.push("/login");
            })
            .catch(error => {
            console.log(error);
            });
        }
    },
   
  },

  mounted() {
    console.log(this.$route.params.reset_code);
    localStorage.clear();
  },

  validations() {
    const validations = {
      user: {
        password_confirmation: {
          required,
          sameAsPassword: sameAs('password')
        },
        password: {
          required,
        }
       
      },
    };
    return validations;
  },
};
</script>