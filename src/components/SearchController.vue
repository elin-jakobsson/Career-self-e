<template>
  <div class="search-controller">
    <input
      class="search-controller--input"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <i class="fa fa-search"></i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style scoped lang="scss">
.search-controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2rem;
  padding: 0.5rem;
  background-color: #f4f4f4;
  // padding: 1rem;
  &--input {
    flex: 1;
    background-color: #f4f4f4;
  }
  & > i {
    margin-right: 1rem;
    // background-color: #f4f4f4;
    // padding: 1rem;
  }
}
</style>
