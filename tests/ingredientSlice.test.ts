import { describe } from '@jest/globals';
import { mockIngredients } from './data/ingredientsMock';
import { TState, fetchIngredients, initialState, ingredientsReducer } from '../src/services/slices/ingredientSlice';


describe('ingredient fetch lifecycle', () => {
  let state: TState;

  beforeEach(() => {
    state = structuredClone(initialState)
  })

  it('should change isLoading = true during pending', () => {
    const action = fetchIngredients.pending('', undefined)
    state = ingredientsReducer(state, action)
    expect(state.isLoading).toBe(true)
    expect(state.fetchError).toBe(null)
  })

  it('should change isLoading = false, and fullfill list during fullfilled', () => {
    const action = fetchIngredients.fulfilled(Object.values(mockIngredients), '', undefined)
    state = ingredientsReducer(state, action)
    expect(state.isLoading).toBe(false)
    expect(state.list).toEqual(Object.values(mockIngredients))
    expect(state.fetchError).toBe(null)
  })

  it('should change isLoading = false, and fullfill list during fullfilled', () => {
    let error = Error('Internal galaxy error')
    const action = fetchIngredients.rejected(error, '', undefined)
    state = ingredientsReducer(state, action)
    expect(state.isLoading).toBe(false)
    expect(state.fetchError).toEqual(error.message)
  })
})
