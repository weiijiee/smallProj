import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextID: 4,
    viewList: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextID,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextID++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const index = state.list.findIndex(task => task.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    changeCheckBox(state, param) {
      const index = state.list.findIndex(check => check.id === param.id)
      if (index !== -1) {
        state.list[index].done = param.status
      }
    },
    clearDone(state) {
      state.list = state.list.filter(task => task.done === false)
    },
    changeList(state, list) {
      state.viewList = list
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(function(ret) {
        context.commit('initList', ret.data)
      })
    }
  },
  getters: {
    undone(state) {
      return state.list.filter(task => task.done === false).length
    },
    infoList(state) {
      if (state.viewList === 'all') {
        return state.list
      }
      if (state.viewList === 'undone') {
        return state.list.filter(task => task.done === false)
      }
      if (state.viewList === 'done') {
        return state.list.filter(task => task.done === true)
      }
    }
  }
})
