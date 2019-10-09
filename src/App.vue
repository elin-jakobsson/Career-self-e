<template>
  <div id="app">
    <top-bar class="app-top-bar" @triggerEdit="showEditUser = true" />
    <div class="app-container">
      <router-view />
    </div>
    <modal v-if="showEditUser" @close="showEditUser = false">
      <edit-form @cancel="showEditUser = false" />
    </modal>
    <!-- <div v-if="!$firebase.initialized" class="overlay" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopBar from './components/TopBar.vue';
import EditForm from './components/EditForm.vue';
import Modal from './components/Modal.vue';

@Component({
  components: {
    TopBar,
    EditForm,
    Modal,
  },
})
export default class extends Vue {
  public showEditUser: boolean = false;
}
</script>

<style lang="scss">
@import './styles/global-variables.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
.app-top-bar {
  // z-index: 1;
}
.app-container {
  // z-index: 0;
  overflow: hidden;
  position: relative;
  height: calc(100vh - #{$topBarHeight});
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(123, 23, 111, 0.6);
  z-index: 9999;
}
</style>
