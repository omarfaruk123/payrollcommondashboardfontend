<template>
  <div>
    <v-card outlined class="pt-0 mt-0">
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{ $t("role.role") }} {{ !isEdit ? $t("create") : $t("edit") }}
            </h4>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="6" v-if="!isEdit">
                <v-text-field
                  class="purple-input"
                  :label="$t('code')"
                  outlined
                  dense
                  hide-details
                  v-model="RoleForm.code"
                  @keyup="textUppercaseAndRemoveWhiteSpace($event)"
                  @blur="textUppercaseAndRemoveWhiteSpace($event)"
                />
                <p
                  v-if="$v.RoleForm.code.$error && !$v.RoleForm.code.required"
                  class="red--text"
                >
                  This field is required
                </p>
                <p
                  v-if="$v.RoleForm.code.$error && !$v.RoleForm.code.minLength"
                  class="red--text"
                >
                  This field must have at least
                  {{ $v.RoleForm.code.$params.minLength.min }}
                  character
                </p>
                <p
                  v-if="$v.RoleForm.code.$error && !$v.RoleForm.code.maxLength"
                  class="red--text"
                >
                  This field must not have
                  {{ $v.RoleForm.code.$params.maxLength.max }}
                  character
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  :label="$t('name')"
                  outlined
                  dense
                  hide-details
                  v-model="RoleForm.name"
                />
                <p
                  v-if="$v.RoleForm.name.$error && !$v.RoleForm.name.required"
                  class="red--text"
                >
                  This field is required
                </p>
                <p
                  v-if="$v.RoleForm.name.$error && !$v.RoleForm.name.minLength"
                  class="red--text"
                >
                  This field must have at least
                  {{ $v.RoleForm.name.$params.minLength.min }}
                  character
                </p>
                <p
                  v-if="$v.RoleForm.name.$error && !$v.RoleForm.name.maxLength"
                  class="red--text"
                >
                  This field must not have
                  {{ $v.RoleForm.name.$params.maxLength.max }}
                  character
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="purple-input"
                  :label="$t('description')"
                  outlined
                  dense
                  hide-details
                  v-model="RoleForm.description"
                />
                <p v-if="$v.RoleForm.description.$error" class="red--text">
                  This field is required
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="RoleForm.status"
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
                  color="#1b6030"
                  class="mr-0 hidden-lg-and-down"
                  id="resetValidation"
                  @click="$v.RoleForm.$reset"
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Create",
  data: () => ({
    RoleForm: {
      name: "",
      code: "",
      description: "",
      status: true,
    },
    isEdit: false,
    editedItem: {},
  }),
  methods: {
    setEditData(item) {
      this.isEdit = true;
      this.editedItem = item;
      this.RoleForm.name = item.name;
      this.RoleForm.code = item.code;
      this.RoleForm.description = item.description;
      this.RoleForm.status = item.status == 1 ? true : false;
    },
    submitForm() {
      this.$v.RoleForm.$touch();
      if (!this.$v.RoleForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    async saveCreateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post("api/roles", this.RoleForm);
      if (apiResponse.status == 200) {
        this.$emit("updated");
        this.emptyForm();
      }
      loader.hide();
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      this.RoleForm.id = this.editedItem.id;
      const apiResponse = await ApiService.update(
        "api/roles/" + this.editedItem.id,
        this.RoleForm
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
      (this.RoleForm = {
        name: "",
        code: "",
        description: "",
        status: "active",
      }),
        document.getElementById("resetValidation").click();
    },
  },
  validations() {
    const validations = {
      RoleForm: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(35),
        },
        code: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(15),
        },
        description: {},
        status: {},
      },
    };

    return validations;
  },
};
</script>

<style scoped></style>
