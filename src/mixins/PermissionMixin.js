export default {
  data() {
    return {
      listp: false,
      createp: false,
      editp: false,
      viewp: false,
      deletep: false,
    }
  },
  mounted() {
    this.getFeaturePermission();
    this.convertMonthName();
  },

  methods: {
    convertMonthName(month) {
      const date = new Date();
      date.setMonth(month - 1);

      return date.toLocaleString("en-US", {
        month: "long",
      });
    },
    getFeaturePermission() {
      const path = this.$route.path.replace(/^\/|\/$/g, '');

      const featurPermissionList = JSON.parse(localStorage.getItem('permissions')).filter((x) => {
        var url = x.base_name.split('/');
        var fpath = path.split('/');

        //  console.log(url[1]);
        //  console.log(url[2]);
        // //  console.log('url' + url);
        //  console.log('path' + path);

        if (url[2] === fpath[1]) {
          return x;
        }
      });
      //  console.log(featurPermissionList);
      featurPermissionList.filter((y) => {
        if (y.base_name === this.$route.path + '/list') {
          this.listp = true;
        }
        else if (y.base_name === this.$route.path + '/create') {
          this.createp = true;
        }
        else if (y.base_name === this.$route.path + '/edit') {
          this.editp = true;
        }
        else if (y.base_name === this.$route.path + '/view') {
          this.viewp = true;
        }
        else if (y.base_name === this.$route.path + '/delete') {
          this.deletep = true;
        }
      });

    },

  }
}
