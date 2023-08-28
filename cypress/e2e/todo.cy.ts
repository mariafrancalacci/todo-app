import Todo from "../support/Todo"
import dayjs from 'dayjs'

let todo: Todo;
// https://docs.cypress.io/api/introduction/api.html
beforeEach(() => {
  cy.visit('/')
  todo = new Todo();
})

describe("Creates todo task", () => {
  it("creates a todo task with title and date", () => {
    todo.create({ title: 'New Todo', due: dayjs().add(1, 'day').toDate() });
    cy.contains("p", "New Todo");
  });
  it("does not create a todo task without title", () => {
    todo.create({ due: new Date() });
    cy.contains("p", "New Todo").should('not.exist');
  });
  it("does not create a todo task without date", () => {
    todo.create({ title: 'New Todo' });
    cy.contains("p", "New Todo").should('not.exist');
  });
});

describe("Updates todo task", () => {
  beforeEach(() => {
    const tomorrow = dayjs().add(1, 'day').toDate()
    todo.create({ title: "New Todo", due: tomorrow })
  })

  it("updates a todo task with title and date", () => {
    todo.update({ title: "Updated todo" })
    cy.contains("p", "Updated todo")

  });
  it("does not update a todo task without title", () => {
    const tomorrow = dayjs().add(1, 'day').toDate()
    todo.update({ title: "", due: tomorrow })
    cy.contains("p", "Updated todo").should('not.exist');
  });
});

describe("Deletes todo task", () => {
  beforeEach(() => {
    const tomorrow = dayjs().add(1, 'day').toDate()
    todo.create({ title: "New Todo", due: tomorrow })
  })
  it("deletes a todo task", () => {
    todo.delete();
    todo.deleteTodoModal().should('not.exist')
    cy.contains("p", "New Todo").should('not.exist');
  });

  it("does not delete task and dismisses modal when clicking cancel", () => {
    todo.delete({ cancel: true })
    todo.deleteTodoModal().should('not.exist')
    cy.contains("p", "New Todo")
  });
});

describe("Marks task as complete", () => {
  beforeEach(() => {
    const tomorrow = dayjs().add(1, 'day').toDate()
    todo.create({ title: "New Todo", due: tomorrow })
  })
  it("marks a todo task as complete", () => {
    todo.toggleComplete();
    todo.completeTodoButton().should('have.attr', 'data-checked', 'true')
  });
  it("unmarks a todo task as complete", () => {
    todo.toggleComplete();
    todo.toggleComplete();
    todo.completeTodoButton().should('not.have.attr', 'data-checked')
  });
});

describe.skip("Filter tasks", () => {
  it("should show all tasks", () => {

  });
  it("should show pending tasks", () => {

  });
  it("should show completed tasks", () => {

  });
});

describe("Duplicate tasks", () => {
  beforeEach(() => {
    const tomorrow = dayjs().add(1, 'day').toDate()
    todo.create({ title: "New Todo", due: tomorrow })
  })
  it("should duplicate a task", () => {
    todo.duplicateTodo();
    todo.todoElement().should('have.length', 2)
  });
});

describe.skip("Past due date tasks", () => {
  it("should highlight past the due date tasks in red and not mark as complete", () => {

  });
});
