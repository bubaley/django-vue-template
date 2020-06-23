<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
        <snackbar/>
    </v-app>
</template>

<script>
    import Snackbar from "./components/Snackbar";

    export default {
        name: 'App',
        components: {
            Snackbar
        },

        data: () => ({}),
        created() {

        },
        methods: {}
    };
</script>

<style>
    a {
        text-decoration: none;
    }

    .v-text-field--outlined fieldset {
        border: 1px solid !important;
    }
</style>
