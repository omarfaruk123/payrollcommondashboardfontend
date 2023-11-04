<template>
  <v-card outlined class="pt-0 mt-0">
    <v-card-title class="component-title">
      <div class="clearfix">
        <div class="title-left">
          <h4 class="title-text">
            {{ !isEdit ? $t("designation.designationCreate") : $t("designation.designationEdit") }}
          </h4>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form>
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                class="purple-input"
                outlined
                dense
                hide-details
                v-model="designationForm.designation_name"
              >
                <template #label>
                  {{ $t("designation.designation_name") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
              <p v-if="$v.designationForm.designation_name.$error" class="red--text">
                This field is required
              </p>
            </v-col>

           <v-col cols="12" md="6">
                <v-checkbox v-model="designationForm.status" :label="$t('active')" color="info" value="1" hide-details>
                </v-checkbox>
              </v-col>
            

            <v-col cols="12" class="text-right">
              <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                {{ isEdit ? $t("update") : $t("save") }}
              </v-btn>
              <v-btn
                color="success"
                class="mr-0 hidden-lg-and-down"
                id="resetValidation"
                @click="$v.designationForm.$reset"
              >
                reset validation
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import ApiService from "@/services/ApiService";

export default {
  name: "Create",
  mixins: [validationMixin],
  data: () => ({
    designationForm: {
      designation_name: "",
      status: "1",
    },
    isEdit: false,
    editedItem: {},
  }),
  mounted() {},
  methods: {
    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.designationForm.designation_name = item.designation_name;
      this.designationForm.status = item.status == 1 ? "1" : "0";
      
    },
    submitForm() {
      this.$v.designationForm.$touch();
      if (!this.$v.designationForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    saveCreateForm() {
    
      ApiService.post("api/v1/designations", this.designationForm)
        .then((res) => {
          this.submitFormResponse(res);
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        });
    },
    saveUpdateForm() {
      let loader = this.$loading.show();
      this.designationForm.id = this.editedItem.id;
      ApiService.update("api/v1/designations/" + this.editedItem.id, this.designationForm)
        .then((res) => {
          loader.hide();
          this.isEdit = false;
          this.submitFormResponse(res);
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        });
    },
    submitFormResponse(res) {
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
        this.$emit("updated");
        this.emptyForm();
      }
    },
    emptyForm() {
      this.isEdit = false;
      this.editedItem = {};
      this.designationForm = {
        designation_name: "",
        status: "1"
       
      };
      document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      designationForm: {
        designation_name: {
          required,
        },
         status: {}
      },
    };
    if (!this.isEdit) {
    }

    return validations;
  },
};
</script>
