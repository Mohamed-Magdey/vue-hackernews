/**
 * @jest-environment node
 */

import { renderToString } from '@vue/server-test-utils'
import NotFound from '../NotFound.vue'

describe('NotFound', () => {
  test('renders correctly on server ', () => {
    const str = renderToString(NotFound)
    expect(str).toMatchSnapshot()
  })
})