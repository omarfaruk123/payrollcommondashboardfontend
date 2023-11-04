<template>
  <div>
    <v-card outlined class="pt-0 mt-0">
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{ $t("url.url") }} {{ !isEdit ? $t("create") : $t("edit") }}
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
                  :items="moduleList"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.module_id"
                >
                  <template #label>
                    {{ $t("module.module") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
                <p v-if="$v.urlForm.module_id.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="action_list"
                  item-text="key"
                  item-value="value"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.action"
                >
                  <template #label>
                    {{ $t("action") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
                <p v-if="$v.urlForm.action.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="fr_url_method_list"
                  item-text="key"
                  item-value="value"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.fr_url_method"
                >
                  <template #label>
                    {{ $t("url.http_method") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
                <p v-if="$v.urlForm.fr_url_method.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.fr_url"
                >
                  <template #label>
                    {{ $t("url.fr_url") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p v-if="$v.urlForm.fr_url.$error" class="red--text">
                  This field is required
                </p>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.base_name"
                >
                  <template #label>
                    {{ $t("Base Name") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p v-if="$v.urlForm.base_name.$error" class="red--text">
                  This field is required
                </p>
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  class="purple-input"
                  :label="`${$t('url.backend_url')} `"
                  outlined
                  dense
                  hide-details
                  v-model="urlForm.backend_url"
                  rows="1"
                />
                <p v-if="$v.urlForm.backend_url.$error" class="red--text">
                  This field is required
                </p>
              </v-col>

              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="urlForm.status"
                  :label="$t('active')"
                  color="info"
                  :value="true"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  color="#1b6030"
                  class="mr-0 hidden-lg-and-down"
                  id="resetValidation"
                  @click="$v.urlForm.$reset"
                >
                  reset validation
                </v-btn>
                <v-btn
                  v-if="isEdit"
                  color="#bd3635"
                  class="mr-3"
                  @click="emptyForm"
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
  </div>
</template>

<script>
import {
  numeric,
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Create",
  data: () => ({
    urlForm: {
      base_name: "",
      fr_url_method: "",
      fr_url: "",
      backend_url: "",
      action: "",
      module_id: "",
      status: true,
    },
    fr_url_method_list: [
      { value: "get", key: "GET" },
      { value: "post", key: "POST" },
      { value: "put", key: "PUT" },
      { value: "delete", key: "DELETE" },
    ],
    action_list: [
      { value: "list", key: "LIST" },
      { value: "create", key: "CREATE" },
      //{ value: "store", key: "STORE" },
      { value: "edit", key: "EDIT" },
      //{ value: "update", key: "UPDATE" },
      { value: "view", key: "VIEW" },
      { value: "delete", key: "DELETE" },
      //{ value: "changepassword", key: "Change Password" },
      //{ value: "resetpassword", key: "Reset Password" },
    ],
    isEdit: false,
    editedItem: {},
    moduleList: [],
  }),

  mounted() {
    this.getModuleList();
  },
  methods: {
    getModuleList() {
      ApiService.get("api/module-list").then((res) => {
        this.moduleList = res.data.data.data;
      });
    },

    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.urlForm.base_name = item.base_name;
      this.urlForm.fr_url_method = item.fr_url_method;
      this.urlForm.fr_url = item.parenturl.url_name;
      this.urlForm.backend_url = item.backend_url;
      this.urlForm.action = item.action;
      this.urlForm.module_id = item.parenturl.module_id;
      this.urlForm.status = item.status == 1 ? true : false;
    },
    submitForm() {
      this.$v.urlForm.$touch();
      if (!this.$v.urlForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    async saveCreateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post("api/url", this.urlForm);
      if (apiResponse.status == 200) {
        this.$emit("updated");
        this.emptyForm();
      }
      loader.hide();
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.update(
        "api/url/" + this.editedItem.id,
        this.urlForm
      );
      if (apiResponse.status == 200) {
        this.$emit("updated");
        this.emptyForm();
      }
      loader.hide();
    },
    emptyForm() {
      this.isEdit = false;
      this.editedItem = {};
      (this.urlForm = {
        base_name: "",
        fr_url_method: "",
        fr_url: "",
        backend_url: "",
        action: "",
        module_id: "",
        status: true,
      }),
        document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      urlForm: {
        base_name: {
          required,
        },
        fr_url_method: {
          required,
        },
        fr_url: {
          required,
        },
        backend_url: {},
        action: {
          required,
        },
        module_id: {
          required,
          numeric,
        },
        status: {},
      },
    };

    return validations;
  },
};
</script>

<style scoped></style>
