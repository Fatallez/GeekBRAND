Vue.component('shopping-cart', {
    data() {
        return {
            cartUrl: 'js/json/cart_list.json',
            cartItems: [],
            couponDiscount: '10',
            couponNames: ['geek10'],
            couponInput: '',
        }
    },
    methods: {
        remove(item) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1)
            },

        // countDiscountPrice(couponInput) {
        //     let totalPrice = 0;
        //     let find = this.couponNames.find(input => this.couponNames === couponInput);
        //     if (find) {
        //         for(let i = 0; i < this.cartItems.length; i++) {
        //             totalPrice = totalPrice + (this.cartItems[i].quantity * this.cartItems[i].price);
        //         }
        //         return totalPrice-(totalPrice * 10 / 100);
        //     } else return this.totalCartPrice();
        // },  не уверен, что правильно описал функцию

        totalCartPrice() {
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
                <div>
                <section class="container shopping__cart">
                    <div>
                        <p v-if="!cartItems.length">Корзина пуста</p>
                        <div v-else>
                             <table class="cart__table">
                                <tr class="table__h3">
                                    <td class="product__details">Product Details</td>
                                    <td>Unite Price</td>
                                    <td>Quantity</td>
                                    <td>Shipping</td>
                                    <td>Subtotal</td>
                                    <td>Action</td>
                                </tr>
                                <shopping-cart-item
                                v-for="item of cartItems"
                                :key="item.id_product"
                                :cart-item="item"     
                                @remove="remove">
                                </shopping-cart-item>
                            </table>
                        </div>
                    </div>
                    <div class="cart__buttons">
                    <input type="reset" value="Clear Shopping Cart"><input type="button" value="Continue Shopping">
                </div>
            </section>
            <section class="container checkout">
                <div class="shipping__address">
                    <h3>Shipping Address</h3>
                    <form>
                        <select name="address">
                            <option value="Limpopo">Limpopo</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="China">China</option>
                        </select>
                        <input type="text" placeholder="State">
                        <input type="text" placeholder="Postcode / Zip">
                        <input type="submit" value="get a quote">
                    </form>
                </div>
                <div class="coupon__discount">
                    <h3>coupon discount</h3>
                    <p>Enter your coupon code if you have one</p>
                    <form>
                        <input type="text" placeholder="Enter code here" v-model.lazy="couponInput">
                        <input type="submit" value="Apply coupon">
                    </form>
                </div>
                <div class="check">
                    <h4 class="sub__total">Sub total <span class="check__price">&#36;{{totalCartPrice()}}</span></h4>
                    <h3 class="grand__total">GRAND TOTAL <span class="check__price red__price">&#36;{{totalCartPrice()}}</span></h3>
                    <a href="#" class="proceed">proceed to checkout</a>
                </div>
            </section>
                </div>
`
});

Vue.component('shopping-cart-item', {
    props: ['cartItem'],
    template: `
            <tr class="product__row">
                <td class="product__details"><img :src="cartItem.img" alt=""><div class="pd__text"><a href="#"><h3>{{cartItem.product_name}}</h3></a>
                    <p>Color: <span>Red</span><br>Size: <span>Xll</span></p></div></td>
                <td class="table__price">&#36;{{cartItem.price}}</td>
                <td class="table__quantity"><input type="number" v-model="cartItem.quantity"></td>
                <td class="table__shipping">free</td>
                <td class="table__subtotal">&#36;{{cartItem.quantity*cartItem.price}}</td>
                <td class="table__action"><a href="#" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></a></td>
            </tr>
`
});