<template>
  <div class="drop-item-sidebar">
    <div class="drop-item-sidebar__header">
      <slot name="header"></slot>
      <hr />
    </div>
    <slot name="buttons"></slot>

    <slot></slot>
    <div class="drop-item-sidebar__main">
      <slot name="drop-item-sidebar__scroll-list"></slot>
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
.drop-item-sidebar {
  height: 100%;
  width: 30rem;
  background-color: #ffffff;
  box-shadow: $sidebarBoxShadow;
  display: flex;
  flex-direction: column;
  &__header {
    padding: 1rem;
    margin-bottom: 1rem;
    padding: 2rem;

    & hr {
      margin-top: 1rem;
    }
  }

  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    padding: 0 1.5rem 1rem 2rem;

    &::-webkit-scrollbar {
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
