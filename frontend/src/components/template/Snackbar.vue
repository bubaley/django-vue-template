<template>
    <v-snackbar
            v-model="$store.getters.snackbar.value"
            top
            right
            :color="$store.getters.snackbar.color"
            :timeout="2000"
    >
        {{ $store.getters.snackbar.text }}
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar"
    }
</script>

<style scoped>

</style>