<template>
  <div class="drop-area">
    <sidebar>
      <template v-slot:header>
        <div class="drop-area__sidebar__header">
          <button
            class="button button--white drop-area__sidebar__header__category"
            @click="$emit('selectCategory')"
          >
            {{ selectedCategoryName || 'Select category' }}
          </button>
          <input
            class="round drop-area__sidebar__header__search"
            type="text"
            v-model="searchText"
            placeholder="Search"
          />
        </div>
      </template>
      <div class="drop-area__sidebar__main">
        <button
          class="button button--white drop-area__sidebar__main__new"
          @click="$emit('addNewItem')"
        >
          + Add new item
        </button>
        <div class="drop-area__sidebar__main__icons">
          <drop-item
            v-for="(item, index) in filteredSidebarItems"
            v-bind:key="index"
            :item="item"
            :dimmed="isItemOnGraph(item)"
            @mousedown.native="
              isItemOnGraph(item) ? () => {} : startDragging(item)
            "
          />
        </div>
      </div>
    </sidebar>
    <div class="drop-area__main" ref="dropAreaMain">
      <div class="drop-area__main__padding" :style="graphMaxWidth">
        <div class="drop-area__main__square-wrapper">
          <div
            class="drop-area__main__square-wrapper__container"
            ref="graphContainer"
          >
            <drop-graph
              :graphItems="graphItems"
              :graphCorners="graphCorners"
              :draggingOver="isInsideGraphContainer && isDragging"
              @startDragging="startDragging"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="drop-area__list">
      <div class="drop-area__list__container">
        <details-card
          v-for="(item, index) in graphItems"
          v-bind:key="index"
          :item="item"
          @remove="handleRemove"
        />
      </div>
    </div>
    <drop-item
      :item="draggingItem"
      :fixed="true"
      :dragging="isDragging"
      :badge="getDropAction(draggingItem)"
      :style="draggingStyle"
      v-if="isDragging"
      @mouseup.native="stopDragging()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DropItem from './DropItem.vue';
import DropGraph from './DropGraph.vue';
import {
  getElementCornersFromElement,
  getNormalizedInnerElementPosition,
  isInsideElement,
  DropAction,
} from './helpers';
import { Item, GraphItem, Coord, ElementCorners } from '../../models';
import { capitalizeFirstLetter } from '../../utils';
import Sidebar from '../../components/Sidebar.vue';
import DetailsCard from '../../components/DetailsCard.vue';

@Component({
  components: {
    DropItem,
    DropGraph,
    Sidebar,
    DetailsCard,
  },
})
export default class extends Vue {
  @Prop({ default: () => [] })
  public sidebarItems!: Item[];

  @Prop({ default: () => [] })
  public graphItems!: GraphItem[];

  @Prop({ default: '' })
  public selectedCategoryName!: string;

  public mousePosition: Coord = new Coord();
  public graphCorners: ElementCorners = new ElementCorners();
  public isDragging: boolean = false;
  public draggingItem: Item = new Item();
  public searchText: string = '';
  public graphMaxWidth = {};

  get filteredSidebarItems() {
    return (this.sidebarItems || []).filter(item =>
      (item.name || '').toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  get isInsideGraphContainer() {
    return isInsideElement(this.graphCorners, this.mousePosition);
  }

  get normalizedContainerInnerPosition() {
    return getNormalizedInnerElementPosition(
      this.graphCorners,
      this.mousePosition,
    );
  }

  get draggingStyle() {
    return {
      top: `${this.mousePosition.y}px`,
      left: `${this.mousePosition.x}px`,
    };
  }

  public capitalizeFirstLetter(str: string) {
    return capitalizeFirstLetter(str);
  }

  public isItemOnGraph(item: Item) {
    return !!(this.graphItems || []).find(
      graphItem => graphItem.id === item.id,
    );
  }

  public getDropAction(item: Item): DropAction {
    if (this.isInsideGraphContainer) {
      if (this.isItemOnGraph(item)) {
        return DropAction.UPDATE;
      } else {
        return DropAction.ADD;
      }
    } else {
      if (this.isItemOnGraph(item)) {
        return DropAction.REMOVE;
      }
    }
    return DropAction.NONE;
  }

  public startDragging(item: Item) {
    this.isDragging = true;
    this.draggingItem = item;
  }

  public stopDragging() {
    const coord: Coord = { ...this.normalizedContainerInnerPosition };
    const item: Item = { ...this.draggingItem };
    const action: DropAction = this.getDropAction(item);
    this.isDragging = false;
    this.draggingItem = new Item();

    if (action !== DropAction.NONE) {
      this.$emit(
        'dropItem',
        Object.assign(new GraphItem(), { ...item, coord }),
        action,
      );
    }
  }

  public handleRemove(item: GraphItem) {
    this.$emit('dropItem', item, DropAction.REMOVE);
  }

  public updateMousePosition(event: MouseEvent) {
    this.mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  public setGraphCorners() {
    const dropAreaMain = getElementCornersFromElement(this.$refs
      .dropAreaMain as Element);
    const height = dropAreaMain.bottomLeft.y - dropAreaMain.topLeft.y;
    this.graphMaxWidth = {
      'max-width': `${height}px`,
    };
    this.$nextTick().then(() => {
      this.graphCorners = getElementCornersFromElement(this.$refs
        .graphContainer as Element);
    });
  }

  public created() {
    document.addEventListener('mousemove', this.updateMousePosition);
    window.addEventListener('resize', this.setGraphCorners);
  }

  public mounted() {
    this.setGraphCorners();
  }

  public destroyed() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    window.removeEventListener('resize', this.setGraphCorners);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './variables.scss';
.drop-area {
  display: flex;
  &__sidebar {
    &__main {
      &__icons {
        margin: -0.5rem;
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
      }
    }
    &__header {
      &__search {
        margin-top: 2rem;
        width: 100%;
      }
    }
  }

  &__main {
    flex: 1;
    &__padding {
      padding: $mainPadding;
    }
    &__square-wrapper {
      width: 100%;
      position: relative;
      &::after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      &__container {
        position: absolute;
        height: 100%;
        width: 100%;
      }
    }
  }

  &__list {
    padding: $mainPadding;
    overflow-y: scroll;
    width: 28rem;
    &__container {
      margin: -1rem 0;
      & > * {
        margin: 1rem 0;
      }
    }
  }
}
</style>
