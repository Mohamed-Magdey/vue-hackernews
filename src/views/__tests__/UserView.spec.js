import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import mergeWith from 'lodash.mergewith'
import UserView from '../UserView.vue'

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

function createStore(overrides) {
  const defaultStoreConfig = {
    actions: {
      fetchUser: jest.fn(() => Promise.resolve())
    },
    state: {
      user: false
    }
  }
  return new Vuex.Store(
    mergeWith(defaultStoreConfig, overrides, customizer)
  )
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    mocks: {
      $route: {
        params: { id: '123' }
      }
    },
    localVue,
    store: createStore()
  }
  return shallowMount(UserView, mergeWith(defaultMountingOptions, overrides, customizer))
}

describe('UserView.vue', () => {
  test('renders user not found if no user with id exists in store', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('User not found.')
  })

  test('renders user.about as HTML if user exists in store', () => {
    const store = createStore({
      state: {
        user: {
          about: '<p class="about">Example HTML</p>'
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find('.about').text()).toContain('Example HTML')
  })

  test('dispatches fetchUser with id', () => {
    const store = createStore()
    const mocks = {
      $route: {
        params: {
          id: '123'
        }
      }
    }
    jest.spyOn(store, 'dispatch')
    createWrapper({ store, mocks })
    expect(store.dispatch).toHaveBeenCalledWith(
      'fetchUser',
      { id: '123' }
    )
  })
})
