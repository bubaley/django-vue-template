<template>
    <template-item :model="$store.state.items.user" v-slot="{object}">
        <v-text-field label="Логин" v-model="object.username"></v-text-field>
        <v-text-field label="Почта" v-model="object.email"></v-text-field>
        <v-text-field label="Имя" v-model="object.first_name"></v-text-field>
        <v-text-field label="Фамилия" v-model="object.last_name"></v-text-field>
        <v-text-field label="Пароль" v-model="object.password"></v-text-field>
    </template-item>
</template>

<script>
    export default {
        name: "User",
        components: {},
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>