import { expect, vi } from 'vitest'
import { mutations, actions, TodosState } from './todos'

const todo = { id: "1", text: "New Todo", isCompleted: false, dueDate: new Date() }

describe('mutations', () => {
    it('adds todo', () => {
        const state: TodosState = { tasks: [] }

        mutations.addTodo(state, todo)

        expect(state.tasks.length).to.equal(1)
    })
    it('removes todo', () => {
        const state: TodosState = { tasks: [todo] }

        mutations.removeTodo(state, todo.id);

        expect(state.tasks.length).to.equal(0)
    })
    it('toggles todo', () => {
        const state: TodosState = { tasks: [todo] }
        expect(state.tasks[0].isCompleted).to.equal(false)

        mutations.toggleTodo(state, todo.id);

        expect(state.tasks[0].isCompleted).to.equal(true)

        mutations.toggleTodo(state, todo.id);

        expect(state.tasks[0].isCompleted).to.equal(false)
    })
    it('edits todo', () => {
        const state: TodosState = { tasks: [todo] }

        mutations.editTodo(state, { ...todo, text: "Edited" });

        expect(state.tasks[0].text).to.equal("Edited")

    })
})

describe('actions', () => {
    const mockCommit = vi.fn()
    it('addTodo', () => {

        actions.addTodo({ commit: mockCommit }, todo)

        expect(mockCommit).toHaveBeenCalledWith('addTodo', todo)
    })
    it('removeTodo', () => {

        actions.removeTodo({ commit: mockCommit }, todo.id);

        expect(mockCommit).toHaveBeenCalledWith('removeTodo', todo.id)

    })
    it('toggleTodo', () => {
        actions.toggleTodo({ commit: mockCommit }, todo.id);

        expect(mockCommit).toHaveBeenCalledWith('toggleTodo', todo.id)
    })
    it('editTodo', () => {
        actions.editTodo({ commit: mockCommit }, todo);

        expect(mockCommit).toHaveBeenCalledWith('editTodo', todo)

    })
})