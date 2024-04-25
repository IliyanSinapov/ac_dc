<template>
    <main class="cart-page-content">

        <div class="cart-container products-in-cart">
            <div v-if = "products.length != 0" v-for="product in products">
                <div class="product">
                    <img :src="`/images/${product.product.imagePath}`" alt="" class="product-image">

                    <div class="product-information">
                        <p class="product-name"> {{ product.product.make }}</p>
                        <p class="product-name"> {{ product.product.model }}</p>
                    </div>

                    <div class="price-container">
                        <p class="product-price">{{ product.product.price }} лв</p>
                        <p class="price-label">Цена</p>
                    </div>

                    <div class="quantity-container">
                        <div class="quantity">
                            <NuxtButton @click.native="changeQuantity('decrease')" class="quantity-minus">-</NuxtButton>
                            <p class="quantity-amount"> {{ product.product.quantity }}</p>
                            <NuxtButton @click.native="changeQuantity('increase')" class="quantity-plus">+</NuxtButton>
                        </div>
                        <p class="quantity-label">Количество</p>
                    </div>
                </div>
            </div>

            <div class = "empty-cart" v-else = "products.lenght == 0">
                <img src="/images/svg/big-heart.svg" alt="">
                <p>Количката е празна</p>
            </div>
        </div>

        <div class="cart-container checkout-information">

            <div class="checkout-summary">
                <p class="checkout-label">Checkout Summary</p>
                <p class="checkout-total">Общо: {{ total }} лв</p>
            </div>

            <div class="buttons">

                <NuxtButton @click.native="backToShop" class="cart-button back-to-shop-button">Обратно към магазина</NuxtButton>
                <NuxtButton @click.native="handleBuy" class="cart-button buy-button">Купи</NuxtButton>

            </div>

        </div>

    </main>
</template>

<script lang="ts">
import type { Database } from '../types/database.types';

export default {
    name: "Cart",

    data() {
        return {
            products: [] as any[],
            total: 0,
        }
    },

    mounted() {
        //@ts-ignore
        const user = useSupabaseUser();
        //@ts-ignore
        const client = useSupabaseClient<Database>();
        let products;

        const fetchUserProduts = async () => {
            try {
                if (user == null || user.value == null || user.value.id == null)
                    throw Error("Please Login / Register.")

                const userId = user.value.id;
                const { data, error } = await client.from("cart").select("product").eq("user_id", userId);

                if (error) throw error;

                products = data;
                console.log(products);
                this.products = products;

                this.total = products.reduce((acc, product) => acc + product.product.price * product.product.quantity, 0);

                console.log(this.total);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchUserProduts();


    },

    methods: {
        backToShop() {
            this.$router.push("/")
        },
        changeQuantity(type: string) {
            const quantity = document.querySelector(".quantity-amount") as HTMLElement;
            let currentQuantity = Number(quantity.textContent);

            if (type === "increase") {
                currentQuantity++;
            } else {
                if (quantity.textContent === "1") return;
                currentQuantity--;
            }

            quantity.textContent = currentQuantity.toString();
        },
        async handleBuy() {
            //@ts-ignore
            const user = useSupabaseUser();
            //@ts-ignore
            const client = useSupabaseClient<Database>();
            const userId = user.value.id;

            const { data, error } = await client.from("cart").delete().eq("user_id", userId);

            if (error) {
                console.log(error);
                return;
            }

            this.$router.push("/checkout");
        }
    }
}
</script>

<style scoped>
.cart-page-content {

    color: #fff;

    width: 100%;
    height: calc(100vh - 4rem);

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    padding-inline: 3rem;
    padding-block: 3.8rem;

    gap: 3rem;
}

.cart-container {
    width: 100%;
    height: calc(100vh - 4rem - 4rem - 3rem);

    background-color: rgba(42, 42, 42, 0.385);
    border-radius: .5rem;

    overflow: scroll;
}

.products-in-cart {
    grid-column: 1;
    display: flex;
    flex-direction: column;
}

.checkout-information {
    grid-column: 2;

    padding: 1rem;

    display: grid;

    grid-template-columns: 1;
    grid-template-rows: .7fr .3fr;
}

.checkout-information .buttons {
    display: flex;
    gap: .5rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    padding-block: .5rem;
}

.checkout-summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: .4rem;
    background-color: #02020233;
    align-items: flex-end;
}

.checkout-information .buttons .cart-button {
    width: 100%;
    padding: .5rem;

    background-color: #02020211;
    border: 1px solid #fff;
    color: #fff;

    border-radius: calc(.3rem + .2rem);

    text-align: center;

    cursor: pointer;

    transition: all .25s ease-in;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);

    &:hover {
        background-color: #fff;
        color: #020202;
        box-shadow: 0 0 1rem .5rem #ffffff51;
    }
}

.products-in-cart>div {
    padding-block: 1rem;
    padding-inline: 1rem;
}

.product {
    max-width: 100%;
    height: auto;
    max-height: 11.5rem;
    padding-block: 2.5rem;
    padding-inline: 1.5rem;
    display: flex;
    gap: .3rem;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    font-size: 1.15rem;

    border-radius: .4rem;
    background-color: #02020233;

    transition: all .15s ease-in;

    &:hover {
        background-color: #02020255;
        padding-inline: 1rem;
        padding-block: 2rem;
    }
}

.product .product-image {
    max-width: 30%;
    max-height: calc(11.5rem - 2rem);
    border-radius: .2rem;
}

.product .quantity-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .5rem;

}

.product .quantity-container .quantity {
    display: flex;
    gap: 1rem;
    gap: 0;
    justify-content: center;
}

.product .quantity-container .quantity>* {
    width: 1.5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ffffff81;
    color: #fff;
    user-select: none;
    cursor: pointer;
}

.product .quantity-container .quantity>.quantity-amount {
    padding-inline: 1rem;
    width: 3rem;
}

.product .quantity-container .quantity>.quantity-plus {
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
}

.product .quantity-container .quantity>.quantity-minus {
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
}

@media screen and (max-width: 1020px) {
    .cart-page-content {
        display: flex;
        flex-direction: column;
        height: calc(200vh - 4rem - 4rem - 3rem);
    }

    .cart-page-content>div {
        width: 100%;
        height: 50%;
    }
}

@media screen and (max-width: 550px) {
    .product {
        flex-direction: column;
        gap: 1rem;
        padding-block: 1rem;
        padding-inline: 1rem;
        max-height: 40rem;
    }

    .product .product-image {
        max-width: 70%;
        max-height: 100%;
    }

    .product-information {
        display: flex;

        gap: 1rem;
    }

    .price-container {
        display: flex;
        gap: .5rem;
    }

    .quantity-label {
        display: none;
    }
}

.empty-cart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-block: 1rem;
    padding-inline: 1rem;
}
</style>