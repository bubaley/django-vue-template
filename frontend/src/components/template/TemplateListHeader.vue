<template>
    <v-col class="px-3 px-md-5 py-0" slot="header" v-if="model.info">
        <div class="text-h4 font-weight-bold mt-3" v-if="model.info.listTitle">{{model.info.listTitle}}</div>
        <div class="caption mt-1" v-if="model.info.listDescription">{{model.info.listDescription}}</div>
    </v-col>
</template>

<script>
    export default {
        name: "TemplateListHeader",
        components: {},
        props: {
            model: Object
        },
        data: () => ({}),
        methods: {},
        computed: {},

    }
</script>

<style scoped>

</style>