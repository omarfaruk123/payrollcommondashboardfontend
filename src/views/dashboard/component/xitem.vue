
<template id='x-item'>
  <div class='x-item'>
    <label>
      <input
        type='checkbox'
        :checked='item.checked'
        @change='onChange($event.target.checked)'>
      <span>{{ item.name }}</span>
    </label>
    <template v-if='item.children'>
      <xitem
        v-for='item  in item.children' :key="item.id"
        ref='children'
        :item='item'
        @change='onChildChange'>
      </xitem>
    </template>
  </div>
</template>

<script>
export default {
    name: 'xitem',
    props: ['item'],
   
    methods: {
    onChange(checked) {
      this.item.checked = checked
      this.updateParent()
      this.updateChildren(checked)
    },
    onChildChange() {
      this.item.checked = this.$refs.children.every(child => child.item.checked)
      this.updateParent()
    },
    updateParent() {
      this.$emit('change')
    },
    updateChildren(checked) {
      if (this.item.children) {
        this.$refs.children.forEach(child => {
          child.item.checked = checked
          child.updateChildren(checked)
        })
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.x-item {
  padding-left: 30px;
}
</style>
