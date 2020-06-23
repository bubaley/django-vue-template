<template>
    <v-layout column class="ma-0">
        <v-app-bar dense app color="primary" dark>
            <div>template</div>
            <v-spacer></v-spacer>
            <div class="mr-3">{{$store.getters.currentUser.username}}</div>
            <v-btn @click="logout" icon><v-icon size="20">mdi-exit-to-app</v-icon></v-btn>
        </v-app-bar>
        <router-view></router-view>
    </v-layout>
</template>

<script>

    export default {
        name: 'Home',
        components: {

        },
        data: () => ({

        }),
        methods: {
            logout() {
                this.$router.push({name: 'login'})
                this.$store.dispatch('logout')

            }
        },
        computed: {

        },
        watch: {

        }
    }
</script>
