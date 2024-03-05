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
                delay: 4000,
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
                            <button class="product-button">
                                <span>
                                    Към Офертата
                                </span>
                                <i class="fa-solid fa-arrow-right product-button-arrow"></i>
                            </button>
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

    border-radius: .2rem;

    background-color: #1a1a1a50;

    transition: all .2s ease-in;
}

.swiper:hover .product-image {
    opacity: 1;
}
.swiper:hover {
    filter: brightness(1.1);
}

.swiper:hover .product-button {
    background-color: #fff;
    color: #020202;
}

.top-product-container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    padding-block: 2.5rem;
}

.product-image {
    max-width: 70%;
    grid-column: 1;
    justify-self: center;
    align-self: center;

    border: none;
    border-radius: .2rem;

    opacity: .5;

    transition: .2s ease-in;
}

.product-info {
    grid-column: 2;

    padding-right: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: right;
    gap: 1rem;

    font-size: 1.1rem;
}

.product-name,
.product-description {
    color: #fff;

    text-align: right;

}

.product-button {
    width: 25%;
    padding: .5rem;
    margin-top: 1rem;

    background-color: #020202;
    color: #fff;

    border: none;
    border-radius: .2rem;

    position: absolute;
    bottom: 2.5rem;

    align-self: end;

    cursor: pointer;

    transition: .2s ease-in;

    display: flex;
    justify-content: center;
    align-items: center;
}

.product-button-arrow {
    display: none;
    color: #000;
    /* transition: all .2s ease-in; */

    animation: fadeIn .35s ease-in;
}

.product-button span {
    transition: all .35s ease-in;
}

.product-button:hover .product-button-arrow {
    display: block;
    transform: translateX(.25rem);
}

.product-button:hover span {
    transform: translateX(-.25rem);
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    75% {
        opacity: .5;
    }

    100% {
        opacity: 1;
    }
}
</style>