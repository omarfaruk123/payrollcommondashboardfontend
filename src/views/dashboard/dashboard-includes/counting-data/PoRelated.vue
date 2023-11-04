<template>
  <v-card outlined class="pt-0 mt-3">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="success"
            icon="mdi-database-eye-outline"
            title="Number of PO"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_po.amount"
            :sub-text="res.no_of_po.last_update"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="warning"
            icon="mdi-database-eye-outline"
            title="Number of Sectors"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_sectors.amount"
            :sub-text="res.no_of_sectors.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="info"
            icon="mdi-database-eye-outline"
            title="Number of Sub-Projects"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_sub_projects.amount"
            :sub-text="res.no_of_sub_projects.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="error"
            icon="mdi-database-eye-outline"
            title="Number of District Covered"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_district_covered.amount"
            :sub-text="res.no_of_district_covered.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="error"
            icon="mdi-database-eye-outline"
            title="Number of Upazila Covered"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_upazila_covered.amount"
            :sub-text="res.no_of_upazila_covered.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="info"
            icon="mdi-database-eye-outline"
            title="Number of Member"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_member.amount"
            :sub-text="res.no_of_member.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="warning"
            icon="mdi-database-eye-outline"
            title="Number of Loanee"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_loanee.amount"
            :sub-text="res.no_of_loanee.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="success"
            icon="mdi-database-eye-outline"
            title="Number of Savings"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_savings.amount"
            :sub-text="res.no_of_savings.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="success"
            icon="mdi-database-eye-outline"
            title="Total Loan Outstanding"
            sub-icon="mdi-clock-outline"
            :value="res.loan_outstanding.amount"
            :sub-text="res.loan_outstanding.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="warning"
            icon="mdi-database-eye-outline"
            title="Total Overdue"
            sub-icon="mdi-clock-outline"
            :value="res.total_overdue.amount"
            :sub-text="res.total_overdue.last_update"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="info"
            icon="mdi-database-eye-outline"
            title="Total Number of Cluster Covered"
            sub-icon="mdi-clock-outline"
            :value="res.no_of_cluster_covered.amount"
            :sub-text="res.no_of_cluster_covered.last_update"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4" lg="3">
          <base-material-stats-card
            color="warning"
            icon="mdi-format-list-bulleted-triangle"
            title="No of Loan"
            sub-icon="mdi-clock-outline "
            :value="res.no_of_loan.amount"
            :sub-text="res.no_of_loan.last_update"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { makeNumber } from "@/helpers/generaleHelpers";

import ApiService from "@/services/ApiService";

export default {
  name: "PoRelated",
  mixins: [],
  components: {},
  data: () => ({
    res: {
      no_of_po: {
        amount: "0",
        last_update: "",
      },
      no_of_sectors: {
        amount: "0",
        last_update: "",
      },
      no_of_sub_projects: {
        amount: "0",
        last_update: "",
      },
      no_of_district_covered: {
        amount: "0",
        last_update: "",
      },
      no_of_upazila_covered: {
        amount: "0",
        last_update: "",
      },
      no_of_member: {
        amount: "0",
        last_update: "",
      },
      no_of_loanee: {
        amount: "0",
        last_update: "",
      },
      no_of_savings: {
        amount: "0",
        last_update: "",
      },
      loan_outstanding: {
        amount: "0",
        last_update: "",
      },
      total_overdue: {
        amount: "0",
        last_update: "",
      },
      no_of_cluster_covered: {
        amount: "0",
        last_update: "",
      },
      no_of_loan: {
        amount: "0",
        last_update: "",
      },
    },
  }),

};
</script>

<style scope>
.v-card--material.pa-3 {
  padding: 10px !important;
}

.v-card--material .pa-7 {
  padding: 25px !important;
}

.v-card--material .d-flex {
  -webkit-box-flex: unset !important;
  flex-grow: unset !important;
  flex-shrink: unset !important;
  flex-wrap: unset !important;
}

.v-card--material .d-flex .body-3 {
  font-size: 14px;
  font-weight: 400 !important;
  color: #333 !important;
  min-height: 38px;
}

.v-card--material .d-flex > .ml-6 {
  margin-left: 12px !important;
}

.v-application .display-2 {
  font-weight: 600 !important;
  font-size: 16px !important;
}
</style>
