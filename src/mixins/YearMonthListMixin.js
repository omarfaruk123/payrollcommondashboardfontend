import moment from "moment";

export default {
  data: () => ({
    years: {},
    months: {},
  }),
  mounted() {
    this.dropdownYears();
    this.dropdownMonths();
  },
  methods: {
    dropdownYears() {
      var current = moment().format('YYYY');
      current = Number(current);
      var begin = current - 20;
      var end = current + 20;
      var all = [];
      for (begin; begin <= end; begin++) {
        all.push({ id: begin, name: begin });
      }
      this.years = { current, all };
    },
    dropdownMonths() {
      var current = moment().format('M');
      current = parseInt(current);
      var all = [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" }
      ];
      this.months = { current, all };
    },
    mix_get_month(no = 1) {
      let newMonth = (typeof no !== 'number') ? parseInt(no) : no;
      newMonth = newMonth >= 1 ? (newMonth - 1) : 0;
      return moment().startOf('year').add(newMonth, 'M').format('MMMM');
    }
  }
}
