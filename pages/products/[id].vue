<template>

    <main class="product-page">

        <div class='product-image'>
            <img :src="`/images/${product[5]}`" alt="">
        </div>

        <div class="product-information">
            <div class="information">
                <p class="product-name" v-text="`Име: ${product[1]}`"></p>
                <p class="product-make" v-text="`Марка: ${product[2]}`"></p>
                <p class="product-model" v-text="`Модел: ${product[3]}`"></p>
                <p class="product-description" v-text="`${product[4]}`"></p>
                <p class="product-price" v-text="`Цена: ${product[6]} лв.`"></p>
            </div>

            <div class="buttons">
                <div class="quantity">
                    <NuxtButton @click.native="changeQuantity('decrease')" class="quantity-minus">-</NuxtButton>
                    <p class="quantity-amount"> {{ quantity }}</p>
                    <NuxtButton @click.native="changeQuantity('increase')" class="quantity-plus">+</NuxtButton>
                </div>

                <NuxtButton @click.native="handleAddToCart" class="cart-button add-to-cart-button">Добави в количката</NuxtButton>
            </div>
        </div>

    </main>
</template>

<script lang="ts">

import type { Database } from '../../types/database.types';

export default {
    name: "ProductPage",
    data() {
        return {
            product: {},
            quantity: 1,
        }
    },
    setup() {
        //@ts-ignore
        const id = useRoute().params.id;

        const fetchProduct = async () => {
            try {
                const resp = await fetch("/products_json_data/products.json");
                const jsonData = await resp.json();
                return Object.values(jsonData[id]);
            } catch (err) {
                console.log(err);
            }
            return null;
        }

        return {
            fetchProduct
        }
    },
    async mounted() {
        this.id = this.$route.params.id;
        this.product = await this.fetchProduct();
        //@ts-ignore
        this.user = useSupabaseUser();
        //@ts-ignore
        this.client = useSupabaseClient<Database>();
    },
    methods: {
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
        async handleAddToCart () {
            //@ts-ignore
            const productData = await this.fetchProduct();
            const quantity = Number(document.querySelector(".quantity-amount")?.textContent);
            console.log(quantity);
            if (!productData) return;
            const product = {
                id: this.id,
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
        }
    }
}
</script>

<style scoped>
.product-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    padding-inline: 3rem;
    padding-block: 3.8rem;

    height: calc(100vh - 4rem);
    width: 100%;
}

.product-image {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.product-image img {
    max-width: 60%;
    border-radius: .2rem;
}

.product-information {
    display: grid;

    grid-template-columns: 1;
    grid-template-rows: 1.2fr .8fr;
    gap: 4.5rem;
}

.product-information .information {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #fff;
}

.buttons {
    display: flex;
    gap: 1.5rem;

}

.quantity {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    gap: 0;
}

.quantity>* {
    width: 1.5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    color: #fff;
    user-select: none;
    cursor: pointer;
}

.quantity>.quantity-amount {
    padding-inline: 1rem;
    width: 3rem;
}

.quantity>.quantity-plus {
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
}

.quantity>.quantity-minus {
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
}

.quantity>.quantity-minus,
.quantity>.quantity-plus {
    transition: all .2s ease-in;

    &:hover {
        background-color: #fff;
        color: #000;
    }
}

.cart-button {
    width: 100%;
    height: 3rem;
    padding: .5rem;
    color: #fff;
    border: 1px solid #fff;
    border-radius: .2rem;
    cursor: pointer;
    display: inline-block;

    text-align: center;

    transition: all .2s ease-in;

    &:hover {
        background-color: #fff;
        color: #000;
    }
}
</style>