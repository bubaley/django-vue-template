<template>
    <v-layout align-center class="ma-0 pa-3" justify-space-between wrap>
        <div class="body-2 text-no-wrap">{{ title }}</div>
        <div class="body-2" :class="{'grey--text': !value, 'font-weight-medium': value}">
            <a v-if="href" :href="href">{{ value || noValueText }}</a>
            <span v-else>{{ value || noValueText }}</span>
        </div>
    </v-layout>
</template>

<script>
    export default {
        name: "TextWrapper",
        props: {
            title: String,
            value: String,
            noValueText: {
                type: String,
                default: 'Не указано'
            },
            href: {
                type: String,
                default: null
            }
        }
    }
</script>

<style scoped>

</style>
