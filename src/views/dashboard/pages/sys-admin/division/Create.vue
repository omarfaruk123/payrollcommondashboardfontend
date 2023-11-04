<template>
    <v-card outlined class="pt-0 mt-0">
        <v-card-title class="component-title">
            <div class="clearfix">
                <div class="title-left">
                    <h4 class="title-text">
                        {{ !isEdit ? $t('createDivision.divisionCreate') : $t('createDivision.divisionEdit') }}
                    </h4>
                </div>
            </div>
        </v-card-title>
        <v-card-text class="mt-5">
            <v-form>
                <v-container class="py-0">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field class="purple-input" outlined dense hide-details v-model="divisionForm.name">
                                <template #label>
                                    {{ $t('createDivision.name') }} <span class="red--text"><strong>* </strong></span>
                                </template>
                            </v-text-field>
                            <p v-if="$v.divisionForm.name.$error" class="red--text">This field is required</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field class="purple-input" outlined dense hide-details
                                v-model="divisionForm.bn_name">
                                <template #label>
                                    {{ $t('createDivision.bn_name') }} <span class="red--text"><strong>*
                                        </strong></span>
                                </template>
                            </v-text-field>
                            <p v-if="$v.divisionForm.bn_name.$error" class="red--text">This field is required</p>
                        </v-col>
                        <v-col cols="12" class="text-right">
                            <v-btn color="#1b6030" class="mr-0" @click="submitForm">
                                {{ isEdit ? $t("update") : $t("save") }}
                            </v-btn>
                            <v-btn color="#1b6030" class="mr-0 hidden-lg-and-down" id="resetValidation"
                                @click="$v.divisionForm.$reset">
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
        divisionForm: {
            name: '',
            bn_name: '',
        },
        isEdit: false,
        editedItem: {}
    }),
    mounted() {
    },
    methods: {
        setEditData(item) {
            this.isEdit = true
            this.editedItem = item
            this.divisionForm.name = item.name;
            this.divisionForm.bn_name = item.bn_name;
        },
        submitForm() {
            this.$v.divisionForm.$touch()
            if (!this.$v.divisionForm.$error) {
                if (this.isEdit) {
                    this.saveUpdateForm()
                } else {
                    this.saveCreateForm()
                }
            }
        },
        saveCreateForm() {
            ApiService.post('api/division', this.divisionForm)
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
            ApiService.update('api/division/' + this.editedItem.id, this.divisionForm)
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
            this.divisionForm = {
                name: '',
                bn_name: '',

            }
            document.getElementById("resetValidation").click();
        }
    },
    validations() {
        const validations = {
            divisionForm: {
                name: {
                    required
                },
                bn_name: {
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
