<template>
  <div class="self-evaluation">
    <drop-area
      class="self-evaluation__drop-area"
      :sidebarItems="filteredSidebarItems"
      :graphItems="filteredGraphItems"
      :selectedCategoryName="selectedCategory.name"
      @dropItem="handleDropItem"
      @addNewItem="showAddNewItem = true"
      @selectCategory="showSelectCategory = true"
    />
    <modal v-if="showAddNewItem" @close="showAddNewItem = false">
      <add-item
        :categories="categories"
        :sidebarItems="filteredSidebarItems"
        @save="handleSaveItem"
        @cancel="showAddNewItem = false"
      />
    </modal>
    <modal v-if="showSelectCategory" @close="showSelectCategory = false">
      <select-category
        :categories="categories"
        @cancel="showSelectCategory = false"
        @selectCategory="handleSelectCategory"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DropArea from '../components/drop-area/DropArea.vue';
import AddItem from '../components/AddItem.vue';
import Modal from '../components/Modal.vue';
import SelectCategory from '../components/SelectCategory.vue';
import {
  bindFirestorePath,
  deleteFirestoreDocument,
  setFirestoreDocument,
  addFirestoreDocument,
} from 'vuetyfire';
import { DropAction } from '../components/drop-area/helpers';
import { Item, GraphItem, SelfEvaluationCategory } from '../models';

@Component({
  components: {
    DropArea,
    AddItem,
    SelectCategory,
    Modal,
  },
})
export default class extends Vue {
  public showAddNewItem: boolean = false;
  public showSelectCategory: boolean = false;
  public selfEvalItemsPath: string = 'self-evaluation-items';
  public selfEvalCategoriesPath: string = 'self-evaluation-categories';
  public graphItems: GraphItem[] = [];
  public sidebarItems: Item[] = [];
  public categories: SelfEvaluationCategory[] = [];
  public selectedCategory: SelfEvaluationCategory = new SelfEvaluationCategory();

  get userPath() {
    const uid = this.$firebase!.currentUser!.uid;
    return `users/${uid}`;
  }

  get userItemsPath() {
    return `${this.userPath}/selfEvaluationItems`;
  }

  get filteredSidebarItems() {
    if (!this.selectedCategory.name) {
      return this.sidebarItems;
    }
    return this.sidebarItems.filter(item =>
      (item.categories || [])
        .map(category => category.toLowerCase())
        .includes(this.selectedCategory.name.toLowerCase()),
    );
  }

  get filteredGraphItems() {
    if (!this.selectedCategory.name) {
      return this.graphItems;
    }
    return this.graphItems.filter(item =>
      (item.categories || [])
        .map(category => category.toLowerCase())
        .includes(this.selectedCategory.name.toLowerCase()),
    );
  }

  public created() {
    bindFirestorePath({
      vm: this,
      key: 'graphItems',
      path: this.userItemsPath,
    });

    bindFirestorePath({
      vm: this,
      key: 'sidebarItems',
      path: this.selfEvalItemsPath,
    });

    bindFirestorePath({
      vm: this,
      key: 'categories',
      path: this.selfEvalCategoriesPath,
    });
  }

  public handleDropItem(data: GraphItem, action: DropAction) {
    if (action === DropAction.NONE) {
      return;
    }

    const path = `${this.userItemsPath}/${data.id}`;
    if (action === DropAction.REMOVE) {
      deleteFirestoreDocument({ path }).then(() => {
        this.updateTopItemsForUser();
      });
    } else {
      setFirestoreDocument({ path, data }).then(() => {
        this.updateTopItemsForUser();
      });
    }
  }

  public handleSaveItem(data: Item) {
    this.showAddNewItem = false;
    addFirestoreDocument({ path: this.selfEvalItemsPath, data });
  }

  public handleSelectCategory(data: SelfEvaluationCategory) {
    this.selectedCategory = data;
    this.showSelectCategory = false;
  }

  public updateTopItemsForUser() {
    const topExperience = [...this.graphItems]
      .sort((itemA, itemB) => itemB.coord.x - itemA.coord.x)
      .slice(0, 3);
    const topInterest = [...this.graphItems]
      .sort((itemA, itemB) => itemA.coord.y - itemB.coord.y)
      .slice(0, 3);

    const data = {
      topExperience,
      topInterest,
    };
    setFirestoreDocument({ data, path: this.userPath, merge: true });
  }
}
</script>

<style scoped lang="scss">
.self-evaluation {
  height: 100%;
  &__drop-area {
    height: 100%;
  }
}
</style>
