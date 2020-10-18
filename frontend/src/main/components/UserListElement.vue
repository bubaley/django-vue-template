<template>
    <template-list-element
            :object="source"
            :model="$store.state.items.user"
    >
        <template v-slot="{object}">
            {{object.username}}
        </template>
    </template-list-element>
</template>

<script>
    export default {
        name: "UserElement",
        props: {
            source: Object
        },
        components: {},
        data: () => ({}),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>