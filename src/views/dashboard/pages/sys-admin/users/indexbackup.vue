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
                    value="active"
                    hide-details
                    @click="getListData('success')"
                  ></v-radio>
                  <v-radio
                    label="Inactive"
                    color="info"
                    value="inactive"
                    @click="getListData('info')"
                  ></v-radio>
                  <v-radio
                    label="All"
                    color="secondary"
                    value="all"
                    @click="getListData('secondary')"
                  ></v-radio>
                  <v-checkbox
                    class="mt-0"
                    label="PKSF"
                    color="success"
                    v-model="user_type"
                    hide-details
                    :disabled="pksfbuttonDisable"
                    filled
                    @click="getListData('success')"
                  ></v-checkbox>
                </v-radio-group>
              </v-col>
              <v-col cols="8" class="text-right pr-0">
                <v-form v-if="listp">
                  <v-row>
                    <v-col cols="12" md="6" class="pb-0">
                      <v-autocomplete
                        :items="polist"
                        item-text="po_name_en"
                        item-value="id"
                        :label="$t('listMember.po_name_en')"
                        v-model="userSearchForm.po_id"
                        outlined
                        :disabled="userSearchformdisable"
                        dense
                        :filled="userSearchformdisable"
                      >
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="6" class="text-right pt-2">
                      <v-btn tile color="#bd3635" class="py-0" @click="reset">
                        {{ $t("Reset") }}
                      </v-btn>
                      <v-btn
                        color="#1b6030"
                        md="3"
                        class="text-right py-0"
                        @click="getListData(checkBoxColor)"
                      >
                        {{ $t("Search") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
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
    polist: [],
    checkboxStatus: "active",
    checkBoxColor: "success",
    userSearchForm: {
      po_id: null,
    },
    pksfbuttonDisable: false,
    user_type: false,
    userSearchformdisable: false,
    check_po_details_id: "",
    polists: "",
    asset_url: process.env.VUE_APP_API_BASE_URL,
  }),

  computed: {
    // ...mapState(["poList"]),
    // polist() {
    //   return this.$store.state.poList;
    // },
  },

  mounted() {
    this.setHeaders();
    // this.getFeaturePermission();
    // this.polists = this.$store.state.poList;
    // this.$store.dispatch("polist");

    this.getPoList();
    let user_po_details = JSON.parse(localStorage.getItem("user"));
    this.check_po_details_id = user_po_details.po_details_id;
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
      if (this.user_type == true) {
        this.userSearchformdisable = true;
        this.userSearchForm = {
          po_id: "",
        };
      } else {
        this.userSearchformdisable = false;
      }
      // disable polist dropdown adn pksf button
      if (this.check_po_details_id) {
        this.userSearchformdisable = true;
        this.pksfbuttonDisable = true;
      } else {
        this.pksfbuttonDisable = false;
      }
      this.checkBoxColor = color;
      this.userSearchForm.status = this.checkboxStatus;
      this.userSearchForm.user_type = this.user_type;
      this.userSearchForm.po_detail_id = this.check_po_details_id;
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
    getPoList() {
      var queryData = {
        table_name: "po_details",
        field_name: ["id", "po_name_en"],
        condition: { status: 1, deleted_at: null },
      };
      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.polist = res.data;
        })
        .catch((error) => console.log(error));
    },
    reset() {
      this.userSearchForm = {
        po_id: "",
      };
      (this.user_type = false),
        (this.checkboxStatus = "active"),
        this.getListData(this.checkBoxColor);
    },
  },
  watch: {
    params: {
      handler() {
        this.userSearchForm.status = this.checkboxStatus;
        this.userSearchForm.user_type = this.user_type;
        this.userSearchForm.po_detail_id = this.check_po_details_id;
        this.userSearchForm.po_id = this.check_po_details_id;
        // disable polist dropdown adn pksf button
        if (this.check_po_details_id) {
          this.userSearchformdisable = true;
          this.pksfbuttonDisable = true;
        } else {
          this.userSearchformdisable = false;
          this.pksfbuttonDisable = false;
        }
        this.getDataFromApi("api/users", this.userSearchForm).then((data) => {
          if (typeof data.items !== "undefined") {
            this.users = data.items;
            console.log(this.users);
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
