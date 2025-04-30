import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  initialState,
  ingredientUp,
  ingredientDown,
  clearConstructor
} from '../src/services/slices/burgerConstructorSlice';
import { mockIngredients } from './data/ingredientsMock';

describe('burgerConstructorSlice', () => {
  let state = structuredClone(initialState);

  beforeEach(() => {
    state = {
      ...initialState,
      ingredients: Object.values(mockIngredients)
        .filter(i => i.type !== 'bun')
        .map((item, index) => ({ ...item, id: `id-${index}` }))
    };
  });

  it('should handle addIngredient for bun (with no changing ingredients array)', () => {
    const newState = burgerConstructorReducer(state, addIngredient(mockIngredients.bun));

    expect(newState.bun).toMatchObject({
      ...mockIngredients.bun,
      id: expect.any(String)
    });
    expect(newState.ingredients).toHaveLength(state.ingredients.length);
  });

  it('should handle addIngredient for ingredients (except bun)', () => {
    const newState = burgerConstructorReducer(state, addIngredient(mockIngredients.main));

    expect(newState.ingredients[0]).toMatchObject({
      ...mockIngredients.main,
      id: expect.any(String)
    });

    expect(newState.ingredients).toHaveLength(state.ingredients.length + 1);
  });

  it('should handle removeIngredient', () => {
    const idToRemove = state.ingredients[0].id;
    const newState = burgerConstructorReducer(state, removeIngredient(idToRemove));

    expect(newState.ingredients).toHaveLength(state.ingredients.length - 1);
    expect(newState.ingredients.find(i => i.id === idToRemove)).toBeUndefined();
  });

  it('should handle move ingredient up', () => {
    const ingredientToMove = state.ingredients[1];
    const newState = burgerConstructorReducer(state, ingredientUp(ingredientToMove.id))
    expect(newState.ingredients[0]).toEqual(ingredientToMove)
  });

  it('should handle move ingredient down', () => {
    const ingredientToMove = state.ingredients[0];
    const newState = burgerConstructorReducer(state, ingredientDown(ingredientToMove.id))
    expect(newState.ingredients[1]).toEqual(ingredientToMove)
  });
});


describe('burgerConstructorSlice', () => {
  let state = structuredClone(initialState);

  beforeEach(() => {
    state = {
      bun: { ...mockIngredients.bun, id: 'bun-id' },
      ingredients: Object.values(mockIngredients)
        .filter(i => i.type !== 'bun')
        .map((item, index) => ({ ...item, id: `id-${index}` }))
    };
  });

  it('should handle clearConstructor', () => {
    const newState = burgerConstructorReducer(state, clearConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
