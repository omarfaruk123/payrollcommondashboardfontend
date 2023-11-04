<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    class="primary"
    v-model="drawer"
    mobile-breakpoint="960"
    app
    width="260"
  >
    <v-list>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img src="@/assets/official-logo.png" max-height="30" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="display-1" v-text="profile.title" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item route-link to="/" link>
        <v-list-item-icon>
          <v-icon>{{ "mdi-view-dashboard" }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-for="(n, i) in itemss">
        <v-list-item v-if="n.to" :key="`${i}-a`" :to="n.to" link>
          <v-list-item-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ n.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-if="n.children"
          :key="`${i}-b`"
          :prepend-icon="`${n.icon} fa-em`"
          v-model="n.active"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ n.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list>
            <template v-for="(s, y) in n.children">
              <v-list-item v-if="s.to" :key="`${y}-aa`" :to="s.to" link>
                <v-list-item-icon>
                  <v-icon small>{{ s.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ s.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-group
                v-if="s.children"
                :key="`${y}-c`"
                v-model="y.active"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ s.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(ss, yy) in s.children[0]"
                  :key="yy"
                  :to="ss.to"
                  link
                  class="pl-8"
                >
                  <v-list-item-icon>
                    <v-icon small>{{ ss.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ ss.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list>
        </v-list-group>
      </template>
    </v-list>
    
  
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        group: "Dashboard",
        to: "/",
      },
      {
        avatar: undefined,
        group: "User Management",
        title: "User Management",
        icon: "mdi-account-group",
        children: [
          {
            href: "#",
            icon: "mdi-human-male-female",
            subtitle: undefined,
            title: "User",
            to: "/system-admin/users",
          },
          
          {
            href: "#",  
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Grade",
            to: "/system-admin/grade",
          },
         
          {
            href: "#",
            icon: "mdi-wrench",
            subtitle: undefined,
            title: "Role",
            to: "/system-admin/roles",
          },
          {
            href: "#",
            icon: "mdi-vector-difference",
            subtitle: undefined,
            title: "Role Group",
            to: "/system-admin/role-groups",
          },
          {
            href: "#",
            icon: "mdi-account-key",
            subtitle: undefined,
            title: "Role Permission",
            to: "/system-admin/role-permission",
            // to: "/system-admin/role-permission/create",
          },
          {
            href: "#",
            icon: "mdi-folder-open",
            subtitle: undefined,
            title: "Module",
            to: "/system-admin/modules",
          },
          {
            href: "#",
            icon: "mdi-pencil-lock",
            subtitle: undefined,
            title: "URL",
            to: "/system-admin/urls",
          },
           {
             href: "#",
             icon: "mdi-clover",
             subtitle: undefined,
             title: "Menu",
             to: "/system-admin/menus",
           },
          {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Division",
            to: "/system-admin/division",
          },
          {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "District",
            to: "/system-admin/district",
          },
          {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Upazila",
            to: "/system-admin/upazila",
          },
          {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Union",
            to: "/system-admin/union",
          },
         
          {
            href: "#",
            icon: "mdi-account-key",
            subtitle: undefined,
            title: "Reset Password",
            to: "/system-admin/reset-password",
          },
        ],
      },
      {
        avatar: undefined,
        group: "HR Basic Setup",
        title: "HR Basic Setup",
        icon: "mdi-chart-line",
        children: [
          {
            href: "#",  
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Designation",
            to: "/hr-basic-setup/designation",
          },
           {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Unit",
            to: "/hr-basic-setup/unit",
          },
          {
            href: "#",
            icon: "mdi-rounded-corner",
            subtitle: undefined,
            title: "Department",
            to: "/hr-basic-setup/department",
          },
          
        ],
      },
      {
        avatar: undefined,
        group: "Company Management",
        title: "Company Management",
        icon: "mdi-chart-histogram",
        children: [
          {
            href: "#",
            icon: "mdi-human-male-female",
            subtitle: undefined,
            title: "Company",
            to: "/company-management/company",
          },
          {
            href: "#",
            icon: "mdi-human-male-female",
            subtitle: undefined,
            title: "Branch",
            to: "/company-management/branch",
          },
          
        ],
      },
      {
        avatar: undefined,
        group: "Employee Management",
        title: "Employee Management",
        icon: "mdi-nuke",
        children: [
          {
            href: "#",
            icon: "mdi-human-male-female",
            subtitle: undefined,
            title: "Employee",
            to: "/employee-management/employee",
          },
          {
            href: "#",
            icon: "mdi-human-male-female",
            subtitle: undefined,
            title: "Employee Detail",
            to: "/employee-management/employee-detail",
          },
        ],
        
      },
      {
        avatar: undefined,
        group: "MIS",
        title: "Management Module",
        icon: "mdi-chemical-weapon",
        children: [
          {
            href: "#",
            icon: "mdi-elevation-decline",
            subtitle: undefined,
            title: "MIS-1",
            to: "/management-module/mis1",
          },
          {
            href: "#",
            icon: "mdi-elevation-rise",
            subtitle: undefined,
            title: "MIS-2",
            to: "/management-module/mis2",
          },
          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "Training",
            children: [
              {
                href: "#",
                icon: "mdi-jquery",
                subtitle: undefined,
                title: "Training Type",
                to: "/management-module/training-type",
              },
              {
                href: "#",
                icon: "mdi-radar",
                subtitle: undefined,
                title: "Training Code",
                to: "/management-module/training-code",
              },
              {
                href: "#",
                icon: "mdi-decagram-outline",
                subtitle: undefined,
                title: "Detailed Training",
                to: "/management-module/training-detailed",
              },
              {
                href: "#",
                icon: "mdi-thermometer",
                subtitle: undefined,
                title: "Complied Training",
                to: "/management-module/complied-training",
              },
            ],
          },

          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "AIS-1",
            children: [
              {
                href: "#",
                icon: "mdi-chart-histogram",
                subtitle: undefined,
                title: "Budget Entry",
                to: "/management-module/budget-entry",
              },
              {
                href: "#",
                icon: "mdi-flip-to-back",
                subtitle: undefined,
                title: "Expenditure Entry",
                to: "/management-module/expenditure-entry",
              },
              {
                href: "#",
                icon: "mdi-share",
                subtitle: undefined,
                title: "Report",
                to: "/management-module/ais1-report",
              },
              {
                href: "#",
                icon: "mdi-shape-square-plus",
                subtitle: undefined,
                title: "AIS Sub Component",
                to: "/management-module/ais-sub-components",
              },
              {
                href: "#",
                icon: "mdi-screen-rotation",
                subtitle: undefined,
                title: "AIS Task Activity",
                to: "/management-module/ais-task-activity",
              },
              {
                href: "#",
                icon: "mdi-locker",
                subtitle: undefined,
                title: "Budget Year",
                to: "/management-module/budget-year",
              },
              {
                href: "#",
                icon: "mdi-pine-tree",
                subtitle: undefined,
                title: "Budget Balance Ratio",
                to: "/management-module/budget-balance-ratio",
              },
            ],
          },

          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "AIS-2",
            children: [
              {
                href: "#",
                icon: "mdi-feather",
                subtitle: undefined,
                title: "Changes of Fund Statement",
                to: "/management-module/ais2-soe",
              },
              {
                href: "#",
                icon: "mdi-wallet-travel",
                subtitle: undefined,
                title: "SOE Form Generator",
                to: "/management-module/soe-form-generate",
              },
            ],
          },

          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "AIS-3",
            children: [
              {
                href: "#",
                icon: "mdi-cached",
                subtitle: undefined,
                title: "Profit or Loss",
                to: "/management-module/loss-profit",
              },
              {
                href: "#",
                icon: "mdi-leaf",
                subtitle: undefined,
                title: "Form Particular",
                to: "/management-module/ais/form-particular",
              },
            ],
          },
          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "AIS-4",
            children: [
              {
                href: "#",
                icon: "mdi-radar",
                subtitle: undefined,
                title: "Financial Position",
                to: "/management-module/financial-position",
              },
            ],
          },
          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "Environment Practice Tracker",
            children: [
              {
                href: "#",
                icon: "mdi-delta",
                subtitle: undefined,
                title: "Achievement/Continue",
                to: "/management-module/achievement-continue",
              },
              {
                href: "#",
                icon: "mdi-trending-neutral",
                subtitle: undefined,
                title: "Report",
                to: "/management-module/environment/report",
              },
            ],
          },
          {
            href: "#",
            icon: "mdi-developer-board",
            subtitle: undefined,
            title: "Environmental",
            to: "/management-module/environmental",
          },
          {
            href: "#",
            icon: "mdi-hockey-sticks",
            subtitle: undefined,
            title: "Top Sheet",
            to: "/management-module/top-sheet",
          },
          {
            href: "#",
            icon: "mdi-pickaxe",
            subtitle: undefined,
            title: "Tribal",
            to: "/management-module/tribal-list",
          },
          {
            href: "#",
            icon: "mdi-menu-down",
            subtitle: undefined,
            title: "Grievance",
            children: [
              {
                href: "#",
                icon: "mdi-panorama-vertical",
                subtitle: undefined,
                title: "Field Grievance",
                to: "/management-module/grievance-field-list",
              },
              {
                href: "#",
                icon: "mdi-attachment",
                subtitle: undefined,
                title: "Compiled Grievance",
                to: "/management-module/grievance-compiled-list",
              },
            ],
          },
          {
            href: "#",
            icon: "mdi-codepen",
            subtitle: undefined,
            title: "Common Service",
            to: "/management-module/common-service",
          },
          {
            href: "#",
            icon: "mdi-arrange-bring-to-front",
            subtitle: undefined,
            title: "Result Framework",
            to: "/management-module/result-framework",
          },
        ],
      },
    ],
    PermissinParentUrl: [],
    itemss: [],
    count: 0,
    menus:[],
  }),
 
 beforeMount(){
   //this.menus = this.$store.getters.getmenuList;
 },
  mounted() {
 this.menus = this.$store.state.menuList;
   this.items.filter(this.mapItem);
  },
  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
 
    profile() {
      return {
        avatar: true,
        title: this.$t('PMS'),
      };
    },
    menuList() {
      return this.$store.state.menuList;
      },
    
  },

  created() {
    let moduleLists = JSON.parse(localStorage.getItem("modulelists"));
    let parentLists = JSON.parse(localStorage.getItem("parenturls"));
    this.PermissinParentUrl = parentLists.map(
      (item) => item.url_name.split("/")[item.url_name.split("/").length - 1]
    );
    
    this.modules = moduleLists.map((item) => item.name);
  

  },
  methods: {
    collapseSubItems() {
    
      this.nav.map((item) => (item.active = true));
    },
    mapItem(item) {
    
      if (this.modules.includes(item["group"])) {
       
        const obj = {
          avatar: item.avatar,
          group: item.group,
          icon: item.icon,
          title: item.title,
          children: [],
        };

        item.children.map((item1, key) => {
          if (item1.children) {
            var nextchild = [];

            item1.children.map((item2, key2) => {
              var totitle2 =
              item2.to.split("/")[item2.to.split("/").length - 1];
           

              if (this.PermissinParentUrl.includes(totitle2)) {
               
                nextchild.push({
                  href: item2.href,
                  icon: item2.icon,
                  subtitle: item2.subtitle,
                  title: item2.title,
                  to: item2.to,
                });
                
              }

            });
            if (nextchild.length > 0) {
              obj.children.push({
                href: "#",
                icon: "mdi-menu-down",
                subtitle: undefined,
                title: item1.title,
                children: [nextchild],
              });
            }

          } else {
            if (item1.to) {
              var len = item1.to.split("/").length;
              var totitle = item1.to.split("/")[len - 1];
            }
            if (this.PermissinParentUrl.includes(totitle)) {
              obj.children.push({
                href: item1.href,
                icon: item1.icon,
                subtitle: item1.subtitle,
                title: item1.title,
                to: item1.to,
              });
            }
          }

        });

        this.itemss.push(obj);
        

        this.count++;
        return obj;

      }
    
    },
  },
};
</script>
<style scoped>
.v-list-group,
.v-list-item {
  color: #000 !important;
  border-bottom: 1px solid #1a5f30;
  border-radius: unset;
}
</style>
<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'


#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
