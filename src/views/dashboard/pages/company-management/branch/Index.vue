<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
          <h4 class="ma-3">
              {{ $t("branch.list") }}
            </h4>
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
             <v-spacer></v-spacer>
             <v-btn class="mr-0"
                v-if="createp"
                  color="#1a5f30"
                  :title="$t('add_new')"
                  @click="$router.push('/company-management/branch/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
           
          </v-card-title>

          <v-card-text class="mt-2" v-if="listp">

            <v-data-table
              :headers="headers"
              :items="branches"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              width="300"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in branches" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td >{{ item.branch_name }}</td>
                  <td >{{ item.company.company_name }}</td>
                  <td >{{ item.email }}</td>
                  <td >{{ item.contact_no_1 }}</td>
                  <td >{{ item.contact_no_2 }}</td>
                  <td >{{ item.fax }}</td>
                  <td >{{ item.address }}</td>
                  <td>
                    <v-chip :color="item.status == 1 ? 'green' : 'pink' " text-color="white">{{
                      item.status == 1 ? "Active" : "Inactive"
                    }}</v-chip>
                  </td>
                  <td width="12%" class="text-center">
                    <v-btn
                      v-if="editp"
                      x-small
                      color="primary"
                      fab
                      :disabled="item.rolevalue"
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
import { mapState } from "vuex";
export default {
  name: "Index",
  mixins: [DataTableMixin, PermissionMixin],
  data: () => ({
    branches: [],
    page: 1,
   
  }),

  computed: {
  },

  mounted() {
    this.setHeaders();
  },

  methods: {
    setHeaders() {
      this.headers = [
        { text: this.$t("sl"), align: "center", sortable: false },
        {
          text: this.$t("branch.branch_name"),
          align: "left",
          sortable: true,
          value: "branch_name",
          width: "160px"
        },
        {
          text: this.$t("branch.company_name"),
          align: "left",
          sortable: true,
          value: "company_id",
          width: "160px"
        },
        {
          text: this.$t("branch.email"),
          align: "left",
          sortable: true,
          value: "email",
           width: "140px"
        },
        {
          text: this.$t("branch.contact_no_1"),
          align: "left",
          sortable: true,
          value: "contact_no_1",
           width: "160px"
        },
        {
          text: this.$t("branch.contact_no_2"),
          align: "left",
          sortable: true,
          value: "contact_no_2",
           width: "160px"
        },
        {
          text: this.$t("branch.fax"),
          align: "left",
          sortable: true,
          value: "fax",
           width: "140px"
        },
        {
          text: this.$t("branch.address"),
          align: "left",
          sortable: true,
          value: "address",
           width: "160px"
        },
        {
          text: this.$t("company.status"),
          align: "left",
          sortable: false,
          value: "status",
        },
        { text: this.$t("action"), align: "center", sortable: false, width: "115px" },
      ];
    },
    editData(item) {
      let encrypted_id = this.$CryptoJS.AES.encrypt(
        item.id.toString(),
        process.env.VUE_APP_CRYPTO_SECRET
      ).toString();
      encrypted_id = encrypted_id.replaceAll("/", "_-_");
      localStorage.setItem("editData", JSON.stringify(item));
      this.$router.push("/company-management/branch/edit/" + encrypted_id);
    },

    getListData() {
      this.getDataFromApi("api/v1/branch").then((data) => {
        if (typeof data.items !== "undefined") {
          this.branches = data.items;
        }
        this.totalItems = data.total;
      });
    },

    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/v1/branch/" + item.id);
        if (apiResponse.status == 200) {
          this.branches.splice(index, 1);
        }
        loader.hide();
      }
    },
  
  },
  watch: {
    params: {
      handler() {
        this.getDataFromApi("api/v1/branch").then((data) => {
          if (typeof data.items !== "undefined") {
            this.branches = data.items;
           
          }
          this.totalItems = data.total;
        });
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
