import Fjs from 'fluent-json-schema'

const getAllV = {
    tags: ['Todo'],
}

const getByIdV = {
    tags: ['Todo'],
}

const postV = {
    tags: ['Todo'],
    body: Fjs.object()
        .prop('name', Fjs.string().required())
        .prop('content', Fjs.string().required())
        .prop('status_id', Fjs.number().required())
        .prop('group_id', Fjs.number().required()),
}

const updateByIdV = {
    tags: ['Todo'],
}

const deleteByIdV = {
    tags: ['Todo'],
}

export default{
    getByIdV,
    postV,
    updateByIdV,
    deleteByIdV,
}