function init() {
    return {
        listOfProducts: null,
        searchTerm:"",
        isLoading:false,
        cart:[],
        showCart:false,
        oldSearchTerm:"",

        async loadList() {            
            console.log('Loading List');
            this.isLoading = true;
            this.searchTerm = "";
            this.listOfProducts = [];
            this.listOfProducts= await (await fetch('/api/listProducts')).json();
            this.isLoading = false;
        },

        async searchThoseProducts() {
            if(this.searchTerm != "") {
                if(this.oldSearchTerm != this.searchTerm) {
                    this.oldSearchTerm = this.searchTerm;
                    
                    this.isLoading = true;
                    console.log(this.searchTerm);
                    this.listOfProducts = [];
                    this.listOfProducts= await (await fetch('/api/searchProducts/'+this.searchTerm)).json();
                    this.isLoading = false;
                }
            }
        },

        async addProductToCart(p) {
            this.cart.push(p);
        },

        async viewCart() {
            this.showCart = true;
        },

        async closeCart() {
            this.showCart = false;
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

    }
}