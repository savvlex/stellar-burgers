import { TIngredient } from '../../src/utils/types';

export const mockIngredients: Record<'bun' | 'main' | 'sauce', TIngredient> = {
  bun: {
    _id: 'bun1',
    name: 'Булка чёрная с кунжутом',
    type: 'bun',
    proteins: 12,
    fat: 4,
    carbohydrates: 22,
    calories: 210,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  main: {
    _id: 'main1',
    name: 'Котлета из марсианской говядины',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 5,
    calories: 320,
    price: 250,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  sauce: {
    _id: 'sauce1',
    name: 'Соус антивселенский',
    type: 'sauce',
    proteins: 0,
    fat: 1,
    carbohydrates: 8,
    calories: 50,
    price: 30,
    image: '',
    image_mobile: '',
    image_large: ''
  }
};
