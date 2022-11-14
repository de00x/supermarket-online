import { RootState } from '../store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectCart = (state: RootState) => state.cart

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)
