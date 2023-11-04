<template>
  <v-card outlined class="pt-0 mt-0">
    <v-card-title class="component-title">
      <div class="clearfix">
        <div class="title-left">
          <h4 class="title-text">
            {{ !isEdit ? $t("department.departmentCreate") : $t("department.departmentEdit") }}
          </h4>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form>
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="unitList"
                item-text="unit_name"
                item-value="id"
                :filter="customFilter"
                outlined
                dense
                hide-details
                v-model="departmentForm.unit_id"
              >
                <template #label>
                  {{ $t("department.unit") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
              <p v-if="$v.departmentForm.unit_id.$error" class="red--text">
                This field is required
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="purple-input"
                outlined
                dense
                hide-details
                v-model="departmentForm.department_name"
              >
                <template #label>
                  {{ $t("department.department_name") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
              <p v-if="$v.departmentForm.department_name.$error" class="red--text">
                This field is required
              </p>
            </v-col>

           <v-col cols="12" md="6">
                <v-checkbox v-model="departmentForm.status" :label="$t('active')" color="info" value="1" hide-details>
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
                @click="$v.departmentForm.$reset"
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
    departmentForm: {
      department_name: "",
      status: "1",
      unit_id: "",
    },
    isEdit: false,
    editedItem: {},
    unitList: [],
  }),
  mounted() {
    this.getUnitList();
  },
  methods: {
    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.departmentForm.department_name = item.department_name;
      this.departmentForm.unit_id = item.unit_id;
      this.departmentForm.status = item.status == 1 ? "1" : "0";
      
    },
     getUnitList() {
      var queryData = {
        table_name: "units",
        field_name: ["id", "unit_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.unitList = res.data;
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
    submitForm() {
    
      this.$v.departmentForm.$touch();
      if (!this.$v.departmentForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    saveCreateForm() {
 
      ApiService.post("api/v1/departments", this.departmentForm)
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
      this.departmentForm.id = this.editedItem.id;
      ApiService.update("api/v1/departments/" + this.editedItem.id, this.departmentForm)
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
      this.departmentForm = {
        department_name: "",
        status: "1",
        unit_id:"",
       
      };
      document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      departmentForm: {
        department_name: {
          required,
        },
        unit_id: {
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
