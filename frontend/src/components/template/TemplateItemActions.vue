<template>
    <v-layout
            align-center
            justify-space-between
            class="ma-0 px-3 px-md-5 pb-3"
            v-if="id"
    >
        <v-btn
                height="40"
                class="elevation-2"
                color="primary"
                @click="$emit('update')"
                :disabled="!form"
        >
            <div class="text-none body-2 px-2">
                Сохранить
            </div>
        </v-btn>
        <v-btn
                text
                color="error"
                @click="$emit('delete')"
        >
            <div class="body-2 text-none">Удалить</div>
        </v-btn>
    </v-layout>
    <v-layout
            align-center
            class="ma-0 px-3 px-md-5 pb-3"
            v-else
    >
        <v-btn
                height="40"
                class="elevation-2"
                color="primary"
                @click="$emit('create')"
                :disabled="!form"
        >
            <div class="text-none body-2 px-2">
                Создать
            </div>
        </v-btn>
    </v-layout>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'CrudOperations',

        props: {
            id: null,
        },

        computed: {
            ...mapState({
                form: state => state.form,
            })
        },
    }
</script>
