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
            if(localStorage.getItem('cart') != null) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
            }
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

        async addProductToCart(p, ctr) {
            this.changeBack(ctr, "$"+p.price);
            this.cart.push(p);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        async viewCart() {
            this.showCart = true;
        },

        async closeCart() {
            this.showCart = false;
        },

        async delFromCart(p) {
            this.cart = this.cart.filter((c) => c != p);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },

        async changeBack(ctr, currentText) {
            ctr.innerHTML = "Added to Cart";
            this.delay(1500).then(() => {           
                ctr.innerHTML = currentText;
            });
        }

    }
}