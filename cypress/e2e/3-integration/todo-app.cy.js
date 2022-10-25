/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  // Default state of the app
  it("displays zero todo items by default", () => {
    cy.get("[data-cy=todo-list] li").should("have.length", 0);
  });
  // Add new todo element
  it("can add new todo items", () => {
    cy.get("[data-cy=new-todo]").type("Learn Cypress");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 1);
  });
  //Duplicate check
  it("can regognize duplicate items", () => {
    cy.get("[data-cy=new-todo]").type("Learn Cypress");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 1);
    cy.get("[data-cy=new-todo]").type("learn cypress");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 1);
  });
  // Check todo element and delete done todo elements
  context("with adding new todo items", () => {
    beforeEach(() => {
      cy.get("[data-cy=new-todo]").type("Learn Cypress");
      cy.get("[data-cy=add-todo]").click();
      cy.get("[data-cy=todo-list] li").should("have.length", 1);
    });
    it("can check todo item", () => {
      cy.contains("Learn Cypress").find("input[type=checkbox]").check();
      cy.contains("Learn Cypress").should("have.class", "done");
    });
    it("can delete done todo items", () => {
      cy.contains("Delete done Todos").click();
      cy.get("[data-cy=todo-list] [class=done]").should("not.exist");
    });
  });
  // Filters
  context("with different state of todo items", () => {
    beforeEach(() => {
      const todos = ["Learn JavaScript", "Learn Vue"];
      todos.forEach((todo) => {
        cy.get("[data-cy=new-todo]").type(todo);
        cy.get("[data-cy=add-todo]").click();
      });
      cy.get("[data-cy=todo-list] li").should("have.length", 2);
      cy.contains("Learn JavaScript").find("input[type=checkbox]").check();
      cy.contains("Learn JavaScript").should("have.class", "done");
    });
    it("should have the first radio button initially checked", () => {
      cy.get("[type=radio").first().should("be.checked");
    });
    it("can filter for completed tasks", () => {
      cy.contains("Show done todos").click();
      cy.get("[data-cy=todo-list] [class=done]")
        .should("have.length", 1)
        .should("have.text", "Learn JavaScript");
      cy.contains("Learn Vue").should("not.be.visible");
    });
    it("can filter for incompleted tasks", () => {
      cy.contains("Show open todos").click();
      cy.contains("Learn Vue").should("be.visible").should("have.length", 1);
      cy.contains("Learn JavaScript").should("not.be.visible");
    });
    it("can filter for all todos", () => {
      cy.contains("Show all todos").click();
      cy.get("[data-cy=todo-list] li").should("have.length", 2);
    });
  });
});
