import { modals } from '../reducer'
import { TOGGLE_MODAL } from '../types'

describe('app > reducer', () => {
  describe('ui > modals', () => {
    it('should toggle a modal\'s visibility', () => {
      const initial = { modalA: { isVisible: false }, modalB: { isVisible: false } }
      const input = { type: TOGGLE_MODAL, payload: { modal: 'modalB', isVisible: true } }
      const expected = { modalA: { isVisible: false }, modalB: { isVisible: true } }

      expect(modals(initial, input)).toEqual(expected)
    })
  })
})
