<template>
  <div class="drop-area">
    <drop-item-sidebar>
      <template v-slot:header>
        <div class="drop-area__sidebar__header">
          <div
            class="drop-area__sidebar__header--team-image"
            :style="{
              background: `url(${
                !!teamImage ? teamImage : 'default-user-2.png'
              })center center / cover no-repeat, url(default-user-2.png )`,
            }"
          ></div>
          <div class="drop-area__sidebar__header--text-box">
            <h4>Team name</h4>
            <p>Selfevaluation</p>
          </div>
        </div>
      </template>
      <template v-slot:buttons>
        <div class="drop-area__sidebar__controlls">
          <search-controller />
          <input
            class="round drop-area__sidebar__controlls__search"
            type="text"
            v-model="searchText"
            placeholder="Search"
          />
          <!--<button
            class="button button--white drop-area__sidebar__controlls__category"
            @click="$emit('selectCategory')"
          >{{ selectedCategoryName || 'Select category' }}</button>
          <button
            class="button button--white drop-area__sidebar__main__new"
            @click="$emit('addNewItem')"
          >+ Add new item</button>-->
          <button
            class="drop-area__sidebar__controlls--button"
            @click="$emit('selectCategory')"
          >
            {{ selectedCategoryName || 'Select category' }}
          </button>
          <button
            class="drop-area__sidebar__controlls--button"
            @click="$emit('addNewItem')"
          >
            + Add new item
          </button>

          <hr />
        </div>
      </template>
      <div class="drop-area__sidebar__main"></div>
      <template v-slot:drop-item-sidebar__scroll-list>
        <div class="drop-area__sidebar__scroll-list__icons">
          <div
            v-for="(item, index) in filteredSidebarItems"
            v-bind:key="index"
            class="drop-area__sidebar__scroll-list__icons--section"
          >
            <drop-item
              :item="item"
              :dimmed="isItemOnGraph(item)"
              @mousedown.native="
                isItemOnGraph(item) ? () => {} : startDragging(item)
              "
            />
          </div>
        </div>
      </template>
    </drop-item-sidebar>
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
import DropItemSidebar from '../../components/DropItemSidebar.vue';
import DetailsCard from '../../components/DetailsCard.vue';
import SearchController from '../../components/SearchController.vue';

@Component({
  components: {
    DropItem,
    DropGraph,
    DropItemSidebar,
    DetailsCard,
    SearchController,
  },
})
export default class extends Vue {
  @Prop({ default: () => [] })
  public sidebarItems!: Item[];

  @Prop({ default: () => [] })
  public graphItems!: GraphItem[];

  @Prop({ default: '' })
  public selectedCategoryName!: string;

  public teamImage: string =
    'https://miro.medium.com/max/3200/0*QUqE4WGF8_cC9bIl.jpg';

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
    &__scroll-list {
      &__icons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
        grid-gap: 1.5rem;

        &--section {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    &__header {
      display: flex;
      align-items: center;
      color: #333333;

      &--team-image {
        border-radius: 50%;
        box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
        height: 5rem;
        width: 5rem;
        margin-right: 2rem;
      }

      &--text-box {
        & p {
          font-style: italic;
          margin-top: 0.5rem;
        }
      }
    }

    &__controlls {
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      &__search {
        margin-top: 2rem;
        margin-bottom: 1rem;
        width: 100%;
      }
      &--button {
        background-color: #444444;
        color: #f4f4f4;
        padding: 0.6rem 1rem;
        border-radius: 5rem;
        border: rgba(244, 244, 244, 0.6) solid 1px;

        font-size: 1.5rem;
        margin-bottom: 1rem;

        -o-transition: 0.5s;
        -ms-transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
        transition: 0.5s;

        &:hover {
          background-color: #242424;
        }
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
