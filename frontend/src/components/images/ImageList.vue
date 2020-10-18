<template>
    <v-layout column class="ma-0">
        <v-layout class="ma-0" row wrap>
            <v-flex v-ripple style="cursor: pointer" xs12 md6 v-for="(image, i) in values" :key="i">
                <v-img @click="openImage(i)" :src="image[prop]" contain></v-img>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    // read LightBox
    import { eventBus } from '../../main'

    export default {
        name: "ImageList",
        props: {
            values: Array,
            prop: {
                type: String,
                default: 'image'
            }
        },
        methods: {
            openImage(i) {
                eventBus.$emit('setImages', this.values)
                eventBus.$emit('setIndex', i)
            },
        },

    }
</script>

<style scoped>

</style>