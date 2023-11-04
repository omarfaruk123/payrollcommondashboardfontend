<template>
  <v-layout>
    <v-btn x-small rounded color="error" @click="dialog = true">
      {{ status }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="component-title">
          <div class="clearfix">
            <div class="title-center">
              <h4 class="title-text">All Feedback List</h4>
            </div>
          </div>
        </v-card-title>

        <v-card-text>
          <v-data-table :headers="headers" :items="items" class="elevation-4">
            <template slot="body">
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.user.name }}</td>
                <td>{{ item.feedback }}</td>
                <td>{{ format_date(item.created_at) }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" x-small @click="dialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import moment from "moment";
export default {
  name: "FeedbackModal",
  props: ["items", "status"],
  data: () => ({
    dialog: false,
    headers: [],
  }),
  mounted() {
    this.setHeaders();
  },
  methods: {
    setHeaders() {
      this.headers = [
        { text: this.$t("sl"), align: "left", sortable: false, value: "" },
        {
          text: this.$t("User Name"),
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: this.$t("Feedback"),
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: this.$t("Created Date"),
          align: "left",
          sortable: false,
          value: "",
        },
      ];
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD h:mm:ss a");
      }
    },
  },
};
</script>
