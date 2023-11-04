<template>
  <v-container id="designation-list" fluid tag="section">
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
              {{ $t("designation.list") }}
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
              :items="designations"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in designations" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>{{ item.designation_name }}</td>
                  <td>{{ item.status }}</td>
                 
                  <td class="text-center" width="13%">
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
    designations: [],
    page: 1,
    editedItem: {},
    headers: [],
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
          text: this.$t("designation.designation_name"),
          align: "left",
          sortable: true,
          value: "designation_name",
        },
        {
          text: this.$t("designation.status"),
          align: "left",
          sortable: false,
          value: "status",
        },
      
        { text: this.$t("designation.action"), align: "center", sortable: false },
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
      this.getDataFromApi("api/v1/designations").then((data) => {
    
        if (typeof data.items !== "undefined") {
          this.designations = data.items;
        }
        this.totalItems = data.total;
      });
    },
    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/v1/designations/" + item.id);
        if (apiResponse.status == 200) {
          this.designations.splice(index, 1);
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

<style scoped>
/* .searchbox{
  background-color:white;
  margin-top:-3px;
}
.v-card__title{
  background-color:#ddd;
  margin-top:0px!important;
}
.v-data-table >>> .v-data-table-header {
    background-color: #ddd; 
}

.v-data-table >>> th.sortable:hover  {
    font-size: 14px;
    font-weight: 700;
}

.v-data-table>>>th.sortable {
  font-size: 14px;
  font-weight: 700;
} */

/* .theme--light.v-data-table >>> .v-data-table__wrapper >>> table >>> thead >>> tr >>> th {
    color: #000;
}
::v-deep .v-data-table-header {
  background-color: #DCDCDC;
  
} */
/* .v-data-table > .v-data-table__wrapper > table > thead > tr > th.sortable:active {
    color: #000;
}
.theme--light.v-data-table >>> .v-data-table__wrapper >>> table >>> thead >>> tr >>> th {
    color: #000;
} */
</style>
