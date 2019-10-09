<template>
  <div class="add-item">
    <h3>Add new item</h3>
    <div class="form-input">
      <input
        class="round"
        autocomplete="off"
        type="text"
        v-model="item.name"
        id="name"
        required
      />
      <label for="name">Name</label>
      <span class="note note--error" v-if="nameExists"
        >Item with provided name already exists</span
      >
    </div>
    <div class="form-input">
      <input
        class="round"
        type="text"
        v-model="item.imgUrl"
        id="imgUrl"
        required
      />
      <label for="naimgUrlme">Image url</label>
    </div>
    <p class="add-item__select-categories">Select categories</p>
    <div class="add-item__categories">
      <button
        class="button add-item__categories__category"
        v-for="(category, index) in categories"
        v-bind:key="index"
        :class="{
          'add-item__categories__category--selected': isCategorySelected(
            category.name,
          ),
        }"
        @click="toggleCategory(category.name)"
      >
        {{ category.name }}
      </button>
    </div>
    <div class="add-item__buttons">
      <button class="button add-item__buttons__cancel" @click="$emit('cancel')">
        Cancel
      </button>
      <button
        class="button add-item__buttons__save"
        :disabled="nameExists || !isAllSet"
        @click="$emit('save', item)"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item, SelfEvaluationCategory } from '../models';
@Component
export default class extends Vue {
  @Prop({ default: () => [] })
  public sidebarItems!: Item[];

  @Prop({ default: () => [] })
  public categories!: SelfEvaluationCategory[];

  public item: Item = new Item();

  public get isAllSet() {
    return (
      !!this.item.name && this.item.categories.length > 0 && !!this.item.imgUrl
    );
  }

  public get nameExists() {
    return !!(this.sidebarItems || []).find(
      item => (item.name || '').toLowerCase() === this.item.name.toLowerCase(),
    );
  }

  public isCategorySelected(name: string) {
    return !!this.item.categories.includes(name);
  }

  public toggleCategory(name: string) {
    if (this.isCategorySelected(name)) {
      this.item.categories = this.item.categories.filter(
        category => category !== name,
      );
    } else {
      this.item.categories = this.item.categories.concat([name]);
    }
  }
}
</script>

<style scoped lang="scss">
.add-item {
  input {
    background: #f4f4f4;
  }
  &__select-categories {
    margin: 2rem 0 1rem 0;
    color: #999;
  }
  &__categories {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
    &__category {
      margin: 0.5rem;
      user-select: none;
      background: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 2px solid transparent;
      &--selected {
        border-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  &__buttons {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    &__save {
      margin-left: 2rem;
      flex: 1;
    }
  }
}
</style>
