<template>
  <v-container id="branch" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="mt-0">
          <v-card-title class="component-title">
            <h4 class="ma-3">
              <v-icon>mdi-plus</v-icon>
              {{
                !isEdit
                  ? $t("branch.branchCreate")
                  : $t("branch.branchEdit")
              }}
            </h4>
          </v-card-title>
          <v-card-text class="mt-2">
            <v-form id="form">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-autocomplete
                      :items="companyList"
                      item-text="company_name"
                      item-value="id"
                      :filter="customFilter"
                      outlined
                      dense
                      hide-details
                      v-model="branchForm.company_id"
                    >
                  <template #label>
                    {{ $t("branch.company_name") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
              <p v-if="$v.branchForm.company_id.$error" class="red--text">
                This field is required
              </p>
            </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      v-model="branchForm.branch_name"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("branch.branch_name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.branchForm.branch_name.$error && !$v.branchForm.branch_name.required
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
                      v-model="branchForm.email"
                    >
                      <template #label>
                        {{ $t("branch.email") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.branchForm.email.$error" class="red--text">
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      :label="$t('branch.contact_no_1')"
                      v-model="branchForm.contact_no_1"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("branch.contact_no_1") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.branchForm.contact_no_1.$error &&
                        !$v.branchForm.contact_no_1.required
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
                      v-model="branchForm.contact_no_2"
                    >
                      <template #label>
                        {{ $t("branch.contact_no_2") }}
                      </template>
                    </v-text-field>
                  
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="branchForm.fax"
                    >
                      <template #label>
                        {{ $t("branch.fax") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="branchForm.address"
                    >
                      <template #label>
                        {{ $t("branch.address") }}
                      </template>
                    </v-text-field>
                  </v-col>
                   <v-col cols="12" md="6">
                    <v-checkbox v-model="branchForm.status" :label="$t('active')" color="info" value="1" hide-details>
                    </v-checkbox>
                   </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="#bd3635"
                      class="mr-5"
                      @click="$router.push('/company-management/branch')"
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
    branchForm: {
      branch_name: "",
      company_id: "",
      email: "",
      contact_no_1: "",
      contact_no_2: "",
      fax: "",
      address: "",
      status: "1",
   
    },
   
    error: "",
    
    companyList: [],
    isEdit: false,
    branch: {},
   
   
  }),
  mounted() {
     this.getCompanyList();
    if (this.$route.params.id) {
      this.isEdit = true;
      this.setEditData();
    }
   
  },

  methods: {
    validateField() {
      this.$refs.avatar.validate();
    },
    getCompanyList() {
      var queryData = {
        table_name: "companies",
        field_name: ["id", "company_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.companyList = res.data;
        })
        .catch((error) => console.log(error));
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.unit_name.toLowerCase();
      const textTwo = item.unit_name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
 
    setEditData() {
      this.branch = JSON.parse(localStorage.getItem("editData"));
      if (this.branch) {
        this.branchForm.branch_name = this.branch.branch_name;
        this.branchForm.company_id = this.branch.company_id;
        this.branchForm.email = this.branch.email;
        this.branchForm.contact_no_1 = this.branch.contact_no_1;
        this.branchForm.contact_no_2 = this.branch.contact_no_2;
        this.branchForm.fax = this.branch.fax;
        this.branchForm.address = this.branch.address;
        this.branchForm.id = this.branch.id;

        this.branchForm.status = this.branch.status == 1 ? "1" : "0";
      }
    },
    submitForm() {
      this.$v.branchForm.$touch();
      if (!this.$v.branchForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    saveCreateForm() {
      let loader = this.$loading.show();
      ApiService.post("api/v1/branch", this.branchForm)
        .then((res) => {
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
            this.$router.push("/company-management/branch");
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
      ApiService.update("api/v1/branch/" + this.branchForm.id, this.branchForm)
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
            this.$router.push("/company-management/branch");
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

    customFilter(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  validations() {
    const validations = {
      branchForm: {
      company_id: {
          required,
        },
        branch_name: {
          required,
        },
        email: {
          required,
          email,
        },
        contact_no_1: {
          required,
        },
        status:{}
        
      },
    };
    if (!this.isEdit) {
     
    }
    return validations;
  },
};
</script>

<style scoped></style>
