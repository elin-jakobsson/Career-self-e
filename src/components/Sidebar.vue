<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <slot name="header"></slot>
      <hr class="light" />
    </div>
    <slot name="buttons"></slot>

    <slot></slot>
    <div class="sidebar__main">
      <slot name="sidebar__scroll-list"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TeamLabel from '../components/TeamLabel.vue';
@Component({
  components: {
    TeamLabel,
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
  // padding: 2rem;
  &__header {
    padding: 1rem;
    margin-bottom: 1rem;
    padding: 2rem;

    & hr.light {
      margin-top: 1rem;
    }
  }
  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    padding: 0 1.5rem 1rem 2rem;
    // margin-top: 1rem;

    &::-webkit-scrollbar {
      // background-color: $sidebarBackgroundColor;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 0.5rem 0.5rem 0 0;
      width: 0.5rem;
      position: absolute;
      right: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 0.5rem;
    }
  }
}
</style>
