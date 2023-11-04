export default {
  data() {
    return {}
  },
  methods: {
    setLocalEditData(data) {
      console.log(data)
      localStorage.removeItem('editdata')
      localStorage.setItem('editdata', JSON.stringify(data))
    },
    removeLocalEditData() {
      localStorage.removeItem('editdata')
    },
    getEditData() {
      return localStorage.getItem('editdata')
    },
    isEdit() {
      if (localStorage.getItem('editdata')) {
        return true
      } else {
        return false
      }
    }
  }
}
