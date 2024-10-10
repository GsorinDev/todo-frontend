import {defineStore} from "pinia";

let apiUrl = process.env.VITE_API_URL || 'http://localhost:3000'

export const listStore = defineStore("listStore", {
    state : () => ({
        lists: [],
        currentList: null,
    }),
    actions : {
        async getAllList() {
            await fetch(`${apiUrl}/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (response) => {
                if (response.ok) {
                    this.lists = await response.json()
                    await this.getAllTasks(this.lists[0]._id)
                }
            })
        },
        async getAllTasks(id) {
            await fetch(`${apiUrl}/list/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (response) => {
                if (response.ok) {
                    this.currentList = await response.json()
                }
            })
        },
        async addTask(id, description) {
            await fetch(`${apiUrl}/list/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({description})
            }).then(async (response) => {
                if (response.ok) {
                    this.currentList = await response.json()
                }
            })
        },
        async completedTask(id, taskId) {
            await fetch(`${apiUrl}/list/${id}/task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (response) => {
                if (response.ok) {
                    this.currentList = await response.json()
                }
            })
        },
        async deleteTask(id, taskId) {
            await fetch(`${apiUrl}/list/${id}/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(async (response) => {
                if (response.ok) {
                    this.currentList = await response.json()
                }
            })
        },
        async addList(title) {
            await fetch(`${apiUrl}/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({title})
            }).then(async (response) => {
                if (response.ok) {
                    this.lists.push(await response.json())
                }
            })
        },
    }
})