import Vue from 'vue'

export default {
  SET_ITEM: (state, { item }) => {
    state.item = item
  },
  SET_ITEMS: (state, { items }) => {
    state.items = items
  },
  SET_COMMENTS: (state, { comments }) => {
    comments.forEach(comment => {
      if (comment) {
        Vue.set(state.comments, comment.id, comment)
      }
    })
  },
  SET_USER: (state, { user }) => {
    state.user = user
  }
}
