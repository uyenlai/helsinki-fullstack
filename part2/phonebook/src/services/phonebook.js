import axios from 'axios';
const baseUrl = '/api/persons'

const getAll = () => {
    const request =  axios.get(baseUrl);
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(res => res.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(res => res.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const phonebookServices = {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}

export default phonebookServices