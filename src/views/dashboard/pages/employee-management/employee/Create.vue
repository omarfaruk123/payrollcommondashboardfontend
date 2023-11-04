<template>
  <v-container id="employee" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card outlined class="mt-0">
          <v-card-title class="component-title">
            <h4 class="ma-3">
              <v-icon>mdi-plus</v-icon>
              {{
                !isEdit
                  ? $t("employee.employeeCreate")
                  : $t("employee.employeeEdit")
              }}
            </h4>
          </v-card-title>
          <v-card-text class="mt-2">
            <v-form id="form">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      v-model="employeeForm.emp_no"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("employee.emp_no") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.emp_no.$error && !$v.employeeForm.emp_no.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                   
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-autocomplete
                      :items="emp_type"
                      item-text="Employee Type"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.emp_type"
                    >
                      <template #label>
                        {{ $t("employee.emp_type") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p v-if="$v.employeeForm.emp_type.$error" class="red--text">
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      :label="$t('employee.first_name')"
                      v-model="employeeForm.first_name"
                      outlined
                      dense
                      hide-details
                    >
                      <template #label>
                        {{ $t("employee.first_name") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.first_name.$error &&
                        !$v.employeeForm.first_name.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.last_name"
                    >
                      <template #label>
                        {{ $t("employee.last_name") }}
                      </template>
                    </v-text-field>
                  
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.home_phone"
                    >
                      <template #label>
                        {{ $t("employee.home_phone") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.home_phone.$error &&
                        !$v.employeeForm.home_phone.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.personal_phone"
                    >
                      <template #label>
                        {{ $t("employee.personal_phone") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.personal_phone.$error &&
                        !$v.employeeForm.personal_phone.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-menu
                      ref="date_of_birth"
                      v-model="datePicker"
                      :close-on-content-click="false"
                      :return-value.sync="employeeForm.date_of_birth"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      class="purple-input"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="employeeForm.date_of_birth"
                          :label="$t('employee.date_of_birth')"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          hide-details
                          dense
                          class="purple-input"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="employeeForm.date_of_birth"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="datePicker = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="
                            $refs.date_of_birth.save(employeeForm.date_of_birth)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <p
                      v-if="$v.employeeForm.date_of_birth.$error"
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                 

                  <v-col cols="12" md="6">
                    <v-autocomplete
                      :items="marital_status"
                      item-text="Marital Status"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.marital_status"
                    >
                    
                      <template #label>
                        {{ $t("employee.marital_status") }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-autocomplete
                        :items="departmentList"
                        outlined
                        dense
                        hide-details
                        item-text="department_name"
                        item-value="id"
                        v-model="employeeForm.department_id"
                      >
                  
                      <template #label>
                        {{ $t("employee.department_id") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="
                        $v.employeeForm.department_id.$error &&
                        !$v.employeeForm.department_id.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-autocomplete
                        :items="designationList"
                        outlined
                        dense
                        hide-details
                        item-text="designation_name"
                        item-value="id"
                        v-model="employeeForm.designation_id"
                      >
                      <template #label>
                        {{ $t("employee.designation_id") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="
                        $v.employeeForm.designation_id.$error &&
                        !$v.employeeForm.designation_id.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-autocomplete
                        :items="gradeList"
                        outlined
                        dense
                        hide-details
                        item-text="grade_name"
                        item-value="id"
                        v-model="employeeForm.grade_id"
                      >
                   
                      <template #label>
                        {{ $t("employee.grade_id") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="
                        $v.employeeForm.grade_id.$error &&
                        !$v.employeeForm.grade_id.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                     <v-autocomplete
                        :items="unitList"
                        outlined
                        dense
                        hide-details
                        item-text="unit_name"
                        item-value="id"
                        v-model="employeeForm.unit_id"
                      >
                      <template #label>
                        {{ $t("employee.unit_id") }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.country"
                    >
                      <template #label>
                        {{ $t("employee.country") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.country.$error &&
                        !$v.employeeForm.country.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                  <v-autocomplete
                      :items="blood_group"
                      item-text="Blood Group"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.blood_group"
                    >
                   
                      <template #label>
                        {{ $t("employee.blood_group") }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6">
                  <v-autocomplete
                      :items="religion"
                      item-text="Religion"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.religion"
                    >
                      <template #label>
                        {{ $t("employee.religion") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="
                        $v.employeeForm.religion.$error &&
                        !$v.employeeForm.religion.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                  <v-autocomplete
                      :items="gender"
                      item-text="Gender"
                      item-value="id"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.gender"
                    >
                   
                      <template #label>
                        {{ $t("employee.gender") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                    <p
                      v-if="
                        $v.employeeForm.gender.$error &&
                        !$v.employeeForm.gender.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                   <v-col cols="12" md="6">
                    <v-menu
                      ref="hire_date"
                      v-model="datePicker1"
                      :close-on-content-click="false"
                      :return-value.sync="employeeForm.hire_date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      class="purple-input"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="employeeForm.hire_date"
                          :label="$t('employee.hire_date')"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          hide-details
                          dense
                          class="purple-input"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="employeeForm.hire_date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="datePicker1 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="
                            $refs.hire_date.save(employeeForm.hire_date)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <p
                      v-if="$v.employeeForm.hire_date.$error"
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>

                   <v-col cols="12" md="6">
                    <v-menu
                      ref="probation_end_date"
                      v-model="datePicker2"
                      :close-on-content-click="false"
                      :return-value.sync="employeeForm.probation_end_date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      class="purple-input"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="employeeForm.probation_end_date"
                          :label="$t('employee.probation_end_date')"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          hide-details
                          dense
                          class="purple-input"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="employeeForm.probation_end_date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="datePicker2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="
                            $refs.probation_end_date.save(employeeForm.probation_end_date)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                  
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-menu
                      ref="date_of_permanent"
                      v-model="datePicker3"
                      :close-on-content-click="false"
                      :return-value.sync="employeeForm.date_of_permanent"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      class="purple-input"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="employeeForm.date_of_permanent"
                          :label="$t('employee.date_of_permanent')"
                          append-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          hide-details
                          dense
                          class="purple-input"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="employeeForm.date_of_permanent"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="success" @click="datePicker3 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="success"
                          @click="
                            $refs.date_of_permanent.save(employeeForm.date_of_permanent)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                  
                  </v-col>
                 
                
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.present_address"
                    >
                      <template #label>
                        {{ $t("employee.present_address") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.present_address.$error &&
                        !$v.employeeForm.present_address.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.permanent_address"
                    >
                      <template #label>
                        {{ $t("employee.permanent_address") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.permanent_address.$error &&
                        !$v.employeeForm.permanent_address.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.emergency_contact_no"
                    >
                      <template #label>
                        {{ $t("employee.emergency_contact_no") }}
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                    <p
                      v-if="
                        $v.employeeForm.emergency_contact_no.$error &&
                        !$v.employeeForm.emergency_contact_no.required
                      "
                      class="red--text"
                    >
                      This field is required
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.reporting_to"
                    >
                      <template #label>
                        {{ $t("employee.reporting_to") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-input"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.employeement_status"
                    >
                      <template #label>
                        {{ $t("employee.employeement_status") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-terminationinput"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.termination"
                    >
                      <template #label>
                        {{ $t("employee.termination") }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      class="purple-terminationinput"
                      outlined
                      dense
                      hide-details
                      v-model="employeeForm.termination_note"
                    >
                      <template #label>
                        {{ $t("employee.termination_note") }}
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="pb-0">
                    <v-row>
                      <v-col cols="12" md="10" class="pb-0">
                        <v-text-field
                          outlined
                          dense
                          label="Select photo"
                          @click="pickFile"
                          v-model="imageName"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="avatar"
                          accept="image/*"
                          @change="onFilePicked"
                        />
                      </v-col>
                      <v-col cols="12" md="2" class="pb-0">
                        <img v-if="imageUrl" :src="imageUrl" height="50" />

                        <img
                          v-else-if="employeeForm.photo"
                          :src="asset_url + '/' + employeeForm.photo"
                          height="50"
                        />
                      </v-col>
                      <p
                        class="mb-2 ml-3 pl-2 pt-1 pb-1 pr-2"
                        style="background: #efefef"
                      >
                        Supported Image Formats: JPG/JPEG/PNG &nbsp;&nbsp; Max
                        Image Size: 1MB
                      </p>
                    </v-row>
                  </v-col>
                   <v-col cols="12" md="6">
                    <v-checkbox v-model="employeeForm.status" :label="$t('active')" color="info" value="1" hide-details>
                    </v-checkbox>
                   </v-col>
                
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="#bd3635"
                      class="mr-5"
                      @click="$router.push('/employee-management/employee')"
                    >
                      {{ $t("cancel") }}
                    </v-btn>

                    <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                      {{ isEdit ? $t("update") : $t("save") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  email,
  minLength,
  maxLength,
  requiredIf,
  numeric,
} from "vuelidate/lib/validators";

import axios from "axios";

export default {
  name: "Create",
  mixins: [validationMixin, PermissionMixin],
  data: () => ({
    employeeForm: {
      emp_type: "",
      emp_no: "",
      first_name: "",
      last_name: "",
      home_phone: "",
      personal_phone: "",
      date_of_birth: "",
      marital_status: "",
      department_id: "",
      designation_id: "",
      grade_id: "",
      unit_id: "",
      country: "",
      blood_group: "",
      religion: "",
      gender: "",
      photo: "",
      hire_date: "",
      probation_end_date: "",
      date_of_permanent: "",
      present_address: "",
      permanent_address: "",
      emergency_contact_no: "",
      reporting_to: "",
      employeement_status: "",
      termination: "",
      termination_note: "",
      status: "1",
   
    },
    datePicker: false,
    datePicker1: false,
    datePicker2: false,
    datePicker3: false,
    imageName: "",
    imageUrl: "",
    emp_type: ["On Probation", "Permanent", "Part Time","Contractual","Locum","Others"],
    marital_status: ["Single", "Married", "Devorced","Widowed"],
    religion: ["Muslim", "Hindu", "Buddist","Christian","Others"],
    gender: ["Male", "Female", "Others"],
    blood_group: ["A+", "A-", "B+","B-","O+","O-","AB+","AB-"],
    error: "",
    asset_url: process.env.VUE_APP_API_BASE_URL,
   
    isEdit: false,
    employee: {},
    departmentList:[],
    designationList:[],
    gradeList:[],
    unitList:[],
   
  }),
  mounted() {
  
    if (this.$route.params.id) {
      this.isEdit = true;
      this.setEditData();
    }
    this.getDepartment();
    this.getDesignation();
    this.getGrade();
    this.getUnit();
   
  },

  methods: {
    validateField() {
      this.$refs.avatar.validate();
    },
    getDepartment() {
      var queryData = {
        table_name: "departments",
        field_name: ["id", "department_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.departmentList = res.data;
        })
        .catch((error) => console.log(error));
    },
    getDesignation() {
      var queryData = {
        table_name: "designations",
        field_name: ["id", "designation_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.designationList = res.data;
        })
        .catch((error) => console.log(error));
    },
    getGrade() {
      var queryData = {
        table_name: "grades",
        field_name: ["id", "grade_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.gradeList = res.data;
        })
        .catch((error) => console.log(error));
    },
    getUnit() {
      var queryData = {
        table_name: "units",
        field_name: ["id", "unit_name"],
        condition: { status: 1, deleted_at: null },
      };

      ApiService.getDropData("api/common-dropdown", queryData)
        .then((res) => {
          this.unitList = res.data;
        })
        .catch((error) => console.log(error));
    },
 
    setEditData() {
      this.employee = JSON.parse(localStorage.getItem("editData"));
      if (this.employee) {
        this.employeeForm.emp_type = this.employee.emp_type;
        this.employeeForm.emp_no = this.employee.emp_no;
        this.employeeForm.first_name = this.employee.first_name;
        this.employeeForm.last_name = this.employee.last_name;
        this.employeeForm.home_phone = this.employee.home_phone;
        this.employeeForm.personal_phone = this.employee.personal_phone;
        this.employeeForm.date_of_birth = this.employee.date_of_birth;
        this.employeeForm.marital_status = this.employee.marital_status;
        this.employeeForm.department_id = this.employee.department_id;
        this.employeeForm.designation_id = this.employee.designation_id;
        this.employeeForm.grade_id = this.employee.grade_id;
        this.employeeForm.unit_id = this.employee.unit_id;
        this.employeeForm.country = this.employee.country;
        this.employeeForm.blood_group = this.employee.blood_group;
        this.employeeForm.religion = this.employee.religion;
        this.employeeForm.gender = this.employee.gender;
        this.employeeForm.hire_date = this.employee.hire_date;
        this.employeeForm.probation_end_date = this.employee.probation_end_date;
        this.employeeForm.date_of_permanent = this.employee.date_of_permanent;
        this.employeeForm.present_address = this.employee.present_address;
        this.employeeForm.permanent_address = this.employee.permanent_address;
        this.employeeForm.emergency_contact_no = this.employee.emergency_contact_no;
        this.employeeForm.reporting_to = this.employee.reporting_to;
        this.employeeForm.employeement_status = this.employee.employeement_status;
        this.employeeForm.termination = this.employee.termination;
        this.employeeForm.termination_note = this.employee.termination_note;
        this.employeeForm.photo = this.employee.photo;
        this.employeeForm.status = this.employee.status == 1 ? "1" : "0";
      }
    },
    submitForm() {
      this.$v.employeeForm.$touch();
      if (!this.$v.employeeForm.$error) {
        if (this.isEdit) {
          this.saveUpdateForm();
        } else {
          this.saveCreateForm();
        }
      }
    },
    saveCreateForm() {
      let loader = this.$loading.show();
      let formData = new FormData(document.getElementById("form"));
      Object.entries(this.employeeForm).filter((item) => {
        formData.append(item[0], item[1]);
      });
      if (this.$refs.avatar.files[0]) {
        formData.append("photo", this.$refs.avatar.files[0]);
      }
     
      ApiService.post("api/v1/employee", formData)
        .then((res) => {
        console.log(res);
          this.error = res.data.errors;
          let message = "";
          if (res.data.code == 2003) {
            Object.values(res.data.errors).map((ele) => {
              ele.map((msg) => {
                message = message + msg + "<br>";
              });
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          } else if (res.data.success) {
            console.log(res);
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
            this.$router.push("/employee-management/employee");
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    saveUpdateForm() {
      let loader = this.$loading.show();
      let formData = new FormData(document.getElementById("form"));
      Object.entries(this.employeeForm).filter((item) => {
        formData.append(item[0], item[1]);
      });

      if (this.$refs.avatar.files && this.$refs.avatar.files[0]) {
        formData.append("new_photo", this.$refs.avatar.files[0]);
      }
     
      formData.append("_method", "PUT");
      axios
        .post("api/v1/employee/" + this.employee.id, formData)
        .then((res) => {
          let message = "";
          if (res.data.code == 2003) {
            Object.values(res.data.errors).map((ele) => {
              ele.map((msg) => {
                message = message + msg + "<br>";
              });
            });
            Toast.fire({
              icon: "error",
              title: message,
            });
          } else if (res.data.success) {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
            localStorage.removeItem("editData");
            this.$router.push("/employee-management/employee");
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    pickFile() {
      this.$refs.avatar.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      } else {
        this.imageName = "";
        this.imageUrl = "";
      }
    },
 
    customFilter(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  validations() {
    const validations = {
      employeeForm: {
        emp_type: {
          required,
        },
        emp_no: {
          required,
        },
        first_name: {
          required,
        },
        home_phone: {
          required,
        },
        personal_phone: {
          required,
        },
        date_of_birth: {
          required,
        },
        department_id: {
          required,
        },
        designation_id: {
          required,
        },
        grade_id: {
          required,
        },
        country: {
          required,
        },
        religion: {
          required,
        },
        gender: {
          required,
        },
        hire_date: {
          required,
        },
         present_address: {
          required,
        },
         permanent_address: {
          required,
        },
         emergency_contact_no: {
          required,
        },
      },
    };
    if (!this.isEdit) {
     
    }
    return validations;
  },
};
</script>

<style scoped></style>
