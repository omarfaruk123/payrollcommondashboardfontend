<template>
  <v-container id="unit-list" fluid tag="section">
    <v-row>
      <v-col cols="12" md="6">
        <v-card outlined class="mt-2">
          <v-card-title class="component-title">
            <div class="title-left">
              <h4 class="title-text">Mis Setting</h4>
            </div>
          </v-card-title>
          <v-card-text class="mt-3">
            <MisSetting
              :settings="settings"
              @updateSetting="updateSetting"
            ></MisSetting>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MisSetting from "./includes/MisSetting";

export default {
  name: "Index",
  components: { MisSetting },
  mixins: [DataTableMixin, PermissionMixin],
  data: () => ({
    settings: {
      mis_auto_edit_option: "",
      mis_auto_disable_days: "",
    },
  }),
  computed: {},
  mounted() {
    this.loadSettingData();
  },
  methods: {
    loadSettingData() {
      ApiService.get("api/setting/data")
        .then(({ data }) => {
          let settings = data?.data?.settings;
          if (Object.keys(settings).length > 0) {
            this.settings = settings || {};
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        });
    },
    updateSetting() {
      ApiService.post("api/setting/store", this.settings)
        .then((res) => {
          if (res?.data?.success) {
            let settings = res?.data?.data?.settings || {};
            if (Object.keys(settings).length > 0) {
              this.settings = settings || {};
            }
            Toast.fire({
              icon: "success",
              title: "Settings updated successfully",
            });
          }
        })
        .catch((errors) => {
          Toast.fire({
            icon: "error",
            title: errors,
          });
        });
    },
  },
};
</script>

<style scoped>
/* .searchbox{
  background-color:white;
  margin-top:-3px;
}
.v-card__title{
  background-color:#ddd;
  margin-top:0px!important;
}
.v-data-table >>> .v-data-table-header {
    background-color: #ddd; 
}

.v-data-table >>> th.sortable:hover  {
    font-size: 14px;
    font-weight: 700;
}

.v-data-table>>>th.sortable {
  font-size: 14px;
  font-weight: 700;
} */

/* .theme--light.v-data-table >>> .v-data-table__wrapper >>> table >>> thead >>> tr >>> th {
    color: #000;
}
::v-deep .v-data-table-header {
  background-color: #DCDCDC;
  
} */
/* .v-data-table > .v-data-table__wrapper > table > thead > tr > th.sortable:active {
    color: #000;
}
.theme--light.v-data-table >>> .v-data-table__wrapper >>> table >>> thead >>> tr >>> th {
    color: #000;
} */
</style>
