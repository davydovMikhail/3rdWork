<template>
              <div class="todos">
                <h2>{{ allLists.find(x => x.id == $route.params.id).text }}</h2>
                <div class="todos__todos">
                    <ul class="list-group">
                      <Deal :deal="deal"
                      v-for="deal in allDeals"
                      :key="deal.sub_id"
                      />       
                    </ul>
                </div>
                <Adder @createEl="createDeal" textForPlaceHolder="Введите название дела" textButton="Добавить дело">
                  <div class="form-check form-switch ">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="stateOfUrgency">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Срочное</label>
                  </div>
                </Adder>
            </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Deal from '../components/Deal'
import Adder from '../components/Adder'



export default {
  name: 'Todos',
  components: {
    Adder,
    Deal
  },
  computed: {
    ...mapGetters([
      'allDeals',
      'allLists' 
    ]),
    stateOfUrgency: {
      get () {
        return this.$store.getters.urg
      },
      set (value) {
        this.$store.dispatch('updateUrg', value)
      }
    }   
  },
  methods: {
  ...mapActions([
    'createDeal'
  ])
  },
}
</script>
