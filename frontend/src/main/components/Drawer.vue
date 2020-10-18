<template>
    <v-navigation-drawer app v-model="$store.state.drawer" clipped>
        <v-list dense>
            <v-subheader>Наивгация</v-subheader>
            <v-list-item-group
                    color="primary"
            >
                <v-list-item :to="{name: 'userList'}">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Пользователи</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        components: {},
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>