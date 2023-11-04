<template>
  <v-app>
    <dashboard-core-app-bar/>

    <dashboard-core-drawer/>

    <dashboard-core-view/>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DashboardIndex",
  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreView: () => import("./components/core/View"),
  },

  data: () => ({
    expandOnHover: false,
  }),

  computed: {
    ...mapGetters(["user"]),
  },
  beforeCreate(){
   this.$store.dispatch("menulist");
  },
 
};
</script>
