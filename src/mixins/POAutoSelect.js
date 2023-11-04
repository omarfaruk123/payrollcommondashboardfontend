export default {
  data() {
    return {
      validated: 0,
      setPoId: '',
    }
  },
  mounted() {
    this.getCurrentPO();
  },
  methods: {
    getCurrentPO() {
      let poinfo;
      poinfo = JSON.parse(localStorage.getItem("user"));

      if (poinfo.po_details_id && poinfo.po_details_id != 1) {
        this.getBranchName(poinfo.po_details_id);
        this.setPoId = poinfo.po_details_id;
        this.validated = 1;
      }
    },

  }
}
