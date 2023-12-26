<template>
  <div class="login-form-container">
    <form class="login-form" @submit.prevent="signIn">
      <div class="form-header">
        <h2>Login</h2>
      </div>

      <div class="field-group">
        <div class="form-group field">
          <input class="form-field" :class="{
            'is-email-focused': isemailFocused,
            'email-has-text': emailHasText,
          }" v-model="email" @focus="isemailFocused = true" @blur="isemailFocused = false"
            type="email" name="email" id="email" />
          <lable class="form-label" for="email">Email</lable>
        </div>

        <div class="form-group field">
          <input class="form-field" :class="{
            'is-password-focused': isPasswordFocused,
            'password-has-text': passwordHasText,
          }" v-model="password" @focus="isPasswordFocused = true" @blur="isPasswordFocused = false"
            type="password" name="password" id="password" />
          <lable class="form-label" for="password">Password</lable>
        </div>
      </div>

      <p v-text="errorMsg" class = "error-msg" :class = "{'error-msg-has-text': errorMsgHasText}"/>
      
      <button class="btn login-button" type="submit" href="#">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "login",

  data() {
    return {
      isemailFocused: false,
      isPasswordFocused: false
    };
  },
  setup() {
    definePageMeta({
      layout: "auth",
    });

    const client = useSupabaseClient();

    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");

    const signIn = async () => {
      try {
        const { error } = await client.auth.signInWithPassword({
          email: email.value,
          password: password.value
        })

        if (error) throw error;
     
        window.location.href = "/"
      } catch (error: any) {
        errorMsg.value = error.message;
      }
    }

    return { ...toRefs({email, password, errorMsg, signIn}) }
  },
  computed: {
    emailHasText(): boolean {
      return (
        this.email.trim().length > 0 && !this.isemailFocused
      );
    },
    passwordHasText(): boolean {
      return (
        this.password.trim().length > 0 && !this.isPasswordFocused
      );
    },
    errorMsgHasText(): boolean {
        return this.errorMsg.trim().length > 0;
    }
  },

  mounted() {
  }
};
</script>

<style scoped>
.background-gradient {
  background: linear-gradient(-45deg, #03212a, #006278);
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
  height: 50svh;

  border-radius: 0.5rem;

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

  transition: all 0.15s ease-in-out;

  position: absolute;
}

.form-field.is-email-focused~.form-label,
.form-field.is-password-focused~.form-label {
  transform: translateY(-80%);
  font-size: 1.2rem;

  color: #020202;

  background-color: #fff;

  text-align: center;

  width: 10rem;

  border-radius: 1rem;
}

.form-field.email-has-text~.form-label,
.form-field.password-has-text~.form-label {
  opacity: 0;
}

.error-msg {
    color: rgb(194, 74, 74);
    font-size: 1.1rem;
    display: none;
}

.error-msg.error-msg-has-text{
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

  transition: all 0.2s ease-in-out;
}

.error-msg.error-msg-has-text+.login-button {
    margin-top: -1rem;
}

.login-button:hover {
  background-color: #006179;

  box-shadow: 0.1rem 0 1rem 0.05rem #006278;
}

@media (max-width: 1080px) {
  .login-form-container {
    width: 90vw;
  }

  .form-label {
    transform: translateX(0);
  }
}
</style>
