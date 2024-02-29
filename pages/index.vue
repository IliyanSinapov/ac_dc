<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "swiper/css"

const fetchProducts = async () => {
    try {
        const resp = await fetch("/products_json_data/top_products.json");
        const jsonData = await resp.json();
        return Object.values(jsonData);
    } catch (err) {
        console.log(err);
    }
    return null;
}

const products = await fetchProducts();
</script>

<template>
    <main>
        <div class="top-products-container">
            <h4 class="section-header">Top products</h4>

            <Swiper :modules="[Pagination, Navigation, Autoplay]" :grab-cursor="true" :loop="true" :pagination="true"
                :navigation="true" :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false
                }" @slide-change="updateSwiper()">
                <SwiperSlide v-for="product in products">
                    <div class="top-product-container">
                        <img class="product-image" :src="`/images/${product.imagePath}`" alt="">

                        <div class="product-info">
                            <p class="product-name" v-text="product.name"></p>
                            <div>
                                <p class="product-description" v-text="`Марка: ${product.make}`"></p>
                                <p class="product-description" v-text="`Модел: ${product.model}`"></p>
                                <!-- <p class="product-description" v-text="`${product.description}`"></p> -->
                            </div>
                            <button class="product-button">Към Офертата</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </main>
</template>

<script>

//TODO: both the images/more suitable for mobile devices (not horizontal but maybe vertical)/ and the swiper should be repositioned and re-tweaked for mobile support
export default {
    name: "index",

    data() {
        return {
            updateSwiper: function () { }
        }
    },

    mounted() {

        const prevSlide = document.querySelector(".swiper-button-prev");
        prevSlide.style.color = "#fff"
        prevSlide.style.opacity = ".7"
        const nextSlide = document.querySelector(".swiper-button-next");
        nextSlide.style.color = "#fff"
        nextSlide.style.opacity = ".7"

        let paginationBullets = document.querySelectorAll(".swiper-pagination-bullet");
        let paginationBulletActive = document.querySelector(".swiper-pagination-bullet-active")


        this.updateSwiper = () => {
            paginationBullets = document.querySelectorAll(".swiper-pagination-bullet");
            for (let i = 0; i < paginationBullets.length; i++) {
                paginationBullets[i].style.width = ".7rem"
                paginationBullets[i].style.height = ".7rem"

                paginationBullets[i].style.backgroundColor = "#020202"
                paginationBullets[i].style.opacity = ".5"
            }
            paginationBulletActive = document.querySelector(".swiper-pagination-bullet-active")
            paginationBulletActive.style.backgroundColor = "#fff"
            paginationBulletActive.style.opacity = ".7"

        }

        this.updateSwiper()

        prevSlide.addEventListener("click", this.updateSwiper);
        nextSlide.addEventListener("click", this.updateSwiper);
    }
}
</script>

<style scoped>
.top-products-container {
    position: relative;
    top: 2rem;
    width: 100%;
    height: 90vh;

    margin-bottom: 2rem;
}

.section-header {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    font-size: 3svh;

    color: #fff;

    z-index: 10;
}

.swiper {
    z-index: 2;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%);

    width: 60%;
    max-height: 80%;

    border-radius: .5rem;
}

.top-product-container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.product-image {
    max-width: 70%;
    grid-column: 1;
    justify-self: center;
    align-self: center;

    border: none;
    border-radius: .2rem;
}

.product-info {
    grid-column: 2;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: .5rem;

    font-size: 1.1rem;

}

.product-name,
.product-description {
    color: #fff;

}

.product-button {
    width: 100%;
    padding: .5rem;
    margin-top: 1rem;

    background-color: #020202;
    color: #fff;

    border: none;
    border-radius: .2rem;

    cursor: pointer;
}
</style>