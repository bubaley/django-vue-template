<template>
    <cool-light-box
            :items="items"
            :index="index"
            useZoomBar
            loop
            @close="index = null">
    </cool-light-box>
</template>

<script>
    // if you want use this component install vue-cool-lightbox
    // this component work on eventBus events and with component ImageList
    // add ImageList in your app and use events to show images

    import { eventBus } from '../../main'
    import CoolLightBox from 'vue-cool-lightbox'
    import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

    export default {
        name: "LightBox",
        components: {
            CoolLightBox
        },
        data: () => ({
            images: [],
            index: null
        }),
        created() {
            eventBus.$on('setImages', images => {
                this.images = images
            })
            eventBus.$on('setIndex', (index) => {
                this.index = index
            })
        },
        computed: {
            items() {
                return this.images.map(value => value.image)
            }
        }
    }
</script>

<style scoped>

</style>