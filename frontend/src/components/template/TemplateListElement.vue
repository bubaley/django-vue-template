<template>
    <v-row no-gutters class="px-3">
        <v-hover v-slot:default="{ hover }">
            <v-card
                    class="ma-0 mb-3 elevation-1 transition-fast-in-fast-out"
                    width="100%"
                    column
                    :class="hover ? 'grey lighten-4 elevation-2' : ''"
            >
                <router-link
                        :to="{ name: `${model.name}Item`, params: { [`${model.name}Id`]: object.id } }"
                >
                    <v-layout
                            class="ma-0 grey--text text--darken-4"
                            column
                    >
                        <v-layout class="ma-0 pa-3 body-1 font-weight-medium">
                            <slot v-bind:object="object"></slot>
                        </v-layout>
                    </v-layout>
                </router-link>
            </v-card>
        </v-hover>
    </v-row>
</template>

<script>
    export default {
        name: "ListElement",
        components: {},
        props: {
            model: Object,
            object: Object,
            first: Boolean,
            last: Boolean
        },
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>