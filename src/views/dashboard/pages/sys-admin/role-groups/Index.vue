<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{ $t("roleGroup.roleGroup") }} {{ $t("list") }}
                </h4>
              </div>
              <div class="title-right" v-if="createp">
                <v-btn
                  color="#1a5f30"
                  :title="$t('add_new')"
                  @click="$router.push('role-group/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-text>
            <v-row class="ma-2" v-if="listp">
              <v-col cols="8" class="text-right"> </v-col>
              <v-col cols="4" class="text-right pr-0">
                <v-text-field
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  v-model="search"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="roleGroups"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in roleGroups" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td style="width: 300px">
                    <span v-for="(role, i) in item.roles" :key="i">
                      <v-btn color="light" small rounded class="mr-1">
                        {{ role.name }}
                      </v-btn>
                    </span>
                  </td>
                  <td>{{ item.status_name }}</td>
                  <td>{{ item.description }}</td>
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
// import Create from "./Create";

export default {
  name: "Index",
  // components: {Create},
  mixins: [DataTableMixin, PermissionMixin],
  data: () => ({
    roleGroups: [],
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
        { text: this.$t("name"), align: "left", sortable: true, value: "name" },
        {
          text: this.$t("role.role"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("status"),
          align: "left",
          sortable: true,
          value: "status",
        },
        {
          text: this.$t("description"),
          align: "left",
          sortable: true,
          value: "description",
        },
        { text: this.$t("action"), align: "center", sortable: false },
      ];
    },
    editData(item) {
      let encrypted_id = this.$CryptoJS.AES.encrypt(
        item.id.toString(),
        process.env.VUE_APP_CRYPTO_SECRET
      ).toString();
      encrypted_id = encrypted_id.replaceAll("/", "_-_");
      localStorage.setItem("editData", JSON.stringify(item));
      this.$router.push("/system-admin/role-group/edit/" + encrypted_id);
    },
    updated() {
      this.getListData();
    },
    getListData() {
      this.getDataFromApi("api/role-groups").then((data) => {
        if (typeof data.items !== "undefined") {
          this.roleGroups = data.items;
        }
        this.totalItems = data.total;
      });
    },
    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete(
          "api/role-groups/" + item.id
        );
        if (apiResponse.status == 200) {
          this.roleGroups.splice(index, 1);
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
