<template>
  <v-card outlined class="pt-0 mt-0">
    <v-card-title class="component-title">
      <div class="clearfix">
        <div class="title-left">
          <h4 class="title-text">
            {{
              !isEdit
                ? $t("createDistrict.districtCreate")
                : $t("districtList.district") + " Edit"
            }}
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
                :items="divisionList"
                item-text="name"
                item-value="id"
                :filter="customFilter"
                outlined
                dense
                hide-details
                v-model="districtForm.division_id"
              >
                <template #label>
                  {{ $t("createDistrict.division") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
              <p v-if="$v.districtForm.division_id.$error" class="red--text">
                This field is required
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="purple-input"
                outlined
                dense
                hide-details
                v-model="districtForm.name"
              >
                <template #label>
                  {{ $t("createDistrict.name") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
              <p v-if="$v.districtForm.name.$error" class="red--text">
                This field is required
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="purple-input"
                outlined
                dense
                hide-details
                v-model="districtForm.bn_name"
              >
                <template #label>
                  {{ $t("createDistrict.bn_name") }}
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
              <p v-if="$v.districtForm.bn_name.$error" class="red--text">
                This field is required
              </p>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                {{ isEdit ? $t("update") : $t("save") }}
              </v-btn>
              <v-btn
                color="#1b6030"
                class="mr-0 hidden-lg-and-down"
                id="resetValidation"
                @click="$v.districtForm.$reset"
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
    districtForm: {
      name: "",
      bn_name: "",
      division_id: "",
    },
    isEdit: false,
    editedItem: {},
    divisionList: [],
  }),
  mounted() {
    this.getDivisionList();
  },
  methods: {
    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.districtForm.name = item.name;
      this.districtForm.bn_name = item.bn_name;
      this.districtForm.division_id = item.division_id;
    },
    submitForm() {
      this.$v.districtForm.$touch();
      if (!this.$v.districtForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    getDivisionList() {
      var queryData = {
        table_name: "divisions",
        field_name: ["id", "name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.divisionList = res.data;
        })
        .catch((error) => console.log(error));
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    saveCreateForm() {
      ApiService.post("api/district", this.districtForm)
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
      ApiService.update("api/district/" + this.editedItem.id, this.districtForm)
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
      this.districtForm = {
        name: "",
        bn_name: "",
        division_id: "",
      };
      document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      districtForm: {
        name: {
          required,
        },
        bn_name: {
          required,
        },
        division_id: {
          required,
        },
      },
    };
    if (!this.isEdit) {
    }

    return validations;
  },
};
</script>

<style scoped>
</style>
