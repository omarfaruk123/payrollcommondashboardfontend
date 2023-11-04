<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-autocomplete
        :items="userTypeStatusList"
        item-text="name"
        item-value="id"
        outlined
        dense
        hide-details
        v-model="savingsForm.userTypeStatus"
      >
        <template #label>
          {{ $t("User Type Status") }}
          <span class="red--text"><strong>* </strong></span>
        </template>
      </v-autocomplete>
      <p v-if="$v.savingsForm.userTypeStatus" class="red--text">
        This field is required
      </p>
    </v-col>
    <v-col cols="12" md="6" v-if="verifysubmitDisable">
      <v-textarea
        class="purple-input"
        :label="$t('Feedback')"
        outlined
        dense
        v-model="feedback"
        rows="5"
        required
      >
      </v-textarea>
      <p v-if="userFeedbackError" class="red--text">This field is required</p>
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  name: "UserFeedbackInput",
  props: [
    "userTypeStatusList",
    "verifysubmitDisable",
    "userFeedbackError",
    "userTypeStatus",
    "savingsForm",
    "feedback",
  ],
  data: () => ({}),
  mounted() {},
  methods: {},
  validations() {
    const validations = {
      savingsForm: {
        user_type_status_id: {
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
