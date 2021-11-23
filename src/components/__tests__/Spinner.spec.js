import { shallowMount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.element).toMatchSnapshot()
  })
})