export function InputHandler(setters) {
    return (e) => {
        setters(e.target.value)
    }
}

/**
 * @param {Types} type
 * @param {{}} payload
 * @return {{payload, type}}
 */
export function Actions(type, payload) {
    return {
        type, payload
    }
}