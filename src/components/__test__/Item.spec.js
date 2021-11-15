import Item from '../Item.vue'
import { shallowMount } from '@vue/test-utils'

describe('Item.vue', () => {
  test('renders item', () => {
    const wrapper = shallowMount(Item)
    expect(wrapper.text()).toContain('item')
  })
})
