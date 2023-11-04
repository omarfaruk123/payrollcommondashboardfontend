<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value"> mdi-view-quilt </v-icon>

      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />
    <v-spacer />

    <!--    <v-text-field
          :label="$t('search')"
          color="secondary"
          hide-details
          style="max-width: 165px;"
        >
          <template
            v-if="$vuetify.breakpoint.mdAndUp"
            v-slot:append-outer
          >
            <v-btn
              class="mt-n2"
              elevation="1"
              fab
              small
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>-->

    <div class="mx-3" />

    <!--    <v-btn
          class="ml-2"
          min-width="0"
          text
          to="/"
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>-->

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2 white--text"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <span>{{ user_name }}</span>
          <v-icon> mdi-account</v-icon>
        </v-btn>

      
      </template>

      <v-list :tile="false" nav>
        <div>
          <!-- <app-bar-item v-if="user_name">
            <a
              href="javascript:void(0)"
              class="black--text text-decoration-none"
            >
              {{ user_name }}
            </a>
          </app-bar-item> -->
          <app-bar-item>
            <v-list-item-title
              @click="$router.push({ path: `/system-admin/users/profile` })"
              class="black--text text-decoration-none"
              >Profile</v-list-item-title
            >
            <!-- <a
              href="javascript:void(0)"
              @click="$router.push({ path: `/system-admin/users/profile` })"
              class="black--text text-decoration-none text-center w-100"
              >Profile
            </a> -->
            <!--<router-link class="active" to="/system-admin/users/profile" exact
              >Pro</router-link
            >-->
          </app-bar-item>
          <app-bar-item>
            <v-list-item-title
              @click="logout"
              class="black--text text-decoration-none"
              >Logout</v-list-item-title
            >
            <!-- <a
              href="javascript:void(0)"
              @click="logout"
              class="black--text text-decoration-none"
              >Logout
            </a> -->
          </app-bar-item>
          <app-bar-item>
            <v-list-item-title
              @click="$router.push({ path: `/change-password` })"
              class="black--text text-decoration-none"
              >Change Password</v-list-item-title
            >
            <!-- <a
              href="javascript:void(0)"
              @click="$router.push({ path: `/change-password` })"
              class="black--text text-decoration-none"
              >Change Password
            </a> -->
          </app-bar-item>

          <!-- <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title @click="`${n}`"  v-text="n"/>
          </app-bar-item> -->
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";
import axios from "axios";
import ApiService from "@/services/ApiService";
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: ["profile", "sign_out"],
    po_detail_id: null,
    user_name: "",
  }),

  computed: {
    ...mapState(["drawer"]),
  },

  mounted() {
    let user_infos = JSON.parse(localStorage.getItem("user"));
   
    this.user_name = user_infos.user_name;
    
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  
    logout() {
      ApiService.post("api/logout")
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "You are Successfully Logout",
          });
          localStorage.removeItem("token");
          localStorage.removeItem("editData");
          localStorage.removeItem("user");
          localStorage.removeItem("permissions");
          localStorage.removeItem("parenturls");
          localStorage.removeItem("modulelists");
          this.$store.dispatch("user", null);
          this.$store.dispatch("parenturls", null);
          this.$router.push("/login");
        })
        .catch((error) => {
          
          // console.log(error.response.data.errors);
        });
    },
  },
};
</script>
