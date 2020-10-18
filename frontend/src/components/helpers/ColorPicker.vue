<template>
    <v-row no-gutters>
        <v-menu
                v-model="menu"
                :close-on-content-click="false"
                min-width="250"
                nudge-bottom="10"
                offset-y>
            <template v-slot:activator="{ on }">
                <div v-on="on" style="cursor: pointer">
                    <v-row no-gutters>
                        <v-icon size="20" :color="value">mdi-circle</v-icon>
                        <div class="mx-2">{{label}}</div>
                    </v-row>
                </div>
            </template>

            <v-card>
                <v-color-picker
                        @input="changeValue"
                        :value="value"
                        hide-inputs
                ></v-color-picker>
            </v-card>
        </v-menu>
    </v-row>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: {
            value: String,
            label: String
        },
        components: {},
        data: () => ({
            menu: false
        }),
        methods: {
            changeValue(value) {
                this.$emit('input', value)
            }
        },
        computed: {}
    }
</script>

<style scoped>

</style>