import mockIngredients from '../data/mockIngredients.json';
import { TIngredient } from '../../../src/utils/types';

describe('Burger Constructor', () => {
  let bun: TIngredient;
  let mainIngredient: TIngredient;

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { statusCode: 200, body: mockIngredients }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients').then(() => {
      bun = mockIngredients.data.find((item: TIngredient) => item.type === 'bun') as TIngredient;
      mainIngredient = mockIngredients.data.find((item: TIngredient) => item.type === 'main') as TIngredient;
    });
  });

  it('should correctly add bun', () => {
    cy.get('[data-cy^="ingredient-card-"]').should('exist');
    cy.get(`[data-cy="add-ingredient-${bun._id}"]`).find('button').click();
    cy.get('[data-cy="bun-top"]').should('exist').and('contain', bun.name);
    cy.get('[data-cy="bun-bottom"]').should('exist').and('contain', bun.name);
    cy.get('[data-cy^="ingredient-card-"]').should('exist');
    cy.get(`[data-cy="add-ingredient-${mainIngredient._id}"]`).find('button').click();
    cy.get(`[data-cy="constructor-ingredient-${mainIngredient._id}"]`).should('have.length', 1);
    cy.get(`[data-cy="add-ingredient-${mainIngredient._id}"]`).find('button').click();
    cy.get(`[data-cy="constructor-ingredient-${mainIngredient._id}"]`).should('have.length', 2);
  });

  it('should correctly open and close modals', () => {
    cy.get(`[data-cy="ingredient-card-${bun._id}"]`).click()
    cy.url().should('include', `/ingredients/${bun._id}`);
    cy.get('[data-cy="ingredient-modal"]').should('exist');
    cy.get('[data-cy="modal-close"]').should('exist').click()
    cy.url().should('not.include', `/ingredients/${bun._id}`);
    cy.get(`[data-cy="ingredient-card-${bun._id}"]`).click()
    cy.get('[data-cy="modal-overlay"]').should('exist').click({force: true})
  });
});
