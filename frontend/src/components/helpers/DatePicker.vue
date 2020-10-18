<template>
    <v-layout column class="ma-0">
        <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="formatedDate"
                        persistent-hint
                        :label="title"
                        :hide-details="hideDetails"
                        :style="'max-width: ' + width"
                        :dense="dense"
                        :outlined="outlined"
                        v-on="on"
                        class="font-weight-light body-2 pa-0"
                        readonly
                >
                    <v-icon slot="prepend-inner" class="mt-1" v-if="prependIcon" :size="20">{{prependIcon}}</v-icon>
                </v-text-field>
            </template>
            <v-date-picker @change="$emit('change')" :min="min" :max="max" :range="range" locale="ru-RU" :value="value" no-title :first-day-of-week='1'
                           @input="updateData"></v-date-picker>
        </v-menu>
    </v-layout>
</template>

<script>
    import datetime from "../vendor/datetime";

    export default {
        mixins: [
            datetime
        ],
        props: {
            width: {
                type: String,
                default: '100%'
            },
            value: [String, Array],
            title: String,
            prependIcon: {
                type: String,
                default: 'event'
            },
            hideDetails: {
                type: Boolean,
                default: true
            },
            outlined: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true
            },
            range: Boolean,
            min: String,
            max: String
        },
        name: "DatePickerComponent",

        data() {
            return {
                menu: false
            }
        },
        methods: {
            formatDate(date) {
                if (!date) return null;
                date = date.split(' ');
                return this.calendarDate(date[0])
            },
            updateData(val) {
                if (!this.range)
                    this.menu = false;
                if (val.length === 2) {
                    if (val[0] > val[1])
                        val = [val[1], val[0]]
                    this.menu = false
                }
                this.$emit('input', val)
            },
        },
        computed: {
            formatedDate() {
                if (this.range) {
                    let startDate = this.value[0]
                    let endDate = this.value[1] || startDate
                    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`
                } else
                    return this.formatDate(this.value)
            }
        },
        watch: {
            menu(val) {
                if (!val) {
                    if (this.value.length === 1)
                        this.$emit('input', [this.value[0], this.value[0]])
                }
            }
        }
    }
</script>

<style scoped>

</style>
