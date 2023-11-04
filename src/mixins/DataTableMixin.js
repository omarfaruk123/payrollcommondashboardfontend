import ApiService from "../services/ApiService";

export default {
  data() {
    return {
      serialNumber: 0,
      sort: "",
      queryData: {
        sortBy: "id",
        sortDesc: true,
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        search_val: "",
        formdata: null
      },
      search: "",
      totalItems: 0,
      desserts: [],
      loading: true,
      pagination: {},
      self: this,
      headers: [],
    }
  },
  computed: {
    params(nv) {
      return {
        ...this.pagination,
        query: this.search
      };
    },
  },
  methods: {
    getDataFromApi(url = '', formdatas = null) {

      let loader = this.$loading.show();
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.pagination;
        let search = this.search.trim().toLowerCase();

        let query_Data = this.queryData;

        (query_Data.sortBy = this.pagination.sortBy),
          (query_Data.sortDesc = this.pagination.sortDesc),
          (query_Data.page = this.pagination.page),
          (query_Data.itemsPerPage = this.pagination.itemsPerPage),
          (query_Data.search_val = this.search);
        (query_Data.formdata = formdatas);

        const serialNumber =
          this.pagination.itemsPerPage * this.pagination.page -
          this.pagination.itemsPerPage;
        this.serialNumber = serialNumber + 1;

        ApiService.get(url, {
          params: {
            query_Data
          }
        })
          .then(res => {
            // this.users = res.data.data.data;
            // this.totalItems=res.data.data.totalRecords;
            let items = res.data.data.data;
            const total = res.data.data.totalRecords;
            this.queryData.totalItems = res.data.data.totalRecords;
            this.totalItems = res.data.data.totalRecords;

            // if (search) {
            //   console.log(search);
            //   console.log('serach');
            //   items = items.filter(item => {
            //     return Object.values(item)
            //       .join(",")
            //       .toLowerCase()
            //       .includes(search);
            //   });
            // }

            loader.hide()
            setTimeout(() => {
              this.loading = false;
              resolve({
                items,
                total
              });
            }, 300);
          })
          .catch(errors => {
            loader.hide()
            Toast.fire({
              icon: 'error',
              title: errors
            })
          })
      });
    },
  }

}
