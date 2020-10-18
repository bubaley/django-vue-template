<template>
    <virtual-list
            v-if="virtualList"
            data-key="id"
            :keeps="30"
            page-mode
            :data-sources="model.list"
            :data-component="component"
            :estimate-size="70"
            @tobottom="onScrollToBottom"
    >
        <template v-slot:header>
            <template-list-header :model="model"></template-list-header>
            <template-list-actions :model="model" :show-create-button="showCreateButton"></template-list-actions>
        </template>
    </virtual-list>
    <v-col class="pa-0" v-else>
        <template-list-header :model="model"></template-list-header>
        <template-list-actions :model="model" :show-create-button="showCreateButton"></template-list-actions>
        <v-col class="pa-0">
            <template-list-element :model="$store.state.items.user"
                                   :first="!index"
                                   :last="index === $store.state.items.user.list.length - 1"
                                   v-for="(obj, index) in $store.state.items.user.list"
                                   :object="obj"
            >
                <template v-slot="{object}">
                    <slot v-bind:object="object"></slot>
                </template>
            </template-list-element>
            <v-layout
                    v-if="list.length === 0 && !queryLoading"
                    class="ma-0 pa-2"
                    justify-center
            >
                <div class="subtitle-1 secondary--text">Ничего не найдено</div>
            </v-layout>
        </v-col>
        <v-pagination
                class="pb-3"
                v-if="model.pagination && list.length > 0 && model.pagination.last_page > 1"
                :length="model.pagination.last_page"
                :total-visible="7"
                @input="loadList"
                color="primary"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                v-model="model.pagination.page"
        />
    </v-col>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'TemplateList',

        props: {
            model: Object,

            fluid: {
                type: Boolean,
                default: false
            },
            title: String,
            description: String,
            virtualList: Boolean,
            component: Object
        },

        data: () => ({
            showSearch: false,
            showCreateButton: true,
            timeout: null,
        }),

        computed: {
            ...mapState({
                queryLoading: state => state.helpers.queryLoading,
            }),

            list() {
                return this.model.list
            },

            search() {
                return this.model.search
            }
        },

        methods: {
            loadList() {
                this.model.loadList()
            },
            onScrollToBottom() {
                // if (this.listLoading)
                //     return
                // if (this.currentPage < this.maxPage) {
                //     this.currentPage++
                //     this.listLoading = true
                //     this.loadList({
                //         page: this.currentPage,
                //     }, true)
                // }

            },
        },

        created() {
            this.loadList()
        },

        watch: {
            showSearch(val) {
                if (val) {
                    this.showCreateButton = this.$vuetify.breakpoint.mdAndUp
                        || (this.$vuetify.breakpoint.smAndDown && !this.showSearch)
                    this.$refs.searchField.focus()
                } else {
                    setTimeout(() => {
                        this.showCreateButton = this.$vuetify.breakpoint.mdAndUp
                            || (this.$vuetify.breakpoint.smAndDown && !this.showSearch);
                    }, 200)
                    this.model.search = ''
                }
            },

            search() {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(this.loadList, 300)
            },
        },
    }
</script>

<style>

</style>
