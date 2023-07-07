export class Reducers {
    constructor(state, reducer) {
        return (initialState = state, action) => {
            const newState = reducer(initialState, action);

            return initialState = Object.assign(initialState, newState);
        }
    }
}