import Item from '../Item.vue'
import { mount } from '@vue/test-utils'

describe('Item.vue', () => {
  test('renders item', () => {
    const wrapper = mount(Item)
    expect(wrapper.text()).toContain('item')
  })
})
