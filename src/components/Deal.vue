<template>
    <li class="list-group-item" :class="{'list-group-item-danger': deal.urgently}">
        <div class="todos__item">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="deal.completed" @change="switchCheckbox(deal)">
            <div class="todos__item_text">{{deal.text}}</div>
            <div class="todos__item_date"><div class="date">{{ getDateFromId }}</div><div class="date">{{ getTimeFromId }}</div></div>
            <Remover @deleteEl="deleteDeal(deal)"/>
        </div>    
    </li>
</template>

<script>
import Remover from './Remover.vue'
import { mapActions } from 'vuex'


export default {
    name: 'deal',
    components: {
        Remover
    },
    props: {
        deal: Object,
    },
    methods: {
    ...mapActions([
        'deleteDeal',
        'switchCheckbox'
    ]),
    },
     computed: {
        getDateFromId() {
            let date = new Date(this.deal.sub_id)
            return date.toLocaleDateString('ru-RU')
        },
        getTimeFromId() {
            let time = new Date(this.deal.sub_id)
            return time.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            })
        }
     },
}
</script>