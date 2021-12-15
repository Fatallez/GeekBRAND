Vue.component('products', {
    data() {
        return {
            catalogUrl: 'js/json/product_list.json',
            productList: [],
        }
    },
    methods: {

    },
    mounted() {
        this.$parent.getJson(`${this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.productList.push(el);
                }
            });
    },
    template: `
        <section class="product">
            <product 
            v-for="item of productList.slice(8, 17)" 
            :key="item.id_product" 
            :img="item.img" 
            :product="item" 
            :data-id="item.id_product">
            </product>
        </section>
    `
});

Vue.component('product', {
    props: ['product'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
    <a class="product__content">
                            <div class="item__img"><img :src="product.img" alt=""></div>
                            <button class="item__add" @click="cartAPI.addProduct(product)"><img src="img/white_cart.svg" alt="">Add to cart</button>
                            <h3>{{product.product_name}}</h3>
                            <p class="price">&#36;{{product.price}}</p>
                        </a>
    `
});