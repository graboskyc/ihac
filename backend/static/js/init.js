function init() {
    return {
        listOfProducts: [],

        async loadList() {
            console.log('Loading List');
            //this.listOfArticles= await (await fetch('/api/listAll')).json();
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

    }
}