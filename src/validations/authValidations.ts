import Fjs from 'fluent-json-schema'

const loginV = {
    tags: ['Auth'],
    body: Fjs.object()
        .prop('email', Fjs.string().required())
        .prop('password', Fjs.string().minLength(4).maxLength(20).required()),
}

const registerV = {
    tags: ['Auth'],
    body: Fjs.object()
        .prop('email', Fjs.string().required())
        .prop('username', Fjs.string().required())
        .prop('password', Fjs.string().minLength(4).maxLength(20).required())
        .prop('confirmPassword', Fjs.string().minLength(4).maxLength(20).required()),
}

export default {
    loginV,
    registerV
}