<template>
    <v-layout class="ma-0" align-center fill-height>
        <v-flex xs10 md4 offset-md4 offset-xs1>
            <v-card class="pa-3">
                <div class="title font-weight-bold">Авторизация</div>
                <v-text-field dense hide-details outlined class="mt-5" label="Логин"
                              v-model="username"></v-text-field>
                <v-text-field @keyup.enter="login" dense hide-details outlined class="mt-5" label="Пароль"
                              type="password"
                              v-model="password"></v-text-field>
                <v-layout class="ma-0 mt-5">
                    <v-btn :disabled="!username || !password" depressed class="text-none px-7" color="primary"
                           :loading="loading" @click="login">Войти
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="text-none" text @click="$router.push({'name': 'register'})">Регистрация</v-btn>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        name: "Login",
        data: () => ({
            username: '',
            password: '',
            loading: false,
        }),
        methods: {
            login() {
                this.loading = true
                this.$store.dispatch('login', {
                    credentials: {
                        username: this.username,
                        password: this.password
                    }
                }).then(response => {
                    this.loading = false
                    this.$router.push({
                        name: 'welcome'
                    })
                }).catch(e => {
                    this.loading = false
                    this.$store.commit('setSnackbar', {text: "Неверные данные", color: "error"})
                })
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>