<template>
    <v-col class="pa-0 fill-height">
        <drawer></drawer>

        <v-app-bar app clipped-left>
            <v-btn icon @click="$store.state.drawer = !$store.state.drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <router-link :to="{name: 'about'}">
                <div class="mx-3 black--text font-weight-medium">Приложение</div>
            </router-link>
            <v-spacer></v-spacer>
            <div class="mr-3">{{$store.getters.currentUser.username}}</div>
            <v-btn @click="logout" icon>
                <v-icon size="20">mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <router-view></router-view>
    </v-col>
</template>

<script>
    import Drawer from '../components/Drawer'

    export default {
        name: 'Home',
        components: {
            Drawer
        },
        data: () => ({}),
        methods: {
            logout() {
                this.$router.push({name: 'login'})
                this.$store.dispatch('logout')

            }
        },
        computed: {},
        watch: {}
    }
</script>
