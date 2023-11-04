<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <Create
          v-if="createp"
          v-on:updated="getListData"
          ref="createForm"
        ></Create>

        <v-card outlined class="mt-2" v-if="listp">
          <v-card-title class="component-title">
            <h4 class="ma-3">{{ $t("url.url") }} {{ $t("list") }}</h4>
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
              :items="urls"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in urls" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>
                    {{
                      item.parenturl.module ? item.parenturl.module.name : ""
                    }}
                  </td>
                  <td>{{ item.fr_url_method }}</td>
                  <td>
                    {{ item.parenturl.back_slash }}{{ item.parenturl.url_name }}
                  </td>
                  <td>{{ item.base_name }}</td>
                  <td>{{ item.status_name }}</td>
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
    urls: [],
    page: 1,
  }),

  computed: {},
  mounted() {
    this.setHeaders();
  },
  methods: {
    setHeaders() {
      this.headers = [
        { text: this.$t("sl"), align: "center", sortable: false },
        {
          text: this.$t("module.module"),
          align: "left",
          sortable: true,
          value: "module_name",
        },
        {
          text: this.$t("url.fr_url_method"),
          align: "left",
          sortable: true,
          value: "fr_url_method",
        },
        {
          text: this.$t("url.fr_url"),
          align: "left",
          sortable: true,
          value: "parent_url_id",
        },
        {
          text: this.$t("url.base_name"),
          align: "left",
          sortable: true,
          value: "base_name",
        },
        {
          text: this.$t("status"),
          align: "left",
          sortable: true,
          value: "status",
        },
        { text: this.$t("action"), align: "center", sortable: false },
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
      this.getDataFromApi("api/url").then((data) => {
        if (typeof data.items !== "undefined") {
          console.log(data.items);
          this.urls = data.items;
        }
        this.totalItems = data.total;
      });
    },
    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/url/" + item.id);
        if (apiResponse.status == 200) {
          this.urls.splice(index, 1);
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
