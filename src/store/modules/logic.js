import router from '@/router/index'

const actions = {
    updateUrg (context, value) {
        context.commit('updateUrg', value)
    },
    createList({ commit }, given) {
        let newListObj = {
            text: given.trim(),
            no_todo: true,
            done: false,
            id: Date.now()
        }
        commit('addList', newListObj)
    },
    createDeal({ commit, getters }, given) {
        let newDealObj = {
            text: given.trim(),
            urgently: state.urg,
            id: router.currentRoute.params.id,
            sub_id: Date.now(),
            completed: false
        }
        commit('addDeal', newDealObj)
        commit('changeNoTodoList', { getters })
    },
    deleteList({ commit }, list) {
        commit('dltListFromLists', list.id)
        if (router.currentRoute.params.id == list.id) {
            router.push('/')
        }
    },
    deleteDeal({ commit, getters }, deal) {
        commit('dltDealFromDeals', deal.sub_id)
        commit('changeNoTodoList', { getters })
        commit('changePropertyDone', { getters })
    },
    switchCheckbox({ commit, getters }, deal) {
        commit('changeCompletedCheckBox', deal.sub_id)
        commit('changePropertyDone', { getters })
    }
}

const mutations = {
    addList: (state, list) => state.lists.push(list),
    addDeal: (state, deal) => state.deals.push(deal),
    dltListFromLists (state, ID) {
        state.lists = state.lists.filter(list => list.id !== ID)
    },
    dltDealFromDeals: (state, ID) => state.deals = state.deals.filter(deal => deal.sub_id !== ID),
    changeCompletedCheckBox(state, ID) {
        !state.deals.find(x => x.sub_id == ID).completed
    },
    changeTheCurrentId(state, ID) { 
        state.curr_id = ID
    },
    updateUrg (state, value) {
        state.urg = value
    },
    changeNoTodoList(state, { getters }) {
        if (getters.allDeals.length == 0) {
            state.lists.find(x => x.id == router.currentRoute.params.id).no_todo = true
        } else {
            state.lists.find(x => x.id == router.currentRoute.params.id).no_todo = false
        }
    },
    changePropertyDone(state, { getters }) {
        let completeness = getters.allDeals.every(x => x.completed == true)
        if (getters.allDeals.length == 0) { completeness = false }
        state.lists.find(x => x.id == router.currentRoute.params.id).done = completeness
    }
}

const state = {
    lists: [],
    deals: [],
    urg: false,
    curr_id: undefined
}

const getters = {
    allLists: (state) => {
        return state.lists
    },
    allDeals: (state) => {
        let dd = state.deals.filter(function(number) {
            return number.id == state.curr_id;
        });
        return dd
    },
    urg (state) {
        return state.urg
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}