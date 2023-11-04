<template>
  <div>
    <v-card outlined class="pt-0 mt-0">
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{ $t("menu.menu") }} {{ !isEdit ? $t("create") : $t("edit") }}
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
                  v-model="menuForm.module_id"
                >
                  <template #label>
                    {{ $t("module.module") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
                <p v-if="$v.menuForm.module_id.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="types"
                  item-text="key"
                  item-value="value"
                  outlined
                  dense
                  hide-details
                  v-model="menuForm.type"
                >
                  <template #label>
                    {{ $t("menu.type") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
                <p v-if="$v.menuForm.type.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6" v-if="menuForm.type == 'menu_item'">
                <v-autocomplete
                  :items="urlList"
                  item-text="base_name"
                  item-value="id"
                  :label="$t('url.url')"
                  outlined
                  dense
                  hide-details
                  v-model="menuForm.url_id"
                ></v-autocomplete>
                <p v-if="$v.menuForm.module_id.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="parentMenus"
                  item-text="name"
                  item-value="id"
                  :label="$t('menu.parent')"
                  outlined
                  dense
                  hide-details
                  v-model="menuForm.parent_id"
                ></v-autocomplete>
                <p v-if="$v.menuForm.parent_id.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  outlined
                  dense
                  hide-details
                  v-model="menuForm.name"
                >
                  <template #label>
                    {{ $t("name") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p
                  v-if="$v.menuForm.name.$error && !$v.menuForm.name.required"
                  class="red--text"
                >
                  This field is required
                </p>
                <p
                  v-if="$v.menuForm.name.$error && !$v.menuForm.name.minLength"
                  class="red--text"
                >
                  This field must have at least
                  {{ $v.menuForm.name.$params.minLength.min }}
                  character
                </p>
                <p
                  v-if="$v.menuForm.name.$error && !$v.menuForm.name.maxLength"
                  class="red--text"
                >
                  This field must not have
                  {{ $v.menuForm.name.$params.maxLength.max }}
                  character
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  outlined
                  dense
                  hide-details
                  v-model="menuForm.css_class"
                >
                  <template #label>
                    {{ $t("menu.css_class") }}
                    <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p v-if="$v.menuForm.css_class.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="menuForm.status"
                  :label="$t('active')"
                  color="info"
                  :value="true"
                  hide-details
                >
                </v-checkbox>
                <template v-slot:label>
                  <label>{{ $t("status") }}</label>
                </template>
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  color="#bd3635"
                  class="mr-0 hidden-lg-and-down"
                  id="resetValidation"
                  @click="$v.menuForm.$reset"
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
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";

export default {
  name: "Create",
  data: () => ({
    menuForm: {
      module_id: "",
      type: "",
      name: "",
      url_id: "",
      css_class: "",
      parent_id: "",
      status: true,
    },
    types: [
      { value: "menu", key: "MENU" },
      { value: "menu_item", key: "MENU Item" },
    ],
    urlList: [],
    moduleList: [],
    parentMenus: [],
    isEdit: false,
    editedItem: {},
  }),
  mounted() {
    this.getModuleList();
    this.getUrlList();
    this.getParentList();
  },
  methods: {
    getUrlList() {
      ApiService.get("api/url-list").then((res) => {
        this.urlList = res.data.data;
      });
    },
    getModuleList() {
      ApiService.get("api/module-list").then((res) => {
         //console.log(res.data.data.data);
        this.moduleList = res.data.data.data;
      });
    },
    getParentList() {
      ApiService.get("api/parent-menus").then((res) => {
     
        this.parentMenus = res.data.data;
      });
    },

    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.menuForm.module_id = item.module_id;
      this.menuForm.type = item.type;
      this.menuForm.name = item.name;
      this.menuForm.url_id = item.url_id;
      this.menuForm.css_class = item.css_class;
      this.menuForm.parent_id = item.parent_id;
      this.menuForm.status = item.status == 1 ? true : false;
    },
    submitForm() {
      this.$v.menuForm.$touch();
      if (!this.$v.menuForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    async saveCreateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post("api/menus", this.menuForm);
      if (apiResponse.status == 200) {
        this.$emit("updated");
        this.emptyForm();
      }
      loader.hide();
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.update(
        "api/menus/" + this.editedItem.id,
        this.menuForm
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
      (this.menuForm = {
        module_id: "",
        type: "",
        name: "",
        url_id: "",
        css_class: "",
        parent_id: "",
        status: true,
      }),
        document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      menuForm: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(35),
        },
        type: {
          required,
        },

        url_id: {},
        parent_id: {},
        module_id: {
          required,
          numeric,
        },
        css_class: {
          required,
        },
        description: {},
        status: {},
      },
    };

    if (this.menuForm.type == "menu_item") {
      validations.menuForm.parent_id = {
        required,
        numeric,
      };
      validations.menuForm.url_id = {
        required,
        numeric,
      };
    }

    return validations;
  },
};
</script>

<style scoped></style>
