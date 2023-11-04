<template>
  <v-container id="company" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="mt-0">
          <v-card-title class="component-title">
            <h4 class="ma-3">
              <v-icon>mdi-plus</v-icon>
              {{
                !isEdit
                  ? $t("company.companyCreate")
                  : $t("company.companyEdit")
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
                      v-model="companyForm.company_name"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("company.company_name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.companyForm.company_name.$error && !$v.companyForm.company_name.required
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
                      v-model="companyForm.email"
                    >
                      <template #label>
                        {{ $t("company.email") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.companyForm.email.$error" class="red--text">
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      :label="$t('company.contact_no_1')"
                      v-model="companyForm.contact_no_1"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("company.contact_no_1") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.companyForm.contact_no_1.$error &&
                        !$v.companyForm.contact_no_1.required
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
                      v-model="companyForm.contact_no_2"
                    >
                      <template #label>
                        {{ $t("company.contact_no_2") }}
                      </template>
                    </v-text-field>
                  
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.fax"
                    >
                      <template #label>
                        {{ $t("company.fax") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.country"
                    >
                      <template #label>
                        {{ $t("company.country") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.city"
                    >
                      <template #label>
                        {{ $t("company.city") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.division"
                    >
                      <template #label>
                        {{ $t("company.division") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.district"
                    >
                      <template #label>
                        {{ $t("company.district") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.state"
                    >
                      <template #label>
                        {{ $t("company.state") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.address_1"
                    >
                      <template #label>
                        {{ $t("company.address_1") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.address_2"
                    >
                      <template #label>
                        {{ $t("company.address_2") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.website"
                    >
                      <template #label>
                        {{ $t("company.website") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.linkedin"
                    >
                      <template #label>
                        {{ $t("company.linkedin") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.facebook"
                    >
                      <template #label>
                        {{ $t("company.facebook") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.youtube"
                    >
                      <template #label>
                        {{ $t("company.youtube") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.twitter"
                    >
                      <template #label>
                        {{ $t("company.twitter") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.instagram"
                    >
                      <template #label>
                        {{ $t("company.instagram") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="companyForm.others"
                    >
                      <template #label>
                        {{ $t("company.others") }}
                      </template>
                    </v-text-field>
                  </v-col>
                   <v-col cols="12" md="6">
                    <v-checkbox v-model="companyForm.status" :label="$t('active')" color="info" value="1" hide-details>
                    </v-checkbox>
                   </v-col>
                 
                  <v-col cols="12" md="6" class="pb-0">
                    <v-row>
                      <v-col cols="12" md="10" class="pb-0">
                        <v-text-field
                          outlined
                          dense
                          label="Select Logo"
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
                          v-else-if="companyForm.logo"
                          :src="asset_url + '/' + companyForm.logo"
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
                      <v-col cols="12" md="10" class="pb-0">
                        <v-text-field
                          outlined
                          dense
                          label="Select Banner"
                          @click="bannerpickFile"
                          v-model="bannerimageName"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="banneravatar"
                          accept="image/*"
                          @change="onBannerFilePicked"
                        />
                      </v-col>
                      <v-col cols="12" md="2" class="pb-0">
                        <img v-if="bannerimageUrl" :src="bannerimageUrl" height="50" />

                        <img
                          v-else-if="companyForm.banner"
                          :src="asset_url + '/' + companyForm.banner"
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

              


                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="#bd3635"
                      class="mr-5"
                      @click="$router.push('/company-management/company')"
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
    companyForm: {
      company_name: "",
      email: "",
      contact_no_1: "",
      contact_no_2: "",
      fax: "",
      country: "",
      city: "",
      division: "",
      district: "",
      state: "",
      address_1: "",
      address_2: "",
      website: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      twitter: "",
      instagram: "",
      others: "",
      logo: "",
      banner: "",
      status: "1",
   
    },
    imageName: "",
    imageUrl: "",
    bannerimageName: "",
    bannerimageUrl: "",
    error: "",
    asset_url: process.env.VUE_APP_API_BASE_URL,
   
    isEdit: false,
    company: {},
   
   
  }),
  mounted() {
  
    if (this.$route.params.id) {
      this.isEdit = true;
      this.setEditData();
    }
   
  },

  methods: {
    validateField() {
      this.$refs.avatar.validate();
    },
 
    setEditData() {
      this.company = JSON.parse(localStorage.getItem("editData"));
      if (this.company) {
        this.companyForm.company_name = this.company.company_name;
        this.companyForm.email = this.company.email;
        this.companyForm.contact_no_1 = this.company.contact_no_1;
        this.companyForm.contact_no_2 = this.company.contact_no_2;
        this.companyForm.fax = this.company.fax;
        this.companyForm.country = this.company.country;
        this.companyForm.city = this.company.city;
        this.companyForm.state = this.company.state;
        this.companyForm.division = this.company.division;
        this.companyForm.district = this.company.district;
        this.companyForm.address_1 = this.company.address_1;
        this.companyForm.address_2 = this.company.address_2;
        this.companyForm.website = this.company.website;
        this.companyForm.linkedin = this.company.linkedin;
        this.companyForm.facebook = this.company.facebook;
        this.companyForm.youtube = this.company.youtube;
        this.companyForm.twitter = this.company.twitter;
        this.companyForm.instagram = this.company.instagram;
        this.companyForm.others = this.company.others;
        this.companyForm.logo = this.company.logo;
        this.companyForm.status = this.company.status == 1 ? "1" : "0";
      }
    },
    submitForm() {
      this.$v.companyForm.$touch();
      if (!this.$v.companyForm.$error) {
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
      Object.entries(this.companyForm).filter((item) => {
        formData.append(item[0], item[1]);
      });
      if (this.$refs.avatar.files[0]) {
        formData.append("logo", this.$refs.avatar.files[0]);
      }
      if (this.$refs.banneravatar.files[0]) {
        formData.append("banner", this.$refs.banneravatar.files[0]);
      }
      ApiService.post("api/v1/companies", formData)
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
            this.$router.push("/company-management/company");
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
      Object.entries(this.companyForm).filter((item) => {
        formData.append(item[0], item[1]);
      });

      if (this.$refs.avatar.files && this.$refs.avatar.files[0]) {
        formData.append("new_logo", this.$refs.avatar.files[0]);
      }
      if (this.$refs.banneravatar.files && this.$refs.banneravatar.files[0]) {
        formData.append("new_banner", this.$refs.banneravatar.files[0]);
      }
      formData.append("_method", "PUT");
      axios
        .post("api/v1/companies/" + this.company.id, formData)
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
            this.$router.push("/company-management/company");
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
    bannerpickFile() {
      this.$refs.banneravatar.click();
    },
    onBannerFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.bannerimageName = files[0].name;
        if (this.bannerimageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.bannerimageUrl = fr.result;
        });
      } else {
        this.bannerimageName = "";
        this.bannerimageUrl = "";
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
      companyForm: {
        company_name: {
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
