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
                  ? $t("empDetail.empDetailCreate")
                  : $t("empDetail.empDetailEdit")
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
                      v-model="empDetailForm.emp_no"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("empDetail.emp_no") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.empDetailForm.emp_no.$error && !$v.empDetailForm.emp_no.required
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
                      v-model="empDetailForm.father_name"
                    >
                      <template #label>
                        {{ $t("empDetail.father_name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p v-if="$v.empDetailForm.father_name.$error" class="red--text">
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      :label="$t('empDetail.mother_name')"
                      v-model="empDetailForm.mother_name"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("empDetail.mother_name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.empDetailForm.mother_name.$error &&
                        !$v.empDetailForm.mother_name.required
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
                      v-model="empDetailForm.spouse"
                    >
                      <template #label>
                        {{ $t("empDetail.spouse") }}
                      </template>
                    </v-text-field>
                  
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="empDetailForm.tin"
                    >
                      <template #label>
                        {{ $t("empDetail.tin") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="empDetailForm.nid"
                    >
                      <template #label>
                        {{ $t("empDetail.nid") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="empDetailForm.education"
                    >
                      <template #label>
                        {{ $t("empDetail.education") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="empDetailForm.training"
                    >
                      <template #label>
                        {{ $t("empDetail.training") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="empDetailForm.experience"
                    >
                      <template #label>
                        {{ $t("empDetail.experience") }}
                      </template>
                    </v-text-field>
                  </v-col>
                 
                  <v-col cols="12" md="6" class="pb-0">
                    <v-row>
                      <v-col cols="12" md="10" class="pb-0">
                        <v-text-field
                          outlined
                          dense
                          label="Select Certificate"
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
                          v-else-if="empDetailForm.certificate"
                          :src="asset_url + '/' + empDetailForm.certificate"
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
                          label="Select Resume"
                          @click="pickFileResume"
                          v-model="imageNameResume"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="avatarResume"
                          accept="image/*"
                          @change="onFilePickedResume"
                        />
                      </v-col>
                      <v-col cols="12" md="2" class="pb-0">
                        <img v-if="imageUrlResume" :src="imageUrlResume" height="50" />

                        <img
                          v-else-if="empDetailForm.resume"
                          :src="asset_url + '/' + empDetailForm.resume"
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
                          label="Select Personal File"
                          @click="pickFilePersonalFile"
                          v-model="imageNamePersonalFile"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="avatarPersonalFile"
                          accept="image/*"
                          @change="onFilePickedPersonalFile"
                        />
                      </v-col>
                      <v-col cols="12" md="2" class="pb-0">
                        <img v-if="imageUrlPersonalFile" :src="imageUrlPersonalFile" height="50" />

                        <img
                          v-else-if="empDetailForm.personal_file"
                          :src="asset_url + '/' + empDetailForm.personal_file"
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

                   <v-col cols="12" md="6">
                    <v-checkbox v-model="empDetailForm.status" :label="$t('active')" color="info" value="1" hide-details>
                    </v-checkbox>
                   </v-col>
              


                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="#bd3635"
                      class="mr-5"
                      @click="$router.push('/employee-management/employee-detail')"
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
    empDetailForm: {
      emp_no: "",
      father_name: "",
      mother_name: "",
      spouse: "",
      tin: "",
      nid: "",
      education: "",
      training: "",
      experience: "",
      certificate: "",
      resume: "",
      personal_file: "",
      status: "1",
   
    },
    imageName: "",
    imageUrl: "",
    imageNameResume: "",
    imageUrlResume: "",
    imageNamePersonalFile: "",
    imageUrlPersonalFile: "",
    error: "",
    asset_url: process.env.VUE_APP_API_BASE_URL,
   
    isEdit: false,
    empDetail: {},
   
   
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
      this.empDetail = JSON.parse(localStorage.getItem("editData"));
      if (this.empDetail) {
        this.empDetailForm.emp_no = this.empDetail.emp_no;
        this.empDetailForm.father_name = this.empDetail.father_name;
        this.empDetailForm.mother_name = this.empDetail.mother_name;
        this.empDetailForm.spouse = this.empDetail.spouse;
        this.empDetailForm.tin = this.empDetail.tin;
        this.empDetailForm.nid = this.empDetail.nid;
        this.empDetailForm.education = this.empDetail.education;
        this.empDetailForm.training = this.empDetail.training;
        this.empDetailForm.experience = this.empDetail.experience;
        this.empDetailForm.certificate = this.empDetail.certificate;
        this.empDetailForm.resume = this.empDetail.resume;
        this.empDetailForm.personal_file = this.empDetail.personal_file;
        this.empDetailForm.status = this.empDetail.status == 1 ? "1" : "0";
      }
    },
    submitForm() {
      this.$v.empDetailForm.$touch();
      if (!this.$v.empDetailForm.$error) {
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
      Object.entries(this.empDetailForm).filter((item) => {
        formData.append(item[0], item[1]);
      });
      if (this.$refs.avatar.files[0]) {
        formData.append("certificate", this.$refs.avatar.files[0]);
      }
      if (this.$refs.avatarResume.files[0]) {
        formData.append("resume", this.$refs.avatar.files[0]);
      }
      if (this.$refs.avatarPersonalFile.files[0]) {
        formData.append("personal_file", this.$refs.avatar.files[0]);
      }
     
      ApiService.post("api/v1/empdetails", formData)
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
            this.$router.push("/employee-management/employee-detail");
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
      Object.entries(this.empDetailForm).filter((item) => {
        formData.append(item[0], item[1]);
      });

      if (this.$refs.avatar.files && this.$refs.avatar.files[0]) {
        formData.append("new_certificate", this.$refs.avatar.files[0]);
      }
      if (this.$refs.avatarResume.files && this.$refs.avatar.files[0]) {
        formData.append("new_resume", this.$refs.avatar.files[0]);
      }
      if (this.$refs.avatarPersonalFile.files && this.$refs.avatar.files[0]) {
        formData.append("new_personal_file", this.$refs.avatar.files[0]);
      }
    
      formData.append("_method", "PUT");
      axios
        .post("api/v1/empdetails/" + this.empDetail.id, formData)
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
            this.$router.push("/employee-management/employee-detail");
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

    pickFileResume() {
      this.$refs.avatarResume.click();
    },
    onFilePickedResume(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageNameResume = files[0].name;
        if (this.imageNameResume.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrlResume = fr.result;
        });
      } else {
        this.imageNameResume = "";
        this.imageUrlResume = "";
      }
    },

    pickFilePersonalFile() {
      this.$refs.avatarPersonalFile.click();
    },
    onFilePickedPersonalFile(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageNamePersonalFile = files[0].name;
        if (this.imageNamePersonalFile.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrlPersonalFile = fr.result;
        });
      } else {
        this.imageNamePersonalFile = "";
        this.imageUrlPersonalFile = "";
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
      empDetailForm: {
        emp_no: {
          required,
        },
        father_name: {
          required,
        },
        mother_name: {
          required,
        }
        
      },
    };
    if (!this.isEdit) {
     
    }
    return validations;
  },
};
</script>

<style scoped></style>
