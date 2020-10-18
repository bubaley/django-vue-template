<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-select
            :value="value"
            :items="list"
            :label="label"
            :item-text="customText"
            :item-value="itemValue"
            :return-object="returnObject"
            :multiple="multiple"
            @input="change"
            @focus="onFocus"
            :style="`max-width: ${width}`"
            :class="classes"
            :dark="dark"
            :hide-details="hideDetails"
            :dense="dense"
            :outlined="outlined"
            ref="selectMenu"
            class="kek"
    >
        <v-icon slot="prepend-inner" class="mt-1" v-if="prependIcon && !hasSelectionSlot" :size="20">{{prependIcon}}
        </v-icon>
        <template v-slot:prepend-item="">
            <v-banner
                    class="pa-0 ma-0 pt-2 white"
                    sticky
                    tile
            >
                <v-layout row class="mx-2 mb-2" align-center>
                    <v-text-field
                            dense hide-details outlined
                            class="pa-0 mt-0"
                            v-model="search"
                            ref="textFieldSearch"
                    >
                        <template v-slot:append v-if="multiple">
                            <v-layout justify-end align-center class="ma-0">
                                <v-fade-transition leave-absolute>
                                    <v-tooltip top color="primary" min-width="120">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn @click="toggle" v-on="on" small icon color="primary">
                                                <v-icon size="20">
                                                    {{icon}}
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>{{tooltip}}</span>
                                    </v-tooltip>
                                </v-fade-transition>
                            </v-layout>
                        </template>

                    </v-text-field>
                </v-layout>
            </v-banner>
        </template>
        <template v-slot:item="{ item, index }">
            <slot name="item" :item="item" :index="index"></slot>
            <div v-if="!hasItemSlot" class="body-2 text-none">{{customText(item)}}</div>
        </template>
        <template v-slot:no-data="">
            <v-layout class="ma-0" justify-center>
                <div class="body-2 text-none px-3 pt-2 pb-2" style="text-align: center">Данные отсутствуют</div>
            </v-layout>
        </template>
        <template v-slot:selection="{ item, index }" v-if="multiple || hasSelectionSlot">
            <div v-if="index === 0 && !hasSelectionSlot" class="font-weight-light body-2 pl-1">
                {{ selectedText }} выбрано: {{ value.length }}
            </div>
            <slot name="selection" :item="item" :index="index"></slot>
        </template>
    </v-select>
</template>

<script>
    export default {
        props: {
            value: [Array, Number, Object],
            items: Array,
            label: String,
            customText: {
                type: Function,
                default: (val) => {
                    return val.name
                }
            },
            returnObject: {
                type: Boolean,
                default: true
            },
            hideDetails: {
                type: Boolean,
                default: true
            },
            outlined: {
                type: Boolean,
                default: true
            },
            dense: {
                type: Boolean,
                default: true
            },
            width: {type: String, default: '300px'},
            classes: String,
            dark: {
                type: Boolean,
                default: false
            },
            multiple: {type: Boolean, default: true},
            itemValue: {
                type: String,
                default: 'id'
            },
            prependIcon: String,
            selectedText: String
        },

        data: () => ({
            search: null,
            disabled: false,
            currentList: []
        }),

        computed: {
            hasItemSlot() {
                return !!this.$scopedSlots.item
            },
            hasSelectionSlot() {
                return !!this.$scopedSlots.selection
            },
            allSelected() {
                if (!this.multiple) return true;
                return this.value.length === this.list.length
            },
            someSelected() {
                if (!this.multiple) return true;
                return this.value.length > 0 && !this.allSelected
            },
            icon() {
                if (this.allSelected) return 'mdi-playlist-minus';
                if (this.someSelected) return 'mdi-playlist-plus';
                return 'mdi-playlist-check'
            },
            tooltip() {
                if (this.allSelected) return 'Снять выбор';
                if (this.someSelected) return 'Добавить';
                return 'Выбрать всех'
            },
            list() {
                const list = this.currentList.length > 0 ? this.currentList : this.items
                if (!this.search) return list;

                let search = this.search.toLowerCase();

                return list.filter(value => {
                    let text = this.customText(value).toLowerCase();

                    let words = search.split(' ');
                    let i = true;
                    words.forEach(value => {
                        if (text.indexOf(value) === -1) {
                            i = false;
                        }
                    });
                    return i;
                });
            }
        },

        methods: {
            getCurrentList() {
                let selected = []
                let unselected = []
                if (this.multiple) {
                    this.items.forEach(value => {
                        if (this.returnObject) {
                            if (this.value.find(val => val[this.itemValue] === value[this.itemValue]))
                                selected.push(value)
                            else
                                unselected.push(value)
                        } else {
                            if (this.value.indexOf(value[this.itemValue]) > -1)
                                selected.push(value)
                            else
                                unselected.push(value)
                        }
                    })
                } else {
                    this.items.forEach(value => {
                        if (this.returnObject) {
                            if (this.value[this.itemValue] === value[this.itemValue])
                                selected.push(value)
                            else
                                unselected.push(value)
                        } else {
                            if (this.value === value[this.itemValue])
                                selected.push(value)
                            else
                                unselected.push(value)
                        }
                    })
                }
                return selected.concat(unselected)
            },
            toggle() {
                if (!this.multiple) return;
                let ids = [];
                this.$nextTick(() => {
                    if (this.allSelected) {
                        this.change([])
                    } else {
                        if (!this.returnObject) {
                            this.list.forEach(value => {
                                ids.push(value.id)
                            });
                            this.change(ids)
                        } else {
                            ids = this.list.slice()
                            this.change(ids)
                        }
                    }
                    if (ids.length === this.list.length)
                        this.$refs.selectMenu.$refs.menu.isActive = false
                })
            },

            change(val) {
                this.$emit('input', val)
                this.$emit('change', val)
            },

            onFocus() {
                this.currentList = this.getCurrentList()
                setTimeout(() => {
                    this.$refs.textFieldSearch.focus()
                }, 200)
                setTimeout(() => {
                    this.$refs.selectMenu.$refs.menu.$refs.content.childNodes[0].style.paddingTop = 0
                }, 50)
            },
        }
    }
</script>

<style>
    .v-banner__wrapper {
        padding: 0 !important;
    }

    .v-banner__content {
        padding: 0 !important;
    }
</style>
