<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
          <h4 class="ma-3">
              {{ $t("employee.list") }}
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
                  @click="$router.push('/employee-management/employee/create')"
                >
                  {{ $t("add_new") }}
                </v-btn>
           
          </v-card-title>

          <v-card-text class="mt-2" v-if="listp">

            <v-data-table
              :headers="headers"
              :items="employees"
              :options.sync="pagination"
              :server-items-length="totalItems"
              :loading="loading"
              width="300"
              class="elevation-4"
            >
              <template slot="body">
                <tr v-for="(item, index) in employees" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td >{{ item.emp_type }}</td>
                  <td >{{ item.emp_no }}</td>
                  <td >{{ item.first_name }}</td>
                  <td >{{ item.last_name?item.last_name:"" }}</td>
                  <td >{{ item.home_phone }}</td>
                  <td >{{ item.personal_phone }}</td>
                  <td >{{ item.date_of_birth }}</td>
                  <td >{{ item.marital_status?item.marital_status:'' }}</td>
                  <td >{{ item.department.department_name }}</td>
                  <td >{{ item.designation.designation_name }}</td>
                  <td >{{ item.grade.grade_name }}</td>
                  <td >{{ item.unit?item.unit.unit_name:'' }}</td>
                  <td >{{ item.country }}</td>
                  <td >{{ item.blood_group?item.blood_group:'' }}</td>
                  <td >{{ item.religion }}</td>
                  <td >{{ item.gender }}</td>
                  <td >{{ item.hire_date }}</td>
                  <td >{{ item.probation_end_date?item.probation_end_date:'' }}</td>
                  <td >{{ item.date_of_permanent?item.date_of_permanent:'' }}</td>
                  <td >{{ item.present_address }}</td>
                  <td >{{ item.permanent_address }}</td>
                  <td >{{ item.emergency_contact_no }}</td>
                  <td >{{ item.reporting_to?item.reporting_to:'' }}</td>
                  <td >{{ item.employment_status?item.employment_status:'' }}</td>
                  <td >{{ item.termination?item.termination:'' }}</td>
                  <td >{{ item.termination_note?item.termination_note:'' }}</td>
                  
                
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
                        item.photo
                          ? asset_url + '/' + item.photo
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
    employees: [],
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
          text: this.$t("employee.emp_type"),
          align: "left",
          sortable: true,
          value: "emp_type",
          width: "160px"
        },
        {
          text: this.$t("employee.emp_no"),
          align: "left",
          sortable: true,
          value: "emp_no",
           width: "140px"
        },
        {
          text: this.$t("employee.first_name"),
          align: "left",
          sortable: true,
          value: "first_name",
           width: "160px"
        },
        {
          text: this.$t("employee.last_name"),
          align: "left",
          sortable: true,
          value: "last_name",
           width: "160px"
        },
        {
          text: this.$t("employee.home_phone"),
          align: "left",
          sortable: true,
          value: "home_phone",
           width: "140px"
        },
        {
          text: this.$t("employee.personal_phone"),
          align: "left",
          sortable: true,
          value: "personal_phone",
           width: "160px"
        },
        {
          text: this.$t("employee.date_of_birth"),
          align: "left",
          sortable: true,
          value: "date_of_birth",
           width: "160px"
        },
        {
          text: this.$t("employee.marital_status"),
          align: "left",
          sortable: false,
          value: "marital_status",
           width: "160px"
        },
        {
          text: this.$t("employee.department_id"),
          align: "left",
          sortable: true,
          value: "department_id",
           width: "160px"
        },
        {
          text: this.$t("employee.designation_id"),
          align: "left",
          sortable: true,
          value: "designation_id",
           width: "160px"
        },
        {
          text: this.$t("employee.grade_id"),
          align: "left",
          sortable: true,
          value: "grade_id",
           width: "160px"
        },
        {
          text: this.$t("employee.unit_id"),
          align: "left",
          sortable: true,
          value: "unit_id",
           width: "160px"
        },
        {
          text: this.$t("employee.country"),
          align: "left",
          sortable: true,
          value: "country",
           width: "160px"
        },
        {
          text: this.$t("employee.blood_group"),
          align: "left",
          sortable: true,
          value: "blood_group",
           width: "160px"
        },
        {       
          text: this.$t("employee.religion"),
          align: "left",
          sortable: true,
          value: "religion",
           width: "160px"
        },
        {       
          text: this.$t("employee.gender"),
          align: "left",
          sortable: true,
          value: "gender",
           width: "160px"
        },
        {       
          text: this.$t("employee.hire_date"),
          align: "left",
          sortable: true,
          value: "hire_date",
           width: "160px"
        },
        {       
          text: this.$t("employee.probation_end_date"),
          align: "left",
          sortable: true,
          value: "probation_end_date",
           width: "190px"
        },
        {       
          text: this.$t("employee.date_of_permanent"),
          align: "left",
          sortable: true,
          value: "date_of_permanent",
          width: "190px"
        },
        {       
          text: this.$t("employee.present_address"),
          align: "left",
          sortable: true,
          value: "present_address",
          width: "160px"
        },
        {       
          text: this.$t("employee.permanent_address"),
          align: "left",
          sortable: true,
          value: "permanent_address",
          width: "190px"
        },
        {       
          text: this.$t("employee.emergency_contact_no"),
          align: "left",
          sortable: true,
          value: "emergency_contact_no",
          width: "210px"
        },
        {       
          text: this.$t("employee.reporting_to"),
          align: "left",
          sortable: true,
          value: "reporting_to",
          width: "160px"
        },
        {       
          text: this.$t("employee.employeement_status"),
          align: "left",
          sortable: true,
          value: "employment_status",
          width: "210px"
        },
        {       
          text: this.$t("employee.termination"),
          align: "left",
          sortable: true,
          value: "termination",
          width: "160px"
        },
        {       
          text: this.$t("employee.termination_note"),
          align: "left",
          sortable: true,
          value: "termination_note",
          width: "190px"
        },
        {       
          text: this.$t("employee.photo"),
          align: "left",
          sortable: false,
          value: "photo",
          width: "150px"
        },
        {
          text: this.$t("employee.status"),
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
      this.$router.push("/employee-management/employee/edit/" + encrypted_id);
    },

    getListData() {
      this.getDataFromApi("api/v1/employee").then((data) => {
        if (typeof data.items !== "undefined") {
          this.employees = data.items;
        }
        this.totalItems = data.total;
      });
    },

    async deleteData(item, index) {
      if (confirm("Do you really want to delete?")) {
        let loader = this.$loading.show();
        const apiResponse = await ApiService.delete("api/v1/employee/" + item.id);
        if (apiResponse.status == 200) {
          this.employees.splice(index, 1);
        }
        loader.hide();
      }
    },
  
  },
  watch: {
    params: {
      handler() {
        
        this.getDataFromApi("api/v1/employee").then((data) => {
          if (typeof data.items !== "undefined") {
            this.employees = data.items;
           
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
