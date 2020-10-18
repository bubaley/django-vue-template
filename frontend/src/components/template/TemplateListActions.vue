<template>
    <v-col class="pa-0">
        <v-row no-gutters class="py-3 px-3 px-md-5" align="center">
            <v-btn
                    height="40"
                    color="primary"
                    class="elevation-2"
                    v-if="showCreateButton"
                    :to="{ name: `${model.name}Item`, params: { [`${model.name}Id`]: 'new' } }"
            >
                <div class="text-none body-2 px-2">
                    Создать
                </div>
            </v-btn>
            <v-spacer/>

            <search v-model="model.search" v-if="model.configuration.showSearch"></search>
        </v-row>
        <v-divider class="mb-5 mt-2"/>
    </v-col>
</template>

<script>
    export default {
        name: "TemplateListActions",
        props: {
            model: Object,
            showCreateButton: Boolean
        },
        components: {},
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>