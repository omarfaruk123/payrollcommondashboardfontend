<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">
                  {{ $t("userList.userList") }}
                </h4>
              </div>
              <div class="title-right" v-if="createp">
                <v-btn
                  color="#1a5f30"
                  :title="$t('add_new')"
                  @click="$router.push('/system-admin/users/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-text class="mt-2" v-if="listp">
            <v-row class="ma-2">
              <v-col cols="4" class="text-right">
                <v-radio-group v-model="checkboxStatus" row class="mt-0">
                  <v-radio
                    label="Active"
                    color="success"
                    value="1"
                    checked="active"
                    hide-details
                    @click="getListData('success')"
                  ></v-radio>
                  <v-radio
                    label="Inactive"
                    color="info"
                    value="0"
                    @click="getListData('info')"
                  ></v-radio>
                  <v-radio
                    label="All"
                    color="secondary"
                    value="all"
                    @click="getListData('secondary')"
                  ></v-radio>
                 
                </v-radio-group>
              </v-col>
              <v-col cols="8" class="text-right pr-0">
                
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="users"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              width="300"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in users" :key="index">
                  <td width="6%" class="text-center">{{ index + 1 }}</td>
                  <td width="10%">{{ item.user_id }}</td>
                  <td width="10%">{{ item.name }}</td>
                  <td width="10%">{{ item.email }}</td>
                  <td style="width: 125px">
                    {{ item.role_group ? item.role_group.name : "" }}
                  </td>
                  <td
                    v-if="item.role_group"
                    style="width: 150px"
                    class="text-center"
                  >
                    <span
                      v-for="(role, ind) in item.role_group.roles"
                      :key="ind"
                    >
                      <v-chip>{{ role.name }}</v-chip>
                    </span>
                  </td>
                  <td v-else></td>
                  <td width="15%" class="text-center">{{ item.phone }}</td>
                  <td>
                    {{ item.po_details ? item.po_details.po_name_en : "PKSF" }}
                  </td>
                  <td>
                    <v-img
                      style="
                        border-radius: 50%;
                        margin: 10px 0px;
                        height: 50px;
                        width: 50px;
                      "
                      cover
                      :src="
                        item.image
                          ? asset_url + '/' + item.image
                          : asset_url + '/' + 'user/userpic.png'
                      "
                    >
                    </v-img>
                  </td>
                  <td>
                    <v-chip :color="checkBoxColor" text-color="white">{{
                      item.status
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
    users: [],
    page: 1,
    checkboxStatus: "1",
    checkBoxColor: "success",
    userSearchForm: {},
    asset_url: process.env.VUE_APP_API_BASE_URL,
  }),

  computed: {
  },

  mounted() {
    this.setHeaders();
    let user_po_details = JSON.parse(localStorage.getItem("user"));
  },

  methods: {
    setHeaders() {
      this.headers = [
        { text: this.$t("sl"), align: "center", sortable: false },
        {
          text: this.$t("userList.userId"),
          align: "left",
          sortable: true,
          value: "user_id",
        },
        {
          text: this.$t("userList.name"),
          align: "left",
          sortable: true,
          value: "name",
        },
        {
          text: this.$t("userList.email"),
          align: "left",
          sortable: true,
          value: "email",
        },
        {
          text: this.$t("Role Group"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("Role List"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("userList.phone"),
          align: "left",
          sortable: true,
          value: "phone",
        },
        {
          text: this.$t("userList.poName"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("userList.photo"),
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: this.$t("userList.status"),
          align: "left",
          sortable: true,
          value: "",
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
      this.$router.push("/users/edit/" + encrypted_id);
    },

    getListData(color) {
    
      this.checkBoxColor = color;
      this.userSearchForm.status = this.checkboxStatus;
      this.getDataFromApi("api/users", this.userSearchForm).then((data) => {
        if (typeof data.items !== "undefined") {
          this.users = data.items;
          data.items.map((roleitem, index) => {
            this.users[index].rolevalue = roleitem?.role_group?.roles.some(
              (item) => {
                return item.name == "Admin" || item.name == "SuperAdmin";
              }
            );
          });
        }
        this.totalItems = data.total;
      });
    },
  
  },
  watch: {
    params: {
      handler() {
        this.userSearchForm.status = this.checkboxStatus;
        this.getDataFromApi("api/users", this.userSearchForm).then((data) => {
          if (typeof data.items !== "undefined") {
            this.users = data.items;
            data.items.map((roleitem, index) => {
              this.users[index].rolevalue = roleitem?.role_group?.roles.some(
                (item) => {
                  return item.name == "Admin" || item.name == "SuperAdmin";
                }
              );
            });
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
