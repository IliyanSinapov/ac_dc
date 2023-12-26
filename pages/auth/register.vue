<template>
    <div class="login-form-container">
        <form class="login-form" @submit.prevent="signUp">
            <div class="form-header">
                <h2>Register</h2>
            </div>

            <div class="field-group">
                <div class="form-group field">
                    <input class="form-field" :class="{
                        'is-username-focused': isUsernameFocused,
                        'username-has-text': usernameHasText
                    }" v-model="username" @focus="isUsernameFocused = true" @blur="isUsernameFocused = false"
                        type="text" name="username" id="username">
                    <label class="form-label" for="username">Username</label>
                </div>

                <div class="field-group">
                    <div class="form-group field">
                        <input class="form-field" :class="{
                            'is-email-focused': isEmailFocused,
                            'email-has-text': emailHasText
                        }" v-model="email" @focus="isEmailFocused = true" @blur="isEmailFocused = false" type="email"
                            name="email" id="email">
                        <label class="form-label" for="email">Email</label>
                    </div>
                </div>

                <div class="form-group field">
                    <input class="form-field" :class="{
                        'is-password-focused': isPasswordFocused,
                        'password-has-text': passwordHasText
                    }" v-model="password" @focus="isPasswordFocused = true" @blur="isPasswordFocused = false"
                        type="password" name="password" id="password">
                    <label class="form-label" for="password">Password</label>
                </div>

                <div class="form-group field">
                    <input class="form-field" :class="{
                        'is-confirm-password-focused': isConfirmPasswordFocused,
                        'confirm-password-has-text': confirmPasswordHasText
                    }" v-model="confirmPassword" @focus="isConfirmPasswordFocused = true"
                        @blur="isConfirmPasswordFocused = false" type="password" name="confirm-password"
                        id="confirm-password">
                    <label class="form-label" for="confirm-password">Confirm Password</label>
                </div>
            </div>

            <p v-text="successMsg" class="success-msg" :class="{ 'success-msg-has-text': successMsgHasText }" />
            <p v-text="errorMsg" class="error-msg" :class="{ 'error-msg-has-text': errorMsgHasText }" />

            <button class="btn login-button" type="submit">Register</button>
        </form>
    </div>
</template>
<script lang="ts">
import type { Database } from '~~/types/database.types';

export default {
    name: "register",

    data() {
        return {
            isUsernameFocused: false,
            isEmailFocused: false,
            isPasswordFocused: false,
            isConfirmPasswordFocused: false
        };
    },
    setup() {
        definePageMeta({
            layout: "auth"
        })

        const client = useSupabaseClient<Database>()

        const username = ref("");
        const email = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const errorMsg = ref("")
        const successMsg = ref("");

        const signUp = async () => {

            const user_name = username.value;
            try {
                if (password.value != confirmPassword.value)
                    throw new Error("Passwords don't match!");
                else if (username.value = "")
                    throw new Error("Username should not be empty!")
                else if (((password.value != confirmPassword.value) ||
                    password.value == "" ||
                    confirmPassword.value == "") &&
                    email.value == "" &&
                    username.value == "") throw new Error("Please fill the requared fields!")

                const { data, error } = await client.auth.signUp({
                    email: email.value,
                    password: password.value
                })

                if (error) throw error;
                successMsg.value = "Check your email to confirm account."

                const { data: responce } = await client
                    .from("user_information")
                    .insert({
                        // @ts-ignore
                        user_id: data.user.id,
                        username: user_name
                    })
                
                window.location.href = "/auth/login"
            } catch (error: any) {
                errorMsg.value = error.message;
            }
        }

        return { ...toRefs({ username, email, password, confirmPassword, successMsg, errorMsg, signUp }) }
    },

    computed: {
        usernameHasText(): boolean {
            return this.username.trim().length > 0 && !this.isUsernameFocused;
        },
        emailHasText(): boolean {
            return this.email.trim().length > 0 && !this.isEmailFocused;
        },
        passwordHasText(): boolean {
            return this.password.trim().length > 0 && !this.isPasswordFocused;
        },
        confirmPasswordHasText(): boolean {
            return this.confirmPassword.trim().length > 0 && !this.isConfirmPasswordFocused;
        },
        successMsgHasText(): boolean {
            return this.successMsg.trim().length > 0;
        },
        errorMsgHasText(): boolean {
            return this.errorMsg.trim().length > 0;
        }
    }
}
</script>

<style scoped>
.background-gradient {
    background: linear-gradient(-45deg, #03212a, #006278);
    ;
    background-size: 200% 200%;
    animation: gradient 1s ease infinite;
    z-index: -1;
    position: absolute;
    width: 100vw;
    height: 94.5vh;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
}

.login-form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


    width: 27svw;
    height: 58svh;

    border-radius: .5rem;

    border: 1px solid #fff;

    background-color: rgba(2, 2, 2, 0.9);

    padding-block: 1.9rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.2rem;

    padding-inline: 1.5rem;

    height: 100%;
}

.form-header {
    color: #fff;

    font-size: 1.6rem;
}

.field-group {
    width: 100%;
}

.form-group {

    margin-top: 2rem;

    width: 100%;
    height: 3.2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #fff;
    border-radius: 2rem;

    padding: 0;
}

.form-field {
    width: 100%;
    min-height: 100%;

    color: #fff;


    border-radius: 2rem;
    border: none;

    padding-inline: 1rem;

    font-size: 1rem;

    z-index: 2;

    background-color: transparent;
}

.form-field:focus {
    outline: none;
}

.form-label {
    font-size: 1rem;

    user-select: none;

    transform: translate(0, 0);

    transition: all .15s ease-in-out;

    position: absolute;
}

.form-field.is-username-focused~.form-label,
.form-field.is-email-focused~.form-label,
.form-field.is-password-focused~.form-label,
.form-field.is-confirm-password-focused~.form-label {
    transform: translateY(-80%);
    font-size: 1.2rem;

    white-space: nowrap;

    color: #020202;

    background-color: #fff;

    text-align: center;

    width: 35%;

    border-radius: 1rem;
}

.form-field.username-has-text~.form-label,
.form-field.email-has-text~.form-label,
.form-field.password-has-text~.form-label,
.form-field.confirm-password-has-text~.form-label {
    opacity: 0;
}

.success-msg {
    color: rgb(89, 189, 86);
    font-size: 1.1rem;
    display: none;
}

.success-msg.success-msg-has-text {
    display: block;
}

.error-msg {
    color: rgb(194, 74, 74);
    font-size: 1.1rem;
    display: none;
}

.error-msg.error-msg-has-text {
    display: block;
}

.login-button {

    margin-top: 2rem;

    width: 100%;
    height: 2.5rem;

    font-size: 1.2rem;

    border: none;
    border-radius: 1rem;

    background-color: #006278;

    cursor: pointer;

    color: #fff;

    transition: all .2s ease-in-out;
}

.success-msg.success-msg-has-text+.login-button {
    margin-top: 0;
}

.error-msg.error-msg-has-text+.login-button {
    margin-top: 0;
}

.login-button:hover {
    background-color: #006179;

    box-shadow: 0.1rem 0 1rem 0.05rem #006278;
}

@media (max-width: 1080px) {
    .login-form-container {
        width: 90vw;
        height: 60svh;
    }

    .login-button {
        margin-top: 0;
        height: 4rem;

        text-align: center;
    }

    .form-label {
        transform: translateX(0);
    }
}
</style>