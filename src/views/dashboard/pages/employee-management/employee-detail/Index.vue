<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
          <h4 class="ma-3">
              {{ $t("empDetail.list") }}
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
                  @click="$router.push('/employee-management/employee-detail/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
           
          </v-card-title>

          <v-card-text class="mt-2" v-if="listp">

            <v-data-table
              :headers="headers"
              :items="empDetails"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              width="300"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in empDetails" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td >{{ item.emp_no }}</td>
                  <td >{{ item.father_name }}</td>
                  <td >{{ item.mother_name }}</td>
                  <td >{{ item.spouse?item.spouse:'' }}</td>
                  <td >{{ item.tin?item.tin:'' }}</td>
                  <td >{{ item.nid?item.nid:'' }}</td>
                  <td >{{ item.education?item.education:'' }}</td>
                  <td >{{ item.training?item.training:'' }}</td>
                  <td >{{ item.experience?item.experience:'' }}</td>
                
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
                        item.certificate
                          ? asset_url + '/' + item.certificate
                          : asset_url + '/' + 'user/userpic.png'
                      "
                    >
                    </v-img>
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
                        item.resume
                          ? asset_url + '/' + item.resume
                          : asset_url + '/' + 'user/userpic.png'
                      "
                    >
                    </v-img>
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
                        item.personal_file
                          ? asset_url + '/' + item.personal_file
                          : asset_url + '/' + 'user/userpic.png'
                      "
                    >
                    </v-img>
                  </td> 
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
    empDetails: [],
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
          text: this.$t("empDetail.emp_no"),
          align: "left",
          sortable: true,
          value: "emp_no",
          width: "160px"
        },
        {
          text: this.$t("empDetail.father_name"),
          align: "left",
          sortable: true,
          value: "father_name",
           width: "140px"
        },
        {
          text: this.$t("empDetail.mother_name"),
          align: "left",
          sortable: true,
          value: "mother_name",
           width: "160px"
        },
        {
          text: this.$t("empDetail.spouse"),
          align: "left",
          sortable: true,
          value: "spouse",
           width: "160px"
        },
        {
          text: this.$t("empDetail.tin"),
          align: "left",
          sortable: true,
          value: "tin",
           width: "140px"
        },
        {
          text: this.$t("empDetail.nid"),
          align: "left",
          sortable: true,
          value: "nit",
           width: "160px"
        },
        {
          text: this.$t("empDetail.education"),
          align: "left",
          sortable: true,
          value: "education",
           width: "160px"
        },
        {
          text: this.$t("empDetail.training"),
          align: "left",
          sortable: false,
          value: "training",
           width: "160px"
        },
        {
          text: this.$t("empDetail.experience"),
          align: "left",
          sortable: true,
          value: "experience",
           width: "160px"
        },
        {
          text: this.$t("empDetail.certificate"),
          align: "left",
          sortable: true,
          value: "certificate",
           width: "160px"
        },
        {
          text: this.$t("empDetail.resume"),
          align: "left",
          sortable: true,
          value: "resume",
           width: "160px"
        },
        {
          text: this.$t("empDetail.personal_file"),
          align: "left",
          sortable: true,
          value: "personal_file",
           width: "160px"
        },
        
        {
          text: this.$t("empDetail.status"),
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
      this.$router.push("/employee-management/employee-detail/edit/" + encrypted_id);
    },

    getListData() {
      this.getDataFromApi("api/v1/empdetails").then((data) => {
        if (typeof data.items !== "undefined") {
          this.empDetails = data.items;
        }
        this.totalItems = data.total;
      });
    },

    async deleteData(item, index) {
   
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/v1/empdetails/" + item.id);
        console.log(apiResponse);
        if (apiResponse.status == 200) {
          this.empDetails.splice(index, 1);
        }
        loader.hide();
      }
    },
  
  },
  watch: {
    params: {
      handler() {
        
        this.getDataFromApi("api/v1/empdetails").then((data) => {
          if (typeof data.items !== "undefined") {
            this.empDetails = data.items;
           
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
