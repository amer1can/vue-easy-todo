import { createStore } from 'vuex'

export default createStore ({
    state() {
        return {
            items: []
        }
    },
    mutations: {
        addItem() {
            const id = Math.floor(Math.random() * 100)
            const task = {
                id,
                title: `Task_${id}`,
                text: `Lorem ipsum ${id * 9} dolores sit ${id * 138} amet`,
                subtasks: []
            }
            this.state.items.push(task)
        },
        deleteItem(index) {
            this.state.items.splice(index, 1)
        },
        addSubTask(item) {
            const id = Math.floor(Math.random() * 100)
            const task = {
                id,
                title: `Task_${id}`,
                text: `Lorem ipsum ${id * 9} dolores sit ${id * 138} amet`,
                subtasks: []
            }
            item.subtasks.push(task)
        }

    }
})
