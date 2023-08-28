export default class Todo {

    todoElement: () => Cypress.Chainable<JQuery<HTMLElement>>;
    newTodoTitleInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    newTodoDateInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    newTodoSubmitInput: () => Cypress.Chainable<JQuery<HTMLElement>>;
    editTodoButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    editTodoTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
    editTodoDate: () => Cypress.Chainable<JQuery<HTMLElement>>;
    editTodoConfirmButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteTodoPromptButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteTodoModal: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteTodoCancelButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    deleteTodoConfirmButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    completeTodoButton: () => Cypress.Chainable<JQuery<HTMLElement>>;
    duplicateTodoButton: () => Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        this.todoElement = () => cy.get('[data-testid="todo-element"]')

        this.newTodoTitleInput = () => cy.get('[data-testid="new-todo-title"]')
        this.newTodoDateInput = () => cy.get('[data-testid="new-todo-date"]')
        this.newTodoSubmitInput = () => cy.get('[data-testid="new-todo-submit"]')

        this.editTodoButton = () => cy.get('[data-testid="edit-todo-button"]')
        this.editTodoTitle = () => cy.get('[data-testid="edit-todo-title"]')
        this.editTodoDate = () => cy.get('[data-testid="edit-todo-date"]')
        this.editTodoConfirmButton = () => cy.get('[data-testid="edit-todo-confirm-button"]')

        this.deleteTodoPromptButton = () => cy.get('[data-testid="delete-todo-prompt-button"]')
        this.deleteTodoModal = () => cy.get('[data-testid="delete-todo-modal"]')
        this.deleteTodoCancelButton = () => cy.get('[data-testid="delete-todo-cancel-button"]')
        this.deleteTodoConfirmButton = () => cy.get('[data-testid="delete-todo-confirm-button"]')

        this.completeTodoButton = () => cy.get('[data-testid="complete-todo-button"]')
        this.duplicateTodoButton = () => cy.get('[data-testid="duplicate-todo-button"]')
    }

    create({ title, due }: { title?: string; due?: Date }) {
        if (title) {
            this.newTodoTitleInput().type(title);
        }

        if (due) {
            this.newTodoDateInput().type(due.toISOString().split('T')[0]);
        }

        this.newTodoSubmitInput().click();

    }

    update({ title, due }: { title?: string; due?: Date }) {
        this.editTodoButton().click();
        if (title) {
            this.editTodoTitle().type(title);
        }
        if (due) {
            this.editTodoTitle().type(due.toISOString().split('T')[0]);
        }

        this.editTodoConfirmButton().click();
    }

    delete(options?: { cancel: boolean }) {
        this.deleteTodoPromptButton().click();
        if (options?.cancel) {
            this.deleteTodoCancelButton().click();
        } else {
            this.deleteTodoConfirmButton().click()
        }
    }

    toggleComplete() {
        this.completeTodoButton().click();
    }

    duplicateTodo() {
        this.duplicateTodoButton().click();
    }
}