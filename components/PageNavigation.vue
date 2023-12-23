<template>
    <header class="page-header">
        <nav class="navigation-container navbar">
            <div>

                <Sidebar class = "sidebar-component"/>

                <svg class="vbp-header-menu-button__svg">
                    <line x1="0" y1="50%" x2="100%" y2="50%" class="top" shape-rendering="crispEdges" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" class="middle" shape-rendering="crispEdges" />
                </svg>



                <NuxtLink to = "/" style="margin-left: 3rem; margin-right: 3.5rem;" class="nav-link">AC/DC</NuxtLink>
            </div>

            <div class="searchbar-container field">
                <input class="search-field" type="text" placeholder="Search" name="searchbar">
            </div>

            <div class="user-essentials">
                <p class="username-paragraph">{{ user.username }}</p>
                <div class = "nav-icon">
                    <NuxtLink to = "/auth/account" @click = "" class = "nav-link"><i class="fa-regular fa-user user-icon"></i></NuxtLink>
                </div>
                <NuxtLink to = "/" class = "nav-link logout-icon"><i class="fa-solid fa-arrow-right-from-bracket"></i></NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
export default {
    name: "PageNavigation",

    data() {
        return {
            user: {
                username: "IliyanKS"
            }
        };
    },

    mounted() {
        const body = document.querySelector("body")!!;
        const button = document.querySelector(".vbp-header-menu-button__svg")!!
        const sidebar = document.querySelector(".sidebar-component")!!;
        const lines = document.querySelectorAll("line")!!;

        button.addEventListener("click", () => {
            if (body.classList.contains("menu-open")) {
                body.classList.remove("menu-open")
                sidebar.classList.remove("sidebar-active")
            }
            else {
                body.classList.add("menu-open")
                sidebar.classList.add("sidebar-active")
            }
        })
    },

    methods() {
        const linkClicked = (): void => {

        }
    }
}
</script>

<style scoped>
.page-header {
    background-color: #020202;
}

.navigation-container {
    max-width: 96vw;
    margin-inline: auto;
    padding-inline: 1.9rem;
}

.navbar {
    padding-block: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.searchbar-container {
    display: flex;
    justify-content: center;

    width: 50%;
}

.search-field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #fff;
    outline: 0;
    font-size: 1.6vh;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    text-align: center;
}

.user-essentials {
    display: flex;

    align-items: center;

    transition: opacity .25s;

    opacity: 1;
}

body.menu-open .user-essentials{
    opacity: 0;
}

.username-paragraph {
    color: #fff;
}

.nav-icon {
    cursor: pointer;

    min-width: 20%;
    min-height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 1rem;

    border: 2px solid rgba(208, 177, 177, 0.26);
    border-radius: .25rem;
}

.nav-icon:hover {
    box-shadow: rgba(167, 167, 167, 0.26) 0 0 1rem .05rem;
}

.user-icon {
    color: #fff;
}

.logout-icon {
    margin-left: 3rem;
}

.nav-link {
    color: #fff;

    cursor: pointer;
    border-radius: .2rem;
}

.nav-link:hover {
    background-color: transparent;

}


.vbp-header-menu-button__svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transform: scaleX(-1);
    transition: transform .3s;
}

.vbp-header-menu-button__svg line {
    stroke: #fff;
    stroke-dasharray: 100%;
    stroke-dashoffset: 0%;
    transition: transform 0.3s, stroke-dashoffset .4s;
    transform-origin: center;
    stroke-width: 3px;
}

.vbp-header-menu-button__svg .top {
    transform: translateY(35%);
}



.vbp-header-menu-button__svg .middle {
    transform: scaleX(1);
    transition: opacity .3s, transform .3s;

}
body.menu-open .vbp-header-menu-button__svg {
  transform: translateY(20%);
}

body.menu-open .vbp-header-menu-button__svg .top {
    transform: rotate(45deg);
    stroke-linecap: round;
}

body.menu-open .vbp-header-menu-button__svg .middle {
    transform: rotate(-45deg);
    stroke-linecap: round;
}

.sidebar-component {
    z-index: 99;
}

@media (max-width: 1080px) {
    .searchbar-container {
        display: none;
    }
}

@media (max-width: 767px){
    .user-essentials {
        display: none;
    }
}

</style>