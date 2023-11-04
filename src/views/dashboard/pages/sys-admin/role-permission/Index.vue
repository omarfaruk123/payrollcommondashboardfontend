<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{ $t("rolePermission.rolePermission") }} {{ $t("list") }}
                </h4>
              </div>
              <div class="title-right" v-if="createp">
                <v-btn
                  color="#1a5f30"
                  :title="$t('add_new')"
                  @click="$router.push('role-permission/create')"
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
            <!-- <v-data-table
              :headers="headers"
              :items="roleGroups"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-4"
            > -->
            <template slot="body">
              <!-- <tr v-for="(item,index) in roleGroups" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td style="width: 300px">
                    <span v-for="(role,i) in item.roles" :key="i">
                      <v-btn
                        color="light"
                        small
                        rounded
                        class="mr-1"
                      >
                        {{ role.name }}
                      </v-btn>
                    </span>
                  </td>
                  <td>{{ item.status_name }}</td>
                  <td>{{ item.description }}</td>
                  <td>
                    <v-btn 
                      small
                      color="primary"
                      :title="$t('edit')"
                      @click="editData(item)"
                    >
                      {{ $t('edit') }}
                    </v-btn>
                    <v-btn 
                      small
                      color="red"
                      :title="$t('delete')"
                      @click="deleteData(item, index)"
                    >
                      {{ $t('delete') }}
                    </v-btn>
                  </td>
                </tr> -->
            </template>
            <!-- </v-data-table> -->
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
  mixins: [PermissionMixin, PermissionMixin],
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
        { text: this.$t("sl"), align: "left", sortable: false, value: "" },
        { text: this.$t("name"), align: "left", sortable: true, value: "name" },
        {
          text: this.$t("role.role"),
          align: "left",
          sortable: false,
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
        { text: this.$t("action"), sortable: false, value: "" },
      ];
    },
  },
};
</script>

<style scoped></style>
