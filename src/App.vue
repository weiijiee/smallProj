<template>
  <div id="app">
    <a-input :value="inputValue" placeholder="请输入任务" class="my_ipt" @change="inputChange"/>
    <a-button type="primary" @click="addTask">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-checkbox :checked="item.done" @change="(e) => {
        checkBoxChange(e, item.id)}">{{item.info}}</a-checkbox>

      <a slot="actions" @click="deleteTask(item.id)">删除</a>
    </a-list-item>

    <div slot="footer" class="footer">
      <span>{{this.$store.getters.undone}}条剩余</span>
      <a-button-group>
        <a-button :type="viewList === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
        <a-button :type="viewList === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
        <a-button :type="viewList === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
      </a-button-group>

      <a @click="clear">清除已完成</a>
    </div>

    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewList']),
    ...mapGetters(['infoList'])

  },
  methods: {
    inputChange(e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addTask() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('不能为空')
      }
      this.$store.commit('addItem')
    },
    deleteTask(id) {
      this.$store.commit('removeItem', id)
    },
    checkBoxChange(e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeCheckBox', param)
    },
    clear() {
      this.$store.commit('clearDone')
    },
    changeList(list) {
      this.$store.commit('changeList', list)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-right: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
