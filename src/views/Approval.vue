<template>
  <div class="approval">
    <h2>Awaiting approval...</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.approval {
  display: flex;
  padding-top: 10rem;
  justify-content: center;
}
</style>
