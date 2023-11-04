<template>
  <div>
    <v-card outlined class="pt-0 mt-0">
      <v-card-title class="component-title">
        <div class="clearfix">
          <div class="title-left">
            <h4 class="title-text">
              {{ $t('module.module') }} {{ !isEdit ? $t('create') : $t('edit') }}
            </h4>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field class="purple-input" outlined dense hide-details v-model="moduleForm.name">
                  <template #label>
                    {{ $t('name') }} <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p v-if="$v.moduleForm.name.$error && !$v.moduleForm.name.required" class="red--text">This field is
                  required</p>
                <p v-if="$v.moduleForm.name.$error && !$v.moduleForm.name.minLength" class="red--text">
                  This field must have at least
                  {{ $v.moduleForm.name.$params.minLength.min }}
                  character
                </p>
                <p v-if="$v.moduleForm.name.$error && !$v.moduleForm.name.maxLength" class="red--text">
                  This field must not have
                  {{ $v.moduleForm.name.$params.maxLength.max }}
                  character
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="purple-input" outlined dense hide-details v-model="moduleForm.code"
                  @keyup="textUppercaseAndRemoveWhiteSpace($event)" @blur="textUppercaseAndRemoveWhiteSpace($event)">
                  <template #label>
                    {{ $t('code') }}{{ "/" }}{{ $t('short_name') }} <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
                <p v-if="$v.moduleForm.code.$error && !$v.moduleForm.code.required" class="red--text">This field is
                  required</p>
                <p v-if="$v.moduleForm.code.$error && !$v.moduleForm.code.minLength" class="red--text">
                  This field must have at least
                  {{ $v.moduleForm.code.$params.minLength.min }}
                  character
                </p>
                <p v-if="$v.moduleForm.code.$error && !$v.moduleForm.code.maxLength" class="red--text">
                  This field must not have
                  {{ $v.moduleForm.code.$params.maxLength.max }}
                  character
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="purple-input" :label="$t('description')" outlined dense hide-details
                  v-model="moduleForm.description" />
                <p v-if="$v.moduleForm.description.$error" class="red--text">This field is required</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-checkbox v-model="moduleForm.status" :label="$t('active')" color="info" :value="true" hide-details>
                </v-checkbox>
              </v-col>


              <v-col cols="12" class="text-right">
                <v-btn color="#1b6030" class="mr-0 hidden-lg-and-down" id="resetValidation"
                  @click="$v.moduleForm.$reset">
                  reset validation
                </v-btn>
                <v-btn v-if="isEdit" color="#bd3635" class="mr-3" @click="emptyForm">
                  {{ $t('cancel') }}
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
import { numeric, required, email, sameAs, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Create",
  data: () => ({
    moduleForm: {
      name: '',
      code: '',
      description: '',
      status: true
    },
    isEdit: false,
    editedItem: {}
  }),
  methods: {
    setEditData(item) {
      this.isEdit = true
      this.editedItem = item
      this.moduleForm.name = item.name;
      this.moduleForm.code = item.code;
      this.moduleForm.description = item.description;
      this.moduleForm.status = item.status == 1 ? true : false;
    },
    submitForm() {
      this.$v.moduleForm.$touch();
      if (!this.$v.moduleForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm()
        } else {
          this.saveCreateForm()
        }
      }
    },
    async saveCreateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.post('api/modules', this.moduleForm)
      if (apiResponse.status == 200) {
        this.$emit('updated');
        this.emptyForm()
      }
      loader.hide()
    },
    async saveUpdateForm() {
      let loader = this.$loading.show();
      const apiResponse = await ApiService.update('api/modules/' + this.editedItem.id, this.moduleForm)
      if (apiResponse.status == 200) {
        this.$emit('updated');
        this.emptyForm()
      }
      loader.hide()

    },
    emptyForm() {
      this.isEdit = false;
      this.editedItem = {};
      this.moduleForm = {
        name: '',
        code: '',
        description: '',
        status: true
      },
        document.getElementById("resetValidation").click();
    },

  },
  validations() {
    const validations = {
      moduleForm: {
        name: {
          required,
        },
        code: {
          required,
        },
        description: {},
        status: {}
      }
    };


    return validations;

  },
}
</script>

<style scoped>
</style>
