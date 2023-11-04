<template>
  <div>
      <h1>API test box</h1>
  </div>
</template>

<script>
export default {
  name: "TestApi",
  data: () => ({
    formData    : {
      name: 'ajhjh',
      name_bn: 'ajhjh',
      code: '11',
      remark: 'hhh'
    },
    editedItemId: ''
  }),
  mounted() {
    this.saveCreateForm()
  },
  methods: {
    getModuListList() {
      ApiService.get('api/product-component')
        .then((res) => {
          this.moduleList = res.data.data
        })
    },
    async saveCreateForm() {
      const apiResponse = await ApiService.post('api/product-component', this.formData)
      if (apiResponse.status == 200) {
      }
    },
    async saveUpdateForm() {
      const apiResponse = await ApiService.update('api/url/' + this.editedItemId, this.formData)
      if (apiResponse.status == 200) {
      }

    },
  }
}
</script>

<style scoped>

</style>
