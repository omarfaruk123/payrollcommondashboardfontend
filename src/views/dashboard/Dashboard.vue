<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <base-material-chart-card
          :data="membersChart.data"
          :options="membersChart.options"
          :responsive-options="membersChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Member Information
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Member admission, presence and absence based summary information
            chart
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">
              {{ resData.update_time }}
            </span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <base-material-chart-card
          :data="savingsChart.data"
          :options="savingsChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">Savings Status</h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon color="green" small> mdi-arrow-up</v-icon>
            Savings status of the member.
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">
              {{ resData.update_time }}
            </span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <base-material-chart-card
          :data="loanChart.data"
          :options="loanChart.options"
          color="warning"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">Loan Status</h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Loan Status of the member
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">
              {{ resData.update_time }}
            </span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <!-- <v-card outlined class="pt-0 mt-0">
          <v-card-title class="component-title">
            <div class="clearfix">
              <div class="title-left">
                <h4 class="title-text">S-Curve</h4>
              </div>
            </div>
          </v-card-title>
          <v-card-text class="mt-5">
            <v-row>
              <v-col
                class="draw"
                :style="{
                  backgroundImage: 'url(' + require('@/assets/curve.png'),
                }"
              >
                <div
                  id="dotId"
                  ref="dotId"
                  class="dot1"
                  :title="dotTitle"
                ></div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card> -->
      </v-col>

      <v-col cols="12" md="23" lg="23">
        <PoRelated></PoRelated>
      </v-col>

     
     
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/services/ApiService";
import PoRelated from "./dashboard-includes/counting-data/PoRelated";

export default {
  name: "Dashboard",
  components: {
    PoRelated,
  },
  data() {
    return {
      resData: {},
      membersChart: {
        data: {
          labels: [],
          series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        },
        options: {
          low: 0,
          high: 20,
          hoverReveal: true,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      savingsChart: {
        data: {
          labels: [],
          series: [[12, 17, 7, 17, 23, 18, 38, 23, 23, 23, 22, 44]],
        },
        options: {
          low: 1000,
          high: 50000,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 15,
          },
        },
      },
      loanChart: {
        data: {
          labels: [],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          low: 1000,
          high: 5000,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 15,
          },
        },
      },
    };
  },
 
};
</script>

<style scoped>
.draw {
  margin-left: 0;
  margin-right: 0;
  background-repeat: no-repeat !important;
  background: white;
  width: 100%;
  height: 290px;
  background-size: 88%;
  background-position: center center;
}

.dot {
  height: 5px;
  width: 5px;
  background-color: #000000;
  margin: 224px 17px 96px 160px;
}
</style>
