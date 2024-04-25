<template>
    <div class="sidebar sidebar-container">

        <div class="sidebar-information">
            <div class="user-information">
                <div class="user-avatar-icon">
                    <img :src="user_avatar" alt="User Avatar" class="user-avatar" />
                </div>
                <p class="user-username" v-text="user_username"></p>
                <input type="file" id="fileInput" style="display: none" @change="handleFileUpload" />
                <NuxtLink @click.native="openFileSelector" class="view-profile-link">Качи профилна снимка</NuxtLink>
            </div>

            <div>
                <ul class="sidebar-list">
                    <li class="sidebar-item">
                        <NuxtLink @click.native = "handleSidebarLink" to="/products/" class="sidebar-link">Начало</NuxtLink>
                    </li>
                    <li class="sidebar-item">
                        <NuxtLink @click.native = "handleSidebarLink" to="/products/" class="sidebar-link">Продукти</NuxtLink>
                    </li>
                    <li class="sidebar-item">
                        <NuxtLink @click.native = "handleSidebarLink" to="/cart" class="sidebar-link">Количка</NuxtLink>
                    </li>
                    <li class="sidebar-item">
                        <NuxtLink @click.native = "handleSidebarLink" to = "/about" class="sidebar-link">За мен</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="!isUserLoggedIn.valueOf()" class="guest-user-information">
            <ul class="sidebar-guest-list">
                <li class="sidebar-item">
                    <NuxtLink @click.native="handleSidebarLink" to="/auth/login" class="nav-link">Влез</NuxtLink>
                </li>
                <li class="sidebar-item">
                    <NuxtLink @click.native="handleSidebarLink" to="/auth/register" class="nav-link">Регистриране</NuxtLink>
                </li>
            </ul>
        </div>

        <div v-if="isUserLoggedIn.valueOf()" class="guest-user-information">
            <ul class="sidebar-guest-list">
                <li class="sidebar-item">
                    <NuxtLink @click.native="handleLogout" class="nav-link">Излез</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import type { Database } from '~/types/database.types';

export default {
    name: "Sidebar",

    data() {
        return {
            path: "/"
        }
    },

    setup() {
        const user = useSupabaseUser();
        const client = useSupabaseClient<Database>();
        let user_username: any = ref("");
        const user_avatar: any = ref("");
        let isUserLoggedIn = ref(false);

        const handleLogout = async () => {
            try {
                const { error } = await client.auth.signOut();
                if (error) throw error

                window.location.href = "/"
                isUserLoggedIn.value = false;
            } catch (error: any) {
            }
        }

        const handleUsername = async () => {
            try {
                if (user == null || user.value == null || user.value.id == null)
                    throw Error("Guest User.")

                const userId = user.value.id;
                const { data, error } = await client.from("user_information").select("username").eq("user_id", userId);

                if (error) throw error;

                user_username.value = data[0].username;

                isUserLoggedIn.value = true;
            } catch (error: any) {
                user_username.value = error.message;
            }
        }

        const handleSidebarLink = () => {
            const body = document.querySelector("body")!!;
            const sidebar = document.querySelector(".sidebar-component")!!

            if (body.classList.contains("menu-open")) {
                body.classList.remove("menu-open")
                sidebar.classList.remove("sidebar-active")
            }
        }

        const openFileSelector = () => {
            document.getElementById("fileInput")!!.click();
        }

        const handleFileUpload = async (event: any) => {
            const file = event.target.files[0];

            const newFilename = file.name.replace(/(\.[^.]+$)/, `_${user.value?.id}$1`);

            console.log(newFilename);

            try {

                const { data: userData, error: userError } = await client.from("user_information").select("relative_avatar_path").eq("user_id", user.value?.id);

                if (userData !== null) {
                    const { data:removeFileData, error: removeFileError } = await client.storage.from('user_avatars').remove([userData[0].relative_avatar_path]);
                }

                const newFile = new File([file], newFilename, { type: file.type })

                console.log(newFile.name);

                const { data, error } = await client.storage
                    .from('user_avatars')
                    .upload(`public/${newFile.name}`, newFile);

                if (error) throw error;

                const { data: user_data, error: user_error } = await client
                    .from("user_information")
                    .update({ avatar_image: client.storage.from('user_avatars').getPublicUrl(data.path).data.publicUrl })
                    .eq("user_id", user.value?.id);

                const { data: userUploadData, error: userUploadError } = await client.from("user_information")
                    .update({ relative_avatar_path: data.path })
                    .eq("user_id", user.value?.id);

                handleAvatar();

                window.location.reload();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        const handleAvatar = async () => {
            if (user.value == null || user.value.id == null)
                return;

            const userId = user.value.id;
            const { data, error } = await client.from("user_information").select("avatar_image").eq("user_id", userId);

            if (error || data[0].avatar_image === null) return;

            user_avatar.value = data[0].avatar_image;

        }

        return { ...toRefs({ user, user_username, user_avatar, handleUsername, isUserLoggedIn, handleLogout, handleSidebarLink, openFileSelector, handleFileUpload, handleAvatar }) }
    },

    mounted() {

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

        this.handleUsername();
        this.handleAvatar();
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
    height: 94vh;

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
    overflow: hidden;
}

.user-avatar {
    width: 100%;

    transform: translateY(-100%);

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
    width: 100%;
    padding-block: 1rem;
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