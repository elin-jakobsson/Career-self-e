<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <slot name="header"></slot>
    </div>
    <hr class="light" />
    <div class="sidebar__main">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserLabel from '../components/UserLabel.vue';
@Component({
  components: {
    UserLabel,
  },
})
export default class extends Vue {}
</script>

<style scoped lang="scss">
@import '../styles/global-variables.scss';
.sidebar {
  height: 100%;
  width: 30rem;
  background-color: $sidebarBackgroundColor;
  box-shadow: $sidebarBoxShadow;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  &__header {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 1rem;
    margin-top: 1rem;
  }
}
</style>
