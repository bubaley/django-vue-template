<template>
    <v-layout class="ma-0" align-center fill-height>
        <v-flex xs10 md4 offset-md4 offset-xs1>
            <v-card>
                <v-alert text tile border="top" color="error" class="ma-0" v-if="errors.length > 0">
                    <v-layout column class="ma-0">
                        <div class="body-2" v-for="(el, index) in errors" :key="index">{{el}}</div>
                    </v-layout>
                </v-alert>
                <v-layout column class="ma-0 pa-3">
                    <div class="title font-weight-bold">Регистрация</div>
                    <v-form ref="form" v-model="form"
                    >
                        <v-text-field ref="username" dense :rules="[rules.required, rules.login]" outlined
                                      class="mt-5"
                                      label="Логин"
                                      v-model="username"></v-text-field>
                        <v-text-field ref="email" type="email" :rules="[rules.required, rules.email]" dense outlined
                                      label="Почта"
                                      v-model="email"></v-text-field>
                        <v-text-field ref="password" :rules="[rules.required, rules.password, rules.minLen(8)]"
                                      dense
                                      outlined
                                      label="Пароль" type="password"
                                      v-model="password"></v-text-field>
                        <v-text-field
                                outlined
                                dense
                                v-model="password_confirmation"
                                label="Подтвердите пароль"
                                type="password"
                                :rules="[rules.required, rules.passwordMatch(password)]"
                        />
                        <v-layout class="ma-0">
                            <v-btn :disabled="!form" depressed class="text-none" color="primary" :loading="loading"
                                   @click="register">
                                Регистрация
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="text-none" text @click="$router.push({'name': 'login'})">Войти</v-btn>
                        </v-layout>
                    </v-form>
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
            password_confirmation: '',
            email: '',
            form: false,
            loading: false,
            errors: [],
            rules: {
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Некорректный e-mail';
                },
                login: (value) => {
                    const pattern = /^[A-Za-z0-9]{3,15}$/;
                    return pattern.test(value) || 'Только латинские буквы и цифры, от 3 до 15 символов';
                },
                password: (value) => {
                    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{2,}$/;
                    return pattern.test(value) || 'Пароль должен содержать только буквы и цифры';
                },
                passwordMatch: (p) => (v) => (v || '') === p || 'Пароли должны совпадать',
                phone: (v) => v.length === 0 || (v.length === 12 && v.includes('+79')) || 'Номер введен некорректно',
                required: (value) => !!value || 'Поле обязательно для заполнения',
                minLen: (p) => (v) => v.length >= p || `Минимальная длина ${p}`,
            },
        }),
        methods: {
            register() {
                this.loading = true
                this.$store.dispatch('register', {
                    username: this.username,
                    password: this.password,
                    email: this.email
                }).then((response) => {
                    this.loading = false
                    this.$router.push({
                        name: 'home'
                    })
                    this.errors = []
                }).catch(e => {
                    let errors = []
                    for (let i in e.data) {
                        e.data[i].forEach(value => errors.push(this.$refs[i].label + ' - ' + value))
                    }
                    this.errors = errors
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>