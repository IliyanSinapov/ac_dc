<template>
    <div class="sidebar sidebar-container">

        <div class = "sidebar-information">
            <div class="user-information">
                <div class="user-avatar-icon"></div>
                <p class="user-username">IliyanKS</p>
                <NuxtLink to = "/auth/account" class="view-profile-link">View Profile</NuxtLink>
            </div>

            <div>
                <ul class="sidebar-list">
                    <li class="sidebar-item">
                        <NuxtLink class="sidebar-link">Products</NuxtLink>
                        <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </li>
                    <li class="sidebar-item">
                        <NuxtLink class="sidebar-link">Contacts</NuxtLink>
                        <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </li>
                    <li class="sidebar-item">
                        <NuxtLink class="sidebar-link">About</NuxtLink>
                        <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </li>
                </ul>
            </div>
        </div>

        <div class="guest-user-information">
            <ul class="sidebar-guest-list">
                <li class="sidebar-item">
                    <NuxtLink to = "/auth/login" class="nav-link">Log In</NuxtLink>
                </li>
                <li class="sidebar-item">
                    <NuxtLink to = "/auth/register" class="nav-link">Register</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",

    data() {
        return {
            user: {
                username: "IliyanKS"
            }
        }
    },

    mounted () {

        const sidebarItems = document.querySelectorAll(".sidebar-item");
        for (let i = 0; i < sidebarItems.length; i++)
            sidebarItems[i].addEventListener("click", () => {
                if (sidebarItems[i].classList.contains("item-active"))
                    sidebarItems[i].classList.remove("item-active")
                else {
                    sidebarItems[i].classList.add("item-active");

                    for (let j = 0; j < sidebarItems.length; j++) {
                        if (j == i)
                            continue
                        sidebarItems[j].classList.remove("item-active")
                    }
                }
            })

        //TODO: THIS BELOW NEEDS SERIOUS WORK
        // const userInformation = document.querySelector(".user-information");
        // const guestUserInformation = document.querySelector(".guest-user-information");
        //
        // if (userInformation.style.display === "none")
        //     guestUserInformation.style.display = "block";
        // else
        //     guestUserInformation.style.display = "none";
    }
}
</script>

<style scoped>

.sidebar-container {
    background-color: #020202;
    padding-inline: 1.9rem;

    position: absolute;
    bottom: 0;
    left: 0;

    width: 25vw;
    height: 95vh;

    opacity: .9;

    transform: translateX(-25vw);

    transition: transform .5s ease-in-out;
}

body.menu-open .sidebar-container {
    transform: translateX(0);
}

.sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-block: 1.9rem;
    padding-bottom: 3rem;


}

.nav-link {
    color: rgba(255, 255, 255, 0.65);

    cursor: pointer;
}

.nav-link:hover {
    background-color: transparent;
}

.sidebar-information {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.user-information {
    display: flex;
    flex-direction: column;

    align-items: center;

}

.user-avatar-icon {
    width: 30%;
    height: 0;
    padding-top: 30%;
    background-color: #fff;

    opacity: 1;

    border-radius: 50%;
}

.view-profile-link {
    color: #656564;
    font-size: 1rem;
    cursor: pointer;
}

.user-username {
    color: #fff;
    font-size: 1.6rem;
    margin-top: .4rem;
}

.sidebar-item {
    border-top: solid 1px #fff;
    border-bottom: solid 1px #fff;

    background-color: transparent;

    transition: .25s ease-in-out;
    font-size: 1.2rem;

    cursor: pointer;

    padding-block: 1rem;
    padding-inline: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-information {
    transform: translateX(-100%);
    transition: .5s ease-in-out;
    opacity: 0;
}

.sidebar-list {
    list-style: none;
}

.sidebar-item:hover {
    background-color: rgba(59, 59, 59, 0.35);
}

.arrow-icon {
    color: #fff;
    transition: .25s ease-in-out;
}

.sidebar-item.item-active .arrow-icon {
    transform: rotate(90deg);
}

.sidebar-link {
    color: #fff;
}

.sidebar-guest-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    list-style: none;

    margin-bottom: 2rem;
    .sidebar-item {
        border: none;

        background-color: transparent;

        padding-block: .25rem;

        font-size: 1.1rem;
    }
}

body.menu-open .sidebar-information {
    opacity: 1;
    transform: translateX(0);
    transition-delay: .15s;
}

@media (max-width: 1080px) {
    .sidebar-container {
        width: 100vw;
        height: 94.86svh;
        transform: translateX(-100vw);

        background-color: rgba(2, 2, 2, 0.9);

        transition: transform .5s ease-in-out;

        opacity: 1;
    }

    body.menu-open .sidebar-container {
        transform: translateX(0);
    }
}
</style>