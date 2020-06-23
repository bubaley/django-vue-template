<template>
    <v-snackbar
            v-model="$store.getters.snackbar.value"
            top
            right
            :color="$store.getters.snackbar.color"
            multi-line
            :timeout="2000"
    >
        {{ $store.getters.snackbar.text }}
        <v-btn
                small
                icon
                dark
                @click="$store.getters.snackbar.value = false"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar"
    }
</script>

<style scoped>

</style>