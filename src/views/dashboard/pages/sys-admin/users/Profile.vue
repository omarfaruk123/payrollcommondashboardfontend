<template>
  <div id="changepassword">
    <v-container class="my-4" style="min-height: 380px">
      <v-row justify="center">
        <v-col cols="3" md="3" style="background: #eee">
          <v-img
            style="border-radius: 50%; margin: 10px 0px"
            cover
            :src="asset_url + '/' + userImage"
          >
          </v-img>
        </v-col>
        <v-col cols="9" md="9" class="pt-0">
          <v-card outlined class="pt-0 mt-0">
            <v-simple-table class="elevation-1">
              <template v-slot:default>
                <thead>
                  <tr style="background-color: #e2e2e2">
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Name
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Email
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Role Group
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Role
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Mobile
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      PO Name
                    </th>
                    <th
                      class="text-left customvcardtitle subtitle-1 font-weight-bold"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in userProfile"
                    :key="index"
                    style="background: #eeeeee"
                  >
                    <td width="10%">{{ item.name }}</td>
                    <td width="10%">{{ item.email }}</td>
                    <td style="width: 125px">
                      {{ item.role_group ? item.role_group.name : "" }}
                    </td>
                    <td
                      v-if="item.role_group"
                      style="width: 150px"
                      class="text-center"
                    >
                      <span
                        v-for="(role, ind) in item.role_group.roles"
                        :key="ind"
                      >
                        <v-chip>{{ role.name }}</v-chip>
                      </span>
                    </td>
                    <td v-else></td>
                    <td class="text-center">{{ item.phone }}</td>
                    <td width="25%">
                      {{
                        item.po_details ? item.po_details.po_name_en : "PKSF"
                      }}
                    </td>
                    <td>
                      <v-chip>{{ item.status }}</v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ApiService from "/src/services/ApiService.js";
export default {
  name: "Profile",
  data: () => ({
    userId: null,
    userProfile: null,
    asset_url: process.env.VUE_APP_API_BASE_URL,
    userImage: "user/userpic.png",
  }),

  mounted() {
    this.getUserProfileInfo();
    this.setHeaders();
  },

  methods: {
    getUserProfileInfo() {
      let user_infos = JSON.parse(localStorage.getItem("user"));
      this.userId = user_infos.id;
      ApiService.get("api/user-profile/" + this.userId)
        .then((res) => {
          this.userProfile = res.data.data;
          if (this.userProfile[0].image) {
            this.userImage = this.userProfile[0].image;
          }
        })
        .catch((error) => {});
    },
    setHeaders() {
      this.headers = [
        {
          text: this.$t("userList.name"),
          align: "left",
          sortable: true,
          value: "name",
        },
        {
          text: this.$t("Role Group"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("Role List"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("userList.phone"),
          align: "left",
          sortable: true,
          value: "phone",
        },
        {
          text: this.$t("userList.poName"),
          align: "left",
          sortable: true,
          value: "",
        },
        {
          text: this.$t("userList.status"),
          align: "left",
          sortable: true,
          value: "",
        },
      ];
    },
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
          console.log(error);
          // console.log(error.response.data.errors);
        });
    },
  },
};
</script>
