<template>
  <v-container id="division-list" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <Create
          v-if="createp"
          v-on:updated="getListData"
          ref="createForm"
        ></Create>

        <v-card outlined class="mt-2" v-if="listp">
          <v-card-title class="component-title">
            <h4 class="ma-3">
              {{ $t("divisionList.listDivision") }}
            </h4>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              style="width: 5%"
              single-line
              hide-details
              v-model="search"
              outlined
              dense
              class="searchbox"
            ></v-text-field>
          </v-card-title>
          <v-card-text class="mt-2">
            <v-data-table
              :headers="headers"
              :items="divisions"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in divisions" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.bn_name }}</td>
                  <td class="text-center" width="12%">
                    <v-btn
                      v-if="editp"
                      x-small
                      fab
                      color="primary"
                      @click="editData(item)"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="deletep"
                      x-small
                      fab
                      color="red"
                      @click="deleteData(item, index)"
                    >
                      <v-icon dark> mdi-delete </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Create from "./Create";

export default {
  name: "Index",
  components: { Create },
  mixins: [DataTableMixin, PermissionMixin],
  data: () => ({
    divisions: [],
    page: 1,
    editedItem: {},
  }),

  computed: {},
  mounted() {
    this.setHeaders();
  },

  methods: {
    setHeaders() {
      this.headers = [
        { text: this.$t("sl"), align: "center", sortable: false, value: "" },
        {
          text: this.$t("divisionList.name"),
          align: "left",
          sortable: true,
          value: "name",
        },
        {
          text: this.$t("divisionList.bn_name"),
          align: "left",
          sortable: true,
          value: "bn_name",
        },
        {
          text: this.$t("action"),
          align: "center",
          sortable: false,
          value: "",
        },
      ];
    },
    editData(item) {
      this.editedItem = item;
      this.$refs.createForm.setEditData(item);
      this.scrollToTopPage();
    },
    updated() {
      this.getListData();
    },
    getListData() {
      this.getDataFromApi("api/division").then((data) => {
        if (typeof data.items !== "undefined") {
          this.divisions = data.items;
        }
        this.totalItems = data.total;
      });
    },
    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/division/" + item.id);
        if (apiResponse.status == 200) {
          this.divisions.splice(index, 1);
        }
        loader.hide();
      }
    },
  },

  watch: {
    params: {
      handler() {
        this.getListData();
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
