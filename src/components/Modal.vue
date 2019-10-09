<template>
  <div class="modal">
    <div class="modal__backdrop" @click="$emit('close')" />
    <div class="modal__container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  &__backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  &__container {
    position: relative;
    padding: 2rem;
    min-height: 10rem;
    min-width: 40rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 1rem 1rem 4rem rgba(0, 0, 0, 0.45);
  }
}
</style>
