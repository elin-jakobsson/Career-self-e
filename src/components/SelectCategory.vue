<template>
  <div class="select-category">
    <h3>Select category</h3>
    <div class="select-category__categories">
      <button
        v-for="(category, index) in allCategories"
        v-bind:key="index"
        class="button button--grey button--grey--solid select-category__categories__category"
        @click="$emit('selectCategory', category)"
      >
        <p>
          <strong>{{ category.name || 'All items' }}</strong>
        </p>
        <p>{{ category.description }}</p>
      </button>
    </div>
    <button class="button select-category__cancel" @click="$emit('cancel')">
      Cancel
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SelfEvaluationCategory } from '../models';
@Component
export default class extends Vue {
  @Prop({ default: () => [] })
  public categories!: SelfEvaluationCategory[];

  public get allCategories() {
    return [new SelfEvaluationCategory(), ...this.categories];
  }
}
</script>

<style scoped lang="scss">
.select-category {
  &__categories {
    display: flex;
    flex-direction: column;
    margin: 1.5rem -0.5rem;
    &__category {
      margin: 0.5rem;
      user-select: none;
      cursor: pointer;
    }
  }
  &__cancel {
    width: 100%;
  }
}
</style>
