function init() {
    return {
        listOfProducts: null,
        searchTerm:"",

        async loadList() {
            console.log('Loading List');            
            this.listOfProducts = null;
            this.listOfProducts= await (await fetch('/api/listProducts')).json();
        },

        async searchThoseProducts() {
            console.log(this.searchTerm);
            this.listOfProducts = null;
            this.listOfProducts= await (await fetch('/api/searchProducts/'+this.searchTerm)).json();
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

    }
}