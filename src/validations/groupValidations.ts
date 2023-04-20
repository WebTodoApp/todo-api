import Fjs from 'fluent-json-schema'

const getAllByIdv = {
    tags: ['Group'],
}

const getByIdV = {
    tags: ['Group'],
    params: Fjs.object()
        .prop('groupId', Fjs.number().required()),
}

const postV = {
    tags: ['Group'],
    body: Fjs.object()
        .prop('name', Fjs.string().required()),
}

const updateByIdV = {
    tags: ['Group'],
    body: Fjs.object()
        .prop('name', Fjs.string().required()),
    params: Fjs.object()
        .prop('groupId', Fjs.number().required()),
}

const deleteByIdV = {
    tags: ['Group'],
    queryString: Fjs.object(),
    params: Fjs.object()
        .prop('groupId', Fjs.number().required()),
}

export default{
    getAllByIdv,
    getByIdV,
    postV,
    updateByIdV,
    deleteByIdV,
}