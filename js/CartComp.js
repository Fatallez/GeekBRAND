Vue.component('cart', {
    data() {
        return {
            cartUrl: 'js/json/cart_list.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod)
            }},
        remove(item) {
            if(item.quantity > 1) {
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }},
        countCartPrice() {
            let totalPrice = 0;
            for(let i = 0; i < this.cartItems.length; i++) {
                totalPrice = totalPrice + (this.cartItems[i].quantity * this.cartItems[i].price);
            }
            return totalPrice;
        },
    },
    mounted() {
        this.$parent.getJson(`${this.cartUrl}`)
            .then(data => {
                for(let el of data){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div class="header__cart">
            <a href="#" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart"></a>
            <div class="hcart__drop" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <div v-else>
                    <table>
                    <cart-item class="cart-item" 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item"     
                    @remove="remove">
                    </cart-item>
                    </table>
                    <div class="total">
                        <p>total</p>
                        <p>&#36;{{countCartPrice()}}</p>
                    </div>
                    <div class="cart__button">
                        <a href="checkout.html" class="checkout__button">Checkout</a>
                        <a href="shopping_cart.html" class="goto__cart">Go to cart</a>
                    </div>
                </div>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <tr class="cart__row">
                    <td><img :src="cartItem.img" alt=""></td>
                    <td class="cart__info">
                        <a href="#" class="item__name">{{cartItem.product_name}}</a>
                        <p class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
                        <p class="quantity__price">{{cartItem.quantity}}  x  {{cartItem.price}}</p>
                    </td>
                    <td class="table__action"><a href="#" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></a></td>
                </tr>
    `
});
