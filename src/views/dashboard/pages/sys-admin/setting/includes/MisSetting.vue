<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <div class="mb-3">
          <v-autocomplete
            :items="optionList"
            item-text="value"
            item-value="key"
            outlined
            dense
            hide-details
            v-model="settings.mis_auto_edit_option"
          >
            <template #label>
              Mis Auto Edit Enable Option
              <span class="red--text"><strong> * </strong></span>
            </template>
          </v-autocomplete>
          <p v-if="$v.settings.mis_auto_edit_option.$error" class="red--text">
            This field is required
          </p>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          class="purple-input"
          type="number"
          label="Auto Disable After Days"
          outlined
          dense
          hide-details
          :min="0"
          :max="30"
          v-model="settings.mis_auto_disable_days"
        >
          <template #label>
            Auto Disable After Days
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-text-field>
        <p v-if="$v.settings.mis_auto_disable_days.$error" class="red--text">
          This field is required
        </p>
      </v-col>

      <v-col cols="12" class="text-right">
        <v-btn color="#1b6030" class="mr-0" @click="updateProcess()">
          {{ $t("update") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "MisSetting",
  props: ["settings"],
  mixins: [validationMixin],
  data: () => ({
    optionList: [
      { id: 1, key: "current_month", value: "Current Month" },
      { id: 2, key: "next_month", value: "Next Month" },
    ],
  }),
  mounted() {},
  methods: {
    updateProcess() {
      this.$v.settings.$touch();
      if (!this.$v.settings.$error) {
        this.$emit("updateSetting");
      }
    },
  },
  validations() {
    const validations = {
      settings: {
        mis_auto_edit_option: {
          required,
        },
        mis_auto_disable_days: {
          required,
          numeric,
        },
      },
    };

    return validations;
  },
};
</script>
