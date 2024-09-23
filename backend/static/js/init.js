function init() {
    return {
        listOfProducts: null,
        searchTerm:"",
        isLoading:false,

        async loadList() {            
            console.log('Loading List');
            this.isLoading = true;
            this.searchTerm = "";
            this.listOfProducts = [];
            this.listOfProducts= await (await fetch('/api/listProducts')).json();
            this.isLoading = false;
        },

        async searchThoseProducts() {
            this.isLoading = true;
            console.log(this.searchTerm);
            this.listOfProducts = [];
            this.listOfProducts= await (await fetch('/api/searchProducts/'+this.searchTerm)).json();
            this.isLoading = false;
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

    }
}