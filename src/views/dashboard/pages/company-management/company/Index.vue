<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
          <h4 class="ma-3">
              {{ $t("company.list") }}
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
                  @click="$router.push('/company-management/company/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
           
          </v-card-title>

          <v-card-text class="mt-2" v-if="listp">

            <v-data-table
              :headers="headers"
              :items="companies"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              width="300"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in companies" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td >{{ item.company_name }}</td>
                  <td >{{ item.email }}</td>
                  <td >{{ item.contact_no_1 }}</td>
                  <td >{{ item.contact_no_2 }}</td>
                  <td >{{ item.fax }}</td>
                  <td >{{ item.country }}</td>
                  <td >{{ item.city }}</td>
                  <td >{{ item.state }}</td>
                  <td >{{ item.division }}</td>
                  <td >{{ item.district }}</td>
                  <td >{{ item.address_1 }}</td>
                  <td >{{ item.address_2 }}</td>
                  <td >{{ item.website }}</td>
                  <td >{{ item.linkedin }}</td>
                  <td >{{ item.facebook }}</td>
                  <td >{{ item.youtube }}</td>
                  <td >{{ item.twitter }}</td>
                  <td >{{ item.instagram }}</td>
                  <td >{{ item.others }}</td>
                  
                
                  <!--<td>
                    <v-img
                      style="
                        border-radius: 50%;
                        margin: 10px 0px;
                        height: 50px;
                        width: 50px;
                      "
                      cover
                      :src="
                        item.logo
                          ? asset_url + '/' + item.logo
                          : asset_url + '/' + 'user/userpic.png'
                      "
                    >
                    </v-img>
                  </td> -->
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
    companies: [],
    page: 1,
   
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
          text: this.$t("company.company_name"),
          align: "left",
          sortable: true,
          value: "company_name",
          width: "160px"
        },
        {
          text: this.$t("company.email"),
          align: "left",
          sortable: true,
          value: "email",
           width: "140px"
        },
        {
          text: this.$t("company.contact_no_1"),
          align: "left",
          sortable: true,
          value: "contact_no_1",
           width: "160px"
        },
        {
          text: this.$t("company.contact_no_2"),
          align: "left",
          sortable: true,
          value: "contact_no_2",
           width: "160px"
        },
        {
          text: this.$t("company.fax"),
          align: "left",
          sortable: true,
          value: "fax",
           width: "140px"
        },
        {
          text: this.$t("company.country"),
          align: "left",
          sortable: true,
          value: "country",
           width: "160px"
        },
        {
          text: this.$t("company.city"),
          align: "left",
          sortable: true,
          value: "city",
           width: "160px"
        },
        {
          text: this.$t("company.state"),
          align: "left",
          sortable: false,
          value: "state",
           width: "160px"
        },
        {
          text: this.$t("company.division"),
          align: "left",
          sortable: true,
          value: "division",
           width: "160px"
        },
        {
          text: this.$t("company.district"),
          align: "left",
          sortable: true,
          value: "district",
           width: "160px"
        },
        {
          text: this.$t("company.address_1"),
          align: "left",
          sortable: true,
          value: "address_1",
           width: "160px"
        },
        {
          text: this.$t("company.address_2"),
          align: "left",
          sortable: true,
          value: "address_2",
           width: "160px"
        },
        {
          text: this.$t("company.website"),
          align: "left",
          sortable: true,
          value: "website",
           width: "160px"
        },
        {
          text: this.$t("company.linkedin"),
          align: "left",
          sortable: true,
          value: "linkedin",
           width: "160px"
        },
        {       
          text: this.$t("company.facebook"),
          align: "left",
          sortable: true,
          value: "facebook",
           width: "160px"
        },
        {       
          text: this.$t("company.youtube"),
          align: "left",
          sortable: true,
          value: "youtube",
           width: "160px"
        },
        {       
          text: this.$t("company.twitter"),
          align: "left",
          sortable: true,
          value: "twitter",
           width: "160px"
        },
        {       
          text: this.$t("company.instagram"),
          align: "left",
          sortable: true,
          value: "instagram",
           width: "160px"
        },
        {       
          text: this.$t("company.others"),
          align: "left",
          sortable: true,
          value: "others",
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
      this.$router.push("/company-management/company/edit/" + encrypted_id);
    },

    getListData() {
      this.getDataFromApi("api/v1/companies").then((data) => {
        if (typeof data.items !== "undefined") {
          this.companies = data.items;
        }
        this.totalItems = data.total;
      });
    },

    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/v1/companies/" + item.id);
        if (apiResponse.status == 200) {
          this.companies.splice(index, 1);
        }
        loader.hide();
      }
    },
  
  },
  watch: {
    params: {
      handler() {
        
        this.getDataFromApi("api/v1/companies").then((data) => {
          if (typeof data.items !== "undefined") {
            this.companies = data.items;
           
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
