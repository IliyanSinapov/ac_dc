<template>
    <main class="about-page">

        <img class="about-image" src="/images/about_image.jpg" alt="">

        <div class="about-info">

            <div class="name-container">
                <h4>Име: </h4>
                <h4 class="name"> Илиян Синапов</h4>
            </div>

            <div class = "projects-container">
                <h4>Проекти:</h4>
                
                <NuxtLink @click.native = "openGithub" >GitHub</NuxtLink>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "About",

    data() {

    },

    methods: {
        openGithub() {
            window.open("https://github.com/iliyansinapov", "_blank");
        }
    }
}
</script>

<style scoped>

a {
    color: #ffffff;
    text-decoration: underline;
    cursor: pointer;
}

.about-page {
    width: 100;
    height: calc(100vh - 4rem);

    padding-block: 3.8rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 4rem;

    color: #fff;
}

.about-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    width: 100%;
}

.about-image {
    width: 17.5%;

    border-radius: .3rem;

    box-shadow: 0rem 0rem 1.3rem .75rem rgba(0, 0, 0, 0.5);
}

.name-container {
    display: flex;
    justify-content: space-between;
    width: 17.5%;
}

.projects-container {
    display: flex;
    justify-content: space-between;
    width: 17.5%;
}
</style>