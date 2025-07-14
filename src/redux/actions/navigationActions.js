import {
    push as push_,
    replace as replace_,
    go as go_,
    goBack as goBack_,
    goForward as goForward_
} from 'react-router-redux';
/*
const location = {
    pathname: '/hola',
    search: '?name=mundo',
    query: { name: 'mundo' },
    state: {},
}
*/
// agregamos un nuevo location y lo volvemos el actual (cambia la URL)


export const push = (data: Object) => async dispatch => {
    dispatch(push_({ pathname: data.location }));// reemplaza el location actual por el indicado
}
export const replace = (data: Object) => async dispatch => {
    dispatch(replace_({ pathname: data.location }));// se mueve N posiciones en el historial (positivo o negativo)
}
export const go = (data: Object) => async dispatch => {
    dispatch(go_(data.N));// se mueve a la anterior posición del historial (igual a go(-1))
}
export const goBack = () => async dispatch => {
    dispatch(goBack_());// se mueve a la siguiente posición del historial (igual a go(1))
}

export const goForward = () => async dispatch => {
    dispatch(goForward_());
}
