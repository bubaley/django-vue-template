<template>
    <v-app>
        <v-app-bar app color="primary" dark/>

        <v-content>
            <router-view></router-view>
        </v-content>

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

        data: () => ({
            kek: false,
        }),
        created() {
            this.$store.dispatch('getUser').then(() => {
            }).catch(() => {
                this.$router.push({
                    name: 'login'
                }).catch(e => {
                })
            })
        },
        methods: {}
    };
</script>
