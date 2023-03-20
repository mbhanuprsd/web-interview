const BASE_URL = "http://localhost:3001"

/**
 * @returns Todo lists from the json file in server
 */
export async function fetchTodoList() {
    try {
        const respose = await fetch(BASE_URL + '/todos')
        return await respose.json()
    } catch (error) {
        return {}
    }
}

/**
 * Updates the Todo list data into JSON file in server
 * @param {JSON} data Todo list data
 * @returns API status
 */
export async function updateTodoList(data) {
    try {
        const respose = await fetch(BASE_URL + '/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
        return await respose.json()
    } catch (error) {
        return {}
    }
}