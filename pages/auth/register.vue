<template>
    <div class="login-form-container">
        <form class="login-form">
            <div class="form-header">
                <h2>Register</h2>
            </div>

            <div class="field-group">
                <div class="form-group field">
                    <input
                            class="form-field"
                            :class="{'is-username-focused' : isUsernameFocused,
                                    'username-has-text': usernameHasText}"
                            v-model="usernameInputValue"
                            @focus="isUsernameFocused = true"
                            @blur="isUsernameFocused = false"
                            type="text"
                            name="username"
                            id="username">
                    <lable class="form-label" for="username">Username</lable>
                </div>

                <div class="field-group">
                    <div class="form-group field">
                        <input
                                class="form-field"
                                :class="{'is-email-focused' : isEmailFocused,
                                    'email-has-text': emailHasText}"
                                v-model="emailInputValue"
                                @focus="isEmailFocused = true"
                                @blur="isEmailFocused = false"
                                type="email"
                                name="email"
                                id="email">
                        <lable class="form-label" for="email">Email</lable>
                    </div>
                </div>

                <div class="form-group field">
                    <input
                            class="form-field"
                            :class="{'is-password-focused' : isPasswordFocused,
                                    'password-has-text': passwordHasText}"
                            v-model="passwordInputValue"
                            @focus="isPasswordFocused = true"
                            @blur="isPasswordFocused = false"
                            type="password"
                            name="password"
                            id="password">
                    <lable class="form-label" for="password">Password</lable>
                </div>

                <div class="form-group field">
                    <input
                            class="form-field"
                            :class="{'is-confirm-password-focused' : isConfirmPasswordFocused,
                                    'confirm-password-has-text': confirmPasswordHasText}"
                            v-model="confirmPasswordInputValue"
                            @focus="isConfirmPasswordFocused = true"
                            @blur="isConfirmPasswordFocused = false"
                            type="password"
                            name="confirm-password"
                            id="confirm-password">
                    <lable class="form-label" for="confirm-password">Confirm Password</lable>
                </div>
            </div>

            <button class="btn login-button" type="submit" href="#">Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "auth"
})
</script>

<script lang="ts">

interface ComponentData {
    isUsernameFocused: boolean;
    isEmailFocused: boolean;
    isPasswordFocused: boolean;
    isConfirmPasswordFocused: boolean;
    usernameInputValue: String;
    emailInputValue: String;
    passwordInputValue: String;
    confirmPasswordInputValue: String;
}
export default {
    name: "register",

    data() {
        return {
            isUsernameFocused: false,
            isEmailFocused: false,
            isPasswordFocused: false,
            isConfirmPasswordFocused: false,
            usernameInputValue: "",
            emailInputValue: "",
            passwordInputValue: "",
            confirmPasswordInputValue: ""
        };
    },
    computed: {
        usernameHasText(this: ComponentData): boolean {
            return this.usernameInputValue.trim().length > 0 && !this.isUsernameFocused;
        },
        emailHasText(this: ComponentData): boolean {
            return this.emailInputValue.trim().length > 0 && !this.isEmailFocused;
        },
        passwordHasText(this: ComponentData): boolean {
            return this.passwordInputValue.trim().length > 0 && !this.isPasswordFocused;
        },
        confirmPasswordHasText(this: ComponentData): boolean {
            return this.confirmPasswordInputValue.trim().length > 0 && !this.isConfirmPasswordFocused;
        }
    }
}
</script>

<style scoped>

.background-gradient {
    background: linear-gradient(-45deg, #03212a, #006278);;
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

    gap: 1.9rem;

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

.form-field.is-username-focused ~ .form-label, .form-field.is-email-focused ~ .form-label, .form-field.is-password-focused ~ .form-label, .form-field.is-confirm-password-focused ~ .form-label {
    transform: translateY(-80%);
    font-size: 1.2rem;

    color: #020202;

    background-color: #fff;

    text-align: center;

    width: 10rem;

    border-radius: 1rem;
}

.form-field.username-has-text ~ .form-label, .form-field.email-has-text ~ .form-label, .form-field.password-has-text ~ .form-label, .form-field.confirm-password-has-text ~ .form-label {
    opacity: 0;
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