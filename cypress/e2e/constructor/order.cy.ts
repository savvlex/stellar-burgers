import mockIngredients from '../data/mockIngredients.json';
import mockOrder from '../data/mockOrder.json';
import mockUser from '../data/mockUser.json';

describe('Order Placement', () => {
  beforeEach(() => {
    // Ставим правильный accessToken в куки с "Bearer"
    cy.setCookie('accessToken', 'Bearer mocked-valid-token');

    // Ставим refreshToken в localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mocked-refresh-token');
    });

    // Перехватываем запрос получения ингредиентов
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      body: mockIngredients
    }).as('getIngredients');

    // Перехватываем запрос создания заказа
    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      body: mockOrder
    }).as('postOrder');

    // Перехватываем запрос получения пользователя
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: mockUser
    }).as('getUser');

    // Переходим на сайт
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('should successfully create an order and display order number', () => {
    // Добавляем булку и ингредиент
    cy.get('[data-cy^="ingredient-card-"]').first().within(() => {
      cy.get('button').click();
    });

    cy.get('[data-cy^="ingredient-card-"]').eq(1).within(() => {
      cy.get('button').click();
    });

    // Нажимаем "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Ждем моки заказов и пользователя
    cy.wait('@postOrder');
    cy.wait('@getUser');

    // Проверяем, что модалка заказа открылась и есть номер заказа
    cy.get('[data-cy="common-modal"]').should('exist').and('contain', String(mockOrder.order.number));

    // Закрываем модалку
    cy.get('[data-cy="modal-close"]').click();

    // Проверяем, что модалка закрылась
    cy.get('[data-cy="common-modal"]').should('not.exist');

    // Првоеряем на пустой конструктор
    cy.get('[data-cy="bun-top"]').should('not.exist');
    cy.get('[data-cy="bun-bottom"]').should('not.exist');
    cy.get('[data-cy^="constructor-ingredient-"]').should('not.exist');
  });
});
