/// <reference types="cypress" />
// In Beispiel werden Test mehrere Male ausgeführt und beforeEach die Seite aufgerufen.
// Bei jedem neuen Aufruf gehen aber hinzugefügte Daten verloren. Daher hier ein Website-Besuch nachgestellt - sinnvoll?
describe("todo app", () => {
  it("should exist", () => {
    cy.visit("http://localhost:3000");
  });
  // Default state of the app
  it("should have 0 todos by initialization", () => {
    cy.get("[data-cy=todo-list] li").should("have.length", 0);
  });
  // Input of new todos
  it("should have input field", () => {
    cy.get("[data-cy=new-todo]").should("exist");
  });
  it("should add 4 new todos", () => {
    todos.forEach((todo) => {
      return addNewToDo(todo);
    });
    cy.get("[data-cy=todo-list] li").should("have.length", 4);
  });
  // Wie ist duplicate check zu verstehen?
  it("should check for duplicates", () => {
    todos.forEach((todo) => {
      isDuplicate(todo);
    });
  });
  // Checkmark todos as done
  const checkedToDos = [];
  const uncheckedToDos = [];
  it("should mark 2 todos as done", () => {
    checkedToDos.push(checkToDo(todos[0]));
    checkedToDos.push(checkToDo(todos[3]));
    uncheckedToDos.push(todos[1]);
    uncheckedToDos.push(todos[2]);
  });
  // Filters
  it("should have three filter radio buttons", () => {
    cy.get("[type=radio").should("have.length", 3);
  });
  it("should have the first radio button initially checked", () => {
    cy.get("[type=radio").first().should("be.checked");
  });
  it("can filter for completed tasks", () => {
    cy.contains("Show done todos").click();
    cy.get("[data-cy=todo-list] [class=done]")
      .should("have.length", 2)
      .first()
      .should("have.text", "Learn HTML");
    cy.get("[data-cy=todo-list] [class=done]")
      .last()
      .should("have.text", "Learn Vue");
    uncheckedToDos.forEach((todo) => {
      isHidden(todo);
    });
  });
  it("can filter for incompleted tasks", () => {
    cy.contains("Show open todos").click();
    uncheckedToDos.forEach((todo) => {
      isVisible(todo);
    });
    //Code funktioniert nicht - why?
    // checkedToDos.forEach((todo) => {
    //   isHidden(todo);
    // });
    // isVisible("Learn CSS");
    // isVisible("Learn JavaScript");
    isHidden("Learn HTML");
    isHidden("Learn Vue");
  });
  it("can display all todos", () => {
    cy.contains("Show all todos").click();
    cy.get("[data-cy=todo-list] li").should("have.length", 4);
  });
  // Delete done todos
  it("can delete all done todos", () => {
    cy.contains("Delete done Todos").click();
    cy.get("[data-cy=todo-list] [class=done]").should("not.exist");
  });
  // Duplicate check
});
// Macht Aufbau so Sinn? Mit global functions & variables? Reusable functions?
const todos = ["Learn HTML", "Learn CSS", "Learn JavaScript", "Learn Vue"];
// Global functions
function addNewToDo(txt) {
  cy.get("[data-cy=new-todo]").type(txt);
  cy.get("[data-cy=add-todo]").click();
}
function checkToDo(txt) {
  cy.contains(txt).find("input[type=checkbox]").check();
  cy.contains(txt).should("have.class", "done");
}
function isVisible(txt) {
  cy.contains(txt).should("be.visible");
}
function isHidden(txt) {
  cy.contains(txt).should("not.be.visible");
}
function isDuplicate(txt) {
  cy.contains(txt).should("have.length", 1);
}
