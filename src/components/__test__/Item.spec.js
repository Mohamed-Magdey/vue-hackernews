import Item from '../Item.vue'
import Vue from 'vue'

describe('Item.vue', () => {
  test('renders "item"', () => {
    const Ctor = Vue.extend(Item)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).toContain('item')
  })
})
