<template>
  <div class="login-container">
    <!-- <h3>Login / create account to require access</h3> -->
    <div class="login-container__login-display-image"></div>
    <div id="firebaseui-auth-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public mounted() {
    this.$firebase.startFirebaseUIAuth('firebaseui-auth-container');
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100%;
  display: flex;
  padding: 4rem;

  justify-content: space-around;
  align-items: center;

  &__login-display-image {
    height: 100vh;
    width: 50%;
    background: url('../../public/careerself-e_logo.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
#firebaseui-auth-container {
  margin-top: 6rem;
  padding: 2rem;
}

@media screen and (max-width: 800px) {
  .login-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    &__login-display-image {
      width: 90%;
      max-width: 30rem;
      height: 30rem;
    }
  }
}
</style>
