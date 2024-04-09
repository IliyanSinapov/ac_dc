<template>
    <main class = "checkout">
        <h1 cclass = "checkout-title">Благодарим за покупката!</h1>
        
        <NuxtButton @click.native="this.$router.push('/')" class = "back-to-shop">Обратно към магазина</NuxtButton>
    </main>
</template>

<script>
export default {
    // Your component options here
}
</script>

<style scoped>
    .checkout {
        width: 100;
        height: calc(100vh - 4rem);

        padding-block: 3.8rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;

        color: #fff;
    }

    .checkout-title {
        font-size: 2rem;
    }

    .back-to-shop {
        padding: .5rem 1rem;
        background-color: #020202;
        color: #fff;
        border: none;
        border-radius: .2rem;
        cursor: pointer;
        transition: .25s ease-in-out;

        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);

        &:hover {
            background-color: #fff;
            color: #020202;
            box-shadow: 0 0 1rem .5rem #ffffff51;
        }
    }
</style>