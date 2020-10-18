<template>
    <v-layout class="ma-0 mr-2" style="position: relative" justify-end>
        <v-text-field
                class="project-search-input pa-0"
                append-icon="mdi-close"
                @click:append="clearInput"
                ref="search"
                placeholder="Поиск..."
                @blur="closeInput"
                :style="showInput ? `visibility:visible; opacity:1; max-width: ${maxWidth ? maxWidth : '250'}px; ` : 'max-width: 36px; visibility:hidden; opacity:0;'"
                style="transition: .3s;" dense
                @input="updateValue"
                :value="value"
                hide-details outlined rounded>
        </v-text-field>

        <v-btn height="40px" width="40px" color="primary" style="position: absolute; transition: .3s"
               :style="!showInput ? 'visibility:visible; opacity:1' : 'visibility:hidden; opacity:0;'"
               icon @click="openInput">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

    </v-layout>
</template>

<script>
    export default {
        name: "Search",
        props: {
            value: String,
            maxWidth: [String, Number]
        },
        data: () => ({
            showInput: false
        }),
        methods: {
            openInput() {
                this.showInput = true
                setTimeout(() => this.$refs.search.focus(), 100)
            },
            closeInput() {
                if (!this.value)
                    this.showInput = false
            },
            clearInput() {
                this.showInput = false
                this.$emit('input', '')
            },
            updateValue(val) {
                this.$emit('input', val)
            }
        },
        created() {
            if (this.value)
                this.showInput = true
        }

    }
</script>

<style>
    .project-search-input .v-input__slot {
        padding-right: 10px !important;
        padding-left: 15px !important;
    }
</style>