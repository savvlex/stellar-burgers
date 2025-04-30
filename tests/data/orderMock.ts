import { TOrder } from '../../src/utils/types';

export const mockOrder: TOrder = {
  _id: 'abc123',
  name: 'Galactic Burger',
  status: 'done',
  createdAt: '2025-04-22T10:00:00.000Z',
  updatedAt: '2025-04-22T10:10:00.000Z',
  number: 42,
  ingredients: ['ingredient1', 'ingredient2']
};

export const mockOrderList: TOrder[] = [
  {
    _id: 'abc123',
    name: 'Galactic Burger',
    status: 'done',
    createdAt: '2025-04-22T10:00:00.000Z',
    updatedAt: '2025-04-22T10:10:00.000Z',
    number: 42,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: 'xyz789',
    name: 'Cosmic Roll',
    status: 'pending',
    createdAt: '2025-04-22T11:00:00.000Z',
    updatedAt: '2025-04-22T11:15:00.000Z',
    number: 43,
    ingredients: ['ingredient3']
  }
];
