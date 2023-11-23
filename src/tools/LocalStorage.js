export default function LocalStorage() {
    return {
        has: function (index) {
            return localStorage.getItem(index)?.length > 1
        },
        load: function (index) {
            return JSON.parse(localStorage.getItem(index))
        },
        save: function (index, object) {
            return localStorage.setItem(index, JSON.stringify(object))
        },
        remove: function (index) {
            localStorage.removeItem(index)
        }
    }
}
