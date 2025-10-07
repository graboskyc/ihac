function init() {
    return {
        listOfProducts: null,
        listOfFacets: null,
        searchTerm:"",
        isLoading:false,
        cart:[],
        showCart:false,
        oldSearchTerm:"",
        selectedFacets: [],
        inCheckout: false,
        inDescription:false,
        selectedItem:{},
        checkoutForm:false,
        regionsList:["en-us","ko-kr"],
        somethingSoldOut:false,

        async loadAll() {
            this.loadList();
            this.loadFacets();
        },

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

        async loadFacets() {            
            console.log('Loading Facets');
            this.listOfFacets = [];
            this.listOfFacets= await (await fetch('/api/listFacets')).json();
            this.selectedFacets = this.listOfFacets;
            this.selectedFacets.push("en-us", "ko-kr");
        },

        async searchThoseProducts() {
            this.isLoading = true;
            console.log(this.searchTerm);
            this.listOfProducts = [];
            this.listOfProducts=  await(await fetch('/api/searchProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({searchTerm: this.searchTerm, facets: this.selectedFacets})
            })).json();
            this.isLoading = false;
        },

        async addProductToCart(p, ctr) {
            this.changeBack(ctr, "$"+p.price);
            this.cart.push(p);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        async viewCart() {
            this.showCart = true;
            this.inCheckout = false;
            this.checkoutForm = false;
            this.inDescription = false;
        },

        async viewDescription(item) {
            this.selectedItem = item;
            this.showCart = false;
            this.inCheckout = false;
            this.checkoutForm = false;
            this.inDescription = true;
        },

        async closeDialogs() {
            this.showCart = false;
            this.inCheckout = false;
            this.checkoutForm = false;            
            this.inDescription = false;
        },

        async openCheckout() {
            this.inCheckout = true;
            this.checkoutForm = false;
            this.somethingSoldOut = false;
        },

        async tryCheckout() {            
            this.inCheckout = true;
            var result = await (await fetch('/api/checkout')).json();
            this.checkoutForm = result["success"];
            this.somethingSoldOut = !result["inStock"];
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