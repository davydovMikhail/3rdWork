<template>
  <div id="main">
    <div class="lists">
            <div class="dropdown dropdown__body">
                <button class="btn btn-secondary dropdown-toggle dropdown__button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  Неисполненные
                </button>
                <ul class="dropdown-menu dropdown__menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" href="#">Неисполненные</a></li>
                  <li><a class="dropdown-item" href="#">Исполненные</a></li>
                  <li><a class="dropdown-item" href="#">Все</a></li>
                </ul>
            </div>
            <ul class="list-group list__body">
               <List :list="list"
                      v-for="list in allLists"
                      :key="list.id"
               />
            </ul>
            <Adder @createEl="createList" textForPlaceHolder="Введите название списка" textButton="Добавить список"/>
        </div>
      <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations  } from 'vuex'
import List from '../components/List'
import Adder from '../components/Adder'


export default {
  name: 'Main',
  components: {
    Adder,
    List
  },
  data() {
    return {  
    }
  },
  computed: {
    ...mapGetters([
      'allLists'  
    ])
  },
  methods: {
  ...mapActions([
    'createList'
  ]),
  ...mapMutations([
    'changeTheCurrentId'
  ])
  },
  watch: {
    $route () {
      this.changeTheCurrentId(this.$route.params.id)
    }
  }
}
</script>

<style>
.router-link-exact-active.router-link-active {
  border-left: 7px solid #4B0082;
  border-top: 2px solid #4B0082;
  border-bottom: 2px solid #4B0082;
  border-right: 2px solid #4B0082;
}
</style>