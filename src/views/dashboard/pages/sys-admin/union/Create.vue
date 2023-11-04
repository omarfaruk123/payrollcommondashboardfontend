<template>
    <v-card outlined class="pt-0 mt-0">
        <v-card-title class="component-title">
            <div class="clearfix">
                <div class="title-left">
                    <h4 class="title-text">
                        {{ !isEdit ? $t('createUnion.unionCreate') : $t('unionList.union') + " Edit" }}
                    </h4>
                </div>
            </div>
        </v-card-title>
        <v-card-text class="mt-5">
            <v-form>
                <v-container class="py-0">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-autocomplete :items="divisionList" item-text="name" item-value="id"
                                :filter="customFilter" outlined dense hide-details v-model="unionForm.division_id"
                                v-on:change="getDistrictList">
                                <template #label>
                                    {{ $t('createUnion.division') }} <span class="red--text"><strong>*
                                        </strong></span>
                                </template>
                            </v-autocomplete>
                            <p v-if="$v.unionForm.division_id.$error" class="red--text">This field is required</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete :items="districtList" item-text="name" item-value="id"
                                :filter="customFilter" outlined dense hide-details v-model="unionForm.district_id"
                                v-on:change="getUpazilaList">
                                <template #label>
                                    {{ $t('createUnion.district') }} <span class="red--text"><strong>*
                                        </strong></span>
                                </template>
                            </v-autocomplete>
                            <p v-if="$v.unionForm.district_id.$error" class="red--text">This field is required</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete :items="upazilaList" item-text="name" item-value="id" :filter="customFilter"
                                outlined dense hide-details v-model="unionForm.upazila_id">
                                <template #label>
                                    {{ $t('createUnion.upazila') }} <span class="red--text"><strong>*
                                        </strong></span>
                                </template>
                            </v-autocomplete>
                            <p v-if="$v.unionForm.upazila_id.$error" class="red--text">This field is required</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field class="purple-input" outlined dense hide-details v-model="unionForm.name">
                                <template #label>
                                    {{ $t('createUnion.name') }} <span class="red--text"><strong>* </strong></span>
                                </template>
                            </v-text-field>
                            <p v-if="$v.unionForm.name.$error" class="red--text">This field is required
                            </p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field class="purple-input" outlined dense hide-details v-model="unionForm.bn_name">
                                <template #label>
                                    {{ $t('createUnion.bn_name') }} <span class="red--text"><strong>*
                                        </strong></span>
                                </template>
                            </v-text-field>
                            <p v-if="$v.unionForm.bn_name.$error" class="red--text">This field is
                                required</p>
                        </v-col>
                        <v-col cols="12" class="text-right">
                            <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                                {{ isEdit ? $t("update") : $t("save") }}
                            </v-btn>
                            <v-btn color="#1b6030" class="mr-0 hidden-lg-and-down" id="resetValidation"
                                @click="$v.unionForm.$reset">
                                reset validation
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import ApiService from "@/services/ApiService";

export default {
    name: "Create",
    mixins: [validationMixin],
    data: () => ({
        unionForm: {
            name: '',
            bn_name: '',
            district_id: '',
            division_id: '',
            upazila_id: '',
        },
        isEdit: false,
        editedItem: {},
        districtList: [],
        divisionList: [],
        upazilaList: []
    }),
    mounted() {
        this.getDivisionList();
    },
    methods: {
        setEditData(item) {
            this.isEdit = true
            this.editedItem = item
            this.unionForm.name = item.name;
            this.unionForm.bn_name = item.bn_name;
            this.unionForm.division_id = item.upazila.district.division_id;
            this.unionForm.district_id = item.upazila.district_id;
            this.unionForm.upazila_id = item.upazila_id;
            this.getDistrictList(item.upazila.district.division_id);
            this.getUpazilaList(item.upazila.district_id);

        },
        submitForm() {
            this.$v.unionForm.$touch()
            if (!this.$v.unionForm.$error) {
                if (this.isEdit) {
                    this.saveUpdateForm()
                } else {
                    this.saveCreateForm()
                }
            }
        },
        getDivisionList() {
            var queryData = {
                'table_name': "divisions",
                'field_name': ["id", "name"],
                'condition': { 'status': 1, 'deleted_at': null }
            };

            ApiService.getDropData("api/common-dropdown", queryData)
                .then((res) => {
                    this.divisionList = res.data;

                })
                .catch((error) => console.log(error));
        },
        getDistrictList(divisionid = null) {
            let division_id;
            if (divisionid) {
                division_id = divisionid;
            } else {
                division_id = this.upazilaForm.division_id;
            }
            var queryData = {
                'table_name': "districts",
                'field_name': ["id", "name"],
                'condition': { 'status': 1, 'deleted_at': null, 'division_id': this.unionForm.division_id }
            };
            ApiService.getDropData("api/common-dropdown", queryData)
                .then((res) => {
                    this.districtList = res.data;

                })
                .catch((error) => console.log(error));
        },

        getUpazilaList(districtid = null) {
            let district_id;
            if (districtid) {
                district_id = districtid;
            } else {
                district_id = this.upazilaForm.district_id;
            }
            var queryData = {
                'table_name': "upazilas",
                'field_name': ["id", "name"],
                'condition': { 'status': 1, 'deleted_at': null, 'district_id': this.unionForm.district_id }
            };
            ApiService.getDropData("api/common-dropdown", queryData)
                .then((res) => {
                    this.upazilaList = res.data;

                })
                .catch((error) => console.log(error));
        },
        customFilter(item, queryText, itemText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.name.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
        },
        saveCreateForm() {
            ApiService.post('api/union', this.unionForm)
                .then((res) => {

                    this.submitFormResponse(res)
                })
                .catch((errors) => {
                    Toast.fire({
                        icon: 'error',
                        title: errors
                    })
                })
        },
        saveUpdateForm() {
            let loader = this.$loading.show();
            ApiService.update('api/union/' + this.editedItem.id, this.unionForm)
                .then((res) => {
                    loader.hide();
                    this.isEdit = false
                    this.submitFormResponse(res)
                })
                .catch((errors) => {
                    Toast.fire({
                        icon: 'error',
                        title: errors
                    })
                })
        },
        submitFormResponse(res) {
            let message = '';
            if (res.data.code == 2003) {
                Object.values(res.data.errors).map((ele) => {
                    ele.map((msg) => {
                        message = message + msg + "<br>"
                    })
                })
                Toast.fire({
                    icon: 'error',
                    title: message
                })
            } else if (res.data.success) {
                Toast.fire({
                    icon: 'success',
                    title: res.data.message
                })
                this.$emit('updated');
                this.emptyForm()
            }

        },
        emptyForm() {
            this.isEdit = false;
            this.editedItem = {};
            this.unionForm = {
                name: '',
                bn_name: '',
                district_id: '',
                division_id: '',
                upazila_id: '',
            }
            document.getElementById("resetValidation").click();
        }
    },
    validations() {
        const validations = {
            unionForm: {
                name: {
                    required
                },
                bn_name: {
                    required
                },
                district_id: {
                    required
                },
                division_id: {
                    required
                },
                upazila_id: {
                    required
                },
            }

        };
        if (!this.isEdit) {

        }

        return validations;

    },
}
</script>


<style scoped>
</style>
