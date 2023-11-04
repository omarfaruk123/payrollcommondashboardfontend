<template>
  <v-row>
    <v-col
      cols="12"
      md="5"
    >

      <v-autocomplete
        :items=promiseList
        item-text="name"
        item-value="id"
        :label="$t('Promised')"
       
        outlined
        dense

      ></v-autocomplete>

    </v-col>

    <v-col
      cols="12"
      md="5"
    >
      <v-autocomplete
        :items=promiseList
        item-text="name_bn"
        item-value="id"
        :label="$t('Promised')"
       
        outlined
        dense

      ></v-autocomplete>

    </v-col>
    <v-col
      cols="12"
      md="2"
    >
      <v-btn
      
        class="mx-2"
        fab
        dark
        x-small
        color="red"
       
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>

      <v-btn 
             class="mx-2"
             fab
             dark
             x-small
             color="green"
             
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:['promiseList','promiseForm'],
  name: "promised",

}
</script>

<style scoped>

</style>
