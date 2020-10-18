<template>
    <v-col class="pa-0" v-if="object">
        <div v-if="model.info.itemTitle" class="text-h4 font-weight-bold px-3 px-md-5 py-0 my-3">
            {{model.info.itemTitle}}
        </div>
        <template-item-actions
                :id="object.id"
                @create="create()"
                @update="update()"
                @delete="destroy()"
        />
        <v-divider class="my-1"/>
        <v-layout
                class="ma-0 px-3 px-md-5 py-3"
                column
        >
            <v-form v-model="$store.state.form">
                <slot :object="object" :rules="rules"></slot>
            </v-form>
        </v-layout>
    </v-col>
</template>

<script>
    import rules from '../../vendor/rules'

    export default {
        name: 'TemplateItem',

        mixins: [rules],

        props: {
            model: Object,

            backOnAction: {
                type: Boolean,
                default: true
            },

            routeBackOnAction: {
                type: String,
                default: null
            },

            fluid: {
                type: Boolean,
                default: false
            },
            title: String
        },

        computed: {
            object() {
                return this.model.item
            }
        },

        methods: {
            create() {
                this.model.create().then(value => {
                    let params = {}
                    params[`${this.model.name}Id`] = this.object.id
                    this.$router.push({
                        name: `${this.model.name}Item`,
                        params: params
                    })
                    this.$store.commit('setSnackbar', {color: 'success', text: 'Сохранено'})
                }).catch(err => {
                    this.$store.commit('setSnackbar', {color: 'red', text: 'Ошибка создания'})
                })
            },

            update() {
                this.model.update().then(() => {
                    this.$store.commit('setSnackbar', {color: 'success', text: 'Сохранено'})
                }).catch(err => {
                    this.$store.commit('setSnackbar', {color: 'red', text: 'Ошибка обновления'})
                })
            },

            destroy() {
                this.model.destroy().then(() => {
                    this.model.deleteById(this.object.id)
                    this.$router.push({name: `${this.model.name}List`})
                }).catch(err => {
                    this.$store.commit('setSnackbar', {color: 'red', text: 'Ошибка удаления'})
                })
            },
        },
        created() {

        }
    }
</script>
