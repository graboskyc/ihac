function init() {
    return {
        listOfProducts: [],

        async loadList() {
            console.log('Loading List');
            this.listOfProducts= await (await fetch('/api/listProducts')).json();
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

    }
}