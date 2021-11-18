import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import mergeWith from 'lodash.mergewith'

// For accepting empty default values
function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemListt.vue', () => {
  function createStore(overrides) {
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(mergeWith(defaultStoreConfig, overrides, customizer))
  }

  function createWrapper(overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    }
    return shallowMount(ItemList, mergeWith(defaultMountingOptions, overrides, customizer))
  }

  test('renders an Item with data for each item in displayItems', () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({ mocks })
    expect(mocks.$bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalledTimes(1)
  })

  test('dispatches fetchListData with top', async () => {
    expect.assertions(1)
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    createWrapper({ store })
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top'
    })
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1)
    const store = createStore({
      actions: {
        fetchListData: jest.fn(() => Promise.reject())
      }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }

    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
})
