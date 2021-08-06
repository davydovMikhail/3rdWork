<template>
    <div class="list__main">
        <router-link tag="li" class="list__item" :to="{ name: 'Todos', params: { id: list.id }}">
            <div  class="list-group-item list__li"
            :class="[ list.no_todo ? '' : list.done ? 'pale_gray' : 'green']"
            >{{list.text}}</div>
        </router-link>
        <Remover @deleteEl="deleteList(list)"/>
    </div>
</template>

<script>
import Remover from '../components/Remover.vue'
import { mapActions } from 'vuex'


export default {
    name: 'list',
    components: {
        Remover
    },
    props: {
    list: Object,
    },
    methods: {
    ...mapActions([
        'deleteList'
    ]),
    }
}
</script>