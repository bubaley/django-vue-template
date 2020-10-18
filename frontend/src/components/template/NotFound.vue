<template>
    <v-row no-gutters class="fill-height d-flex flex-column" align="center" justify="center">
        <div class="text-h2 font-weight-medium">404</div>
        <div class="text-h5 mt-2 text-center">Страница не найдена</div>
        <v-btn text class="mt-2" :to="{name: 'home'}">Вернуться на главную</v-btn>
    </v-row>
</template>

<script>
    export default {
        name: "404",
        components: {},
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>