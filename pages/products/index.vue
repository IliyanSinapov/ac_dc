<template>
    <main class="product-page">
        <div class="products-container">
            <div v-if="products.length != 0" v-for="product in products">
                <div class="product" :id = "`${product.id}`">
                    <img :src="`/images/${product.imagePath}`" alt="" class="product-image">

                    <div class="product-information">
                        <p class="product-name"> {{ product.make }}</p>
                        <p class="product-name"> {{ product.model }}</p>
                    </div>

                    <div class="price-container">
                        <p class="product-price">{{ product.price }} лв</p>
                        <p class="price-label">Цена</p>
                    </div>

                    <div class="buttons">
                        <NuxtButton @click.native="goToProduct(product.id)" class="product-button">
                            <span>
                                Към Офертата
                            </span>
                            <i class="fa-solid fa-arrow-right product-button-arrow"></i>
                        </NuxtButton>

                        <NuxtButton @click.native="handleAddToCart(product.id)" class="add-to-cart-button product-button">
                            <span>
                                Добави в количката
                            </span>
                            <i class="fa-solid fa-cart-plus product-button-cart"></i>
                        </NuxtButton>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

import type { Database } from '../..//types/database.types';

export default {
    name: "index",

    data() {
        return {
            products: [] as any[],
        }
    },
    async mounted() {
        //@ts-ignore
        this.user = useSupabaseUser();
        //@ts-ignore
        this.client = useSupabaseClient<Database>();

        let products;

        const fetchUserProduts = async () => {
            const resp = await fetch("/products_json_data/products.json");
            const jsonData = await resp.json();
            products = Object.values(jsonData);
            this.products = products;
        }
        fetchUserProduts();
    },
    methods: {
        async fetchProduct (id: any) {
            try {
                const resp = await fetch("/products_json_data/products.json");
                const jsonData = await resp.json();
                return Object.values(jsonData[id]);
            } catch (err) {
                console.log(err);
            }
            return null;
        },
        async handleAddToCart (id: any) {
            //@ts-ignore
            const productData = await this.fetchProduct(id);
            const quantity = 1;
            if (!productData) return;
            const product = {
                id: id,
                quantity: quantity,
                make: productData[1],
                model: productData[2],
                name: productData[3],
                description: productData[4],
                imagePath: productData[5],
                price: productData[6]
            }

            const { data, error } = await this.client.from("cart").insert({
                user_id: this.user.value.id,
                product: product
            }).eq("user_id", this.user.value.id);

            if (error) {
                console.log(error);
                return;
            }
        },
        goToProduct(productId) {
            this.$router.push(`/products/${productId}`)
        }
    },

}
</script>

<style scoped>
.product-page {
    width: 100%;
    min-height: calc(100vh - 4rem);

    padding-block: 3.8rem;
    padding-inline: 4rem;
}

.products-container>div {
    margin-bottom: 1.5rem;
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

.buttons {
    display: flex;
    flex-direction: column;
    width: 35%;
    gap: 1.5rem;
}

.product-button {
    width: 100%;

    background-color: #020202;
    color: #fff;

    border: none;
    border-radius: .2rem;

    align-self: end;

    cursor: pointer;

    transition: .2s ease-in;

    display: flex;
    justify-content: center;
    align-items: center;
}

.product-button-arrow,
.product-button-cart {
    color: #fff;
    transform: translateX(.25rem);
    transition: .35s ease-in;
}

.product-button span {
    transition: all .35s ease-in;
}

.product-button:hover {
    background-color: #fff;
    color: #020202;

}

.product-button:hover .product-button-arrow,
.product-button:hover .product-button-cart {
    color: #000;
}

.product-button span {
    transform: translateX(-.25rem);
}

@media screen and (max-width: 1020px) {
    .buttons {
        width: 100%;
    }
}
</style>