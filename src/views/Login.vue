<template>
  <div class="login-container">
    <h3>Login / create account to require access</h3>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#firebaseui-auth-container {
  margin-top: 6rem;
  width: 100%;
}
</style>
