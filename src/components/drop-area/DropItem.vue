<template>
  <div class="drop-item" :class="classObj">
    <img :src="item.imgUrl" class="drop-item__image" />
    <div class="drop-item__name">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item } from '../../models';

@Component
export default class extends Vue {
  @Prop({ default: () => new Item() })
  public item!: Item;

  @Prop({ default: false })
  public dragging!: boolean;

  @Prop({ default: false })
  public fixed!: boolean;

  @Prop({ default: false })
  public dimmed!: boolean;

  @Prop({ default: '' })
  public badge!: string;

  get classObj() {
    return {
      'drop-item--dragging': this.dragging,
      'drop-item--fixed': this.fixed,
      'drop-item--dimmed': this.dimmed,
      'drop-item--badge': this.badge === 'ADD' || this.badge === 'REMOVE',
      'drop-item--badge--add': this.badge === 'ADD',
      'drop-item--badge--remove': this.badge === 'REMOVE',
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './variables.scss';
.drop-item {
  position: relative;
  cursor: grab;
  z-index: 2;
  user-select: none;
  height: $itemSize;
  width: $itemSize;
  // margin: $itemMargin;
  background-color: $itemBackgroundColor;
  border-radius: 1rem;
  border: $itemBorder;
  color: $itemColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: $itemPadding;
  & > * {
    pointer-events: none;
  }
  &:hover {
    opacity: 0.8;
  }
  &--fixed {
    position: absolute;
    transform: $itemDragPositionAdjustment;
  }
  &--dragging {
    cursor: grabbing;
    transform: $itemDragPositionAdjustmentDragging;
    &:hover {
      opacity: 1;
    }
  }
  &--dimmed {
    cursor: default;
    opacity: 0.7;
    &:hover {
      opacity: 0.7;
    }
  }
  &--badge {
    &::after {
      content: '';
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $itemBadgeFontSize;
      position: absolute;
      height: $itemBadgeSize;
      width: $itemBadgeSize;
      right: -$itemBadgeSize / 3;
      top: -$itemBadgeSize / 3;
      border-radius: 50%;
      border: $itemBorder;
      color: $itemBadgeColor;
      background-color: $itemBadgeBackgroundColor;
    }
    &--add::after {
      content: '+';
    }
    &--remove::after {
      content: '+';
      transform: rotate(45deg);
    }
  }

  &__name {
    background: white;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
  }

  &__image {
    height: $itemImageSize;
    width: auto;
    max-width: $itemImageSize;
  }
}
</style>
