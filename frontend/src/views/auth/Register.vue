<template>
    <v-layout class="ma-0" align-center fill-height>
        <v-flex xs10 md4 offset-md4 offset-xs1>
            <v-card class="pa-3">
                <div class="title font-weight-bold">Регистрация</div>
                <v-text-field dense hide-details outlined class="mt-5" label="Логин" v-model="username"></v-text-field>
                <v-text-field dense hide-details outlined class="mt-5" label="Почта" v-model="email"></v-text-field>
                <v-text-field dense hide-details outlined class="mt-5" label="Пароль" type="password" v-model="password"></v-text-field>
                <v-layout class="ma-0 mt-5">
                    <v-btn class="text-none" color="primary" :loading="loading" @click="register">Регистрация</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text @click="$router.push({'name': 'login'})">Войти</v-btn>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Register",
        data: () => ({
            username: '',
            password: '',
            email: '',
            loading: false,
        }),
        methods: {
            register() {
                this.loading = true
                this.$store.dispatch('register', {
                    credentials: {
                        username: this.username,
                        password: this.password,
                        email: this.email
                    }
                }).then((response) => {
                    this.loading = false
                    this.$router.push({
                        name: 'home'
                    })
                }).catch(e => {
                    this.loading = false
                    this.$store.commit('setSnackbar', {text: "Неверные данные", color: "error"})
                })
            }
        }
    }
</script>

<style scoped>

</style>