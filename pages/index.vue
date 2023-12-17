<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import {Pagination, Navigation, Autoplay} from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "swiper/css"

const images = [
    "img_0.jpg",
    "img_1.jpg",
    "img_2.jpg",
    "img_3.jpg"
]
</script>

<template>

    <main>
        <div class = "top-products-container">
            <h4 class = "section-header">Top products</h4>

            <Swiper
                    :modules = "[Pagination, Navigation, Autoplay]"
                    :grab-cursor = "true"
                    :loop = "true"
                    :pagination = "true"
                    :navigation = "true"
                    :autoplay = "{
                delay: 3000,
                disableOnInteraction: false
            }"
                    @slide-change = "updateSwiper()"
            >
                <SwiperSlide v-for = "image in images">
                    <img class = "carousel-image" :src="`/images/${image}`" alt="">
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
            updateSwiper: function(){}
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

.carousel-image {
    max-width: 100%;
    height: 100%;

    border-radius: .5rem;
}

</style>