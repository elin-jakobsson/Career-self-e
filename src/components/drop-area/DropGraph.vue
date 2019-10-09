<template>
  <div
    class="drop-graph"
    :class="{ 'drop-graph--dragging-over': draggingOver }"
  >
    <div class="drop-graph__lines">
      <span class="drop-graph__lines__label drop-graph__lines__label--top"
        >Love it</span
      >
      <span class="drop-graph__lines__label drop-graph__lines__label--bottom"
        >Hate it</span
      >
      <span class="drop-graph__lines__label drop-graph__lines__label--right"
        >Experience</span
      >
    </div>
    <drop-item
      v-for="(graphItem, index) in graphItems"
      v-bind:key="index"
      :item="getItem(graphItem)"
      :fixed="true"
      :style="getStyle(graphItem)"
      @mousedown.native="startDragging(graphItem)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DropItem from './DropItem.vue';
import { graphItemAsItem } from './helpers';
import { Item, GraphItem, ElementCorners } from '../../models';

@Component({
  components: {
    DropItem,
  },
})
export default class extends Vue {
  @Prop({ default: [] })
  public graphItems!: GraphItem[];

  @Prop({ default: new ElementCorners() })
  public graphCorners!: ElementCorners;

  @Prop({ default: false })
  public draggingOver!: boolean;

  public getItem(graphItem: GraphItem): Item {
    return graphItemAsItem(graphItem);
  }

  public getStyle(graphItem: GraphItem) {
    const height: number =
      this.graphCorners.bottomLeft.y - this.graphCorners.topLeft.y;
    const width: number =
      this.graphCorners.topRight.x - this.graphCorners.topLeft.x;
    return {
      top: `${graphItem.coord.y * height}px`,
      left: `${graphItem.coord.x * width}px`,
    };
  }

  public startDragging(graphItem: GraphItem) {
    this.$emit('startDragging', this.getItem(graphItem));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './variables.scss';
.drop-graph {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: white;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.2);
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: $graphDropBorder;
    box-sizing: border-box;
    opacity: 0;
  }
  &--dragging-over {
    &::after {
      opacity: 1;
    }
  }

  &__lines {
    position: absolute;
    top: $graphLinePadding;
    left: $graphLinePadding;
    right: $graphLinePadding;
    bottom: $graphLinePadding;
    pointer-events: none;
    border-left: $graphLineWidth solid $graphLineColor;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      height: $graphLineWidth;
      background-color: $graphLineColor;
    }
    &__label {
      position: absolute;
      color: $graphLineLabelColor;
      font-size: $graphLineLabelFontSize;
      user-select: none;
      &--top {
        left: $graphLineLabelPadding;
        top: 0;
      }
      &--bottom {
        left: $graphLineLabelPadding;
        bottom: 0;
      }
      &--right {
        right: 0;
        top: calc(50% + #{$graphLineLabelPadding});
      }
    }
  }
}
</style>
