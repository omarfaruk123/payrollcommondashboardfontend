<template>
  <div>
    <v-autocomplete
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      outlined
      hide-details
      dense
      v-model="model"
      :name="name"
      :filled="filled"
      :disabled="disabled"
      @change="onChange"
    >
      <template #label>
        {{ label }}
        <span class="red--text" v-if="required"><strong>* </strong></span>
      </template>
    </v-autocomplete>
    <p v-if="error_msg" class="red--text">
      {{ error_msg }}
    </p>
  </div>
</template>
<script>
export default {
  name: "InputDropdown",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    itemText: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
    },
    error_msg: {
      type: String,
      required: false,
    },
    filled: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    model: {
      get() {
        // console.log({ get: this.value });
        // more details : https://dev.to/viniciuskneves/vue-custom-input-bk8
        return this.value;
      },
      set(value) {
        // console.log({ set: value });
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onChange(e) {
      this.$emit("change", this.value, e);
    },
  },
};
</script>