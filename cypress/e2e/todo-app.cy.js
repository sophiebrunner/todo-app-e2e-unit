/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  // Default state of the app
  it("should have 0 todos by initialization", () => {
    cy.get("[data-cy=todo-list] li").should("have.length", 0);
  });
  // Input of new todo
  it("should have input field", () => {
    cy.get("[data-cy=new-todo]").should("exist");
  });
  it("should add new todo", () => {
    cy.get("[data-cy=new-todo]").type("Learn Cypress");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 1);
  });
  // Filters
  it("should have three filter radio buttons", () => {});
});
