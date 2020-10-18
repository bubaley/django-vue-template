<template>
    <template-list virtual-list :component="UserListElement" :model="$store.state.items.user">
        <template v-slot="{object}">
            {{object.username}}
        </template>
    </template-list>
</template>

<script>
    import UserListElement from '../components/UserListElement'

    export default {
        name: "Users",
        components: {},
        data: () => ({
            UserListElement
        }),
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>