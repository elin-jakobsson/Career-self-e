<template>
  <div class="team-stats">
    <sidebar />
    <div class="team-stats__main">
      <div
        class="team-stats__main__row"
        v-for="(stats, index) in teamStats"
        v-bind:key="index"
      >
        <top-rating
          :items="stats.interestItems"
          :isInterest="true"
          :categoryName="stats.category"
        />
        <top-rating
          :items="stats.experienceItems"
          :isInterest="false"
          :categoryName="stats.category"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Sidebar from '../components/Sidebar.vue';
import TopRating from '../components/TopRating.vue';
import { firestore } from 'firebase';
import { groupObjectArray } from '../utils';
import { GraphItem } from '../models';

const getMeanValueOfItems = (itemArray: GraphItem[]) =>
  groupObjectArray(itemArray, 'id').map(arr => {
    const x =
      arr.map(item => item.coord.x).reduce((acc, curr) => acc + curr, 0) /
      arr.length;
    const y =
      arr.map(item => item.coord.y).reduce((acc, curr) => acc + curr, 0) /
      arr.length;
    return { ...(arr[0] as GraphItem), coord: { x, y } };
  });

interface TeamStats {
  category: string;
  interestItems: GraphItem[];
  experienceItems: GraphItem[];
}

@Component({
  components: { Sidebar, TopRating },
})
export default class extends Vue {
  public topInterest: GraphItem[] = [];
  public topExperience: GraphItem[] = [];

  public teamStats: TeamStats[] = [];

  async mounted() {
    try {
      const snap = await this.$firebase
        .firestore!.collection('self-evaluation-categories')
        .get();
      snap.docs
        .map(doc => doc.data().name)
        .forEach(category => {
          this.getSelfEvaluationItemsGroup(
            category,
            (snap: firestore.QuerySnapshot) => {
              const meanValueItems = getMeanValueOfItems(
                this.snapAsItemArr(snap),
              );
              console.log('snap ', meanValueItems);

              const interestItems = [...meanValueItems].sort(
                this.sortByCoord('y'),
              );
              const experienceItems = [...meanValueItems].sort(
                this.sortByCoord('x', true),
              );

              this.teamStats = [
                ...this.teamStats,
                {
                  category,
                  interestItems,
                  experienceItems,
                },
              ];
            },
          );
        });
    } catch (err) {}
  }

  private snapAsItemArr = (snap: firestore.QuerySnapshot) =>
    snap.docs.map(doc => doc.data()) as GraphItem[];

  private sortByCoord = (axis: string = 'x', desc: boolean = false) => (
    itemA: any,
    itemB: any,
  ) =>
    desc
      ? itemB.coord[axis] - itemA.coord[axis]
      : itemA.coord[axis] - itemB.coord[axis];

  private getSelfEvaluationItemsGroup(
    category: string,
    callback: (snap: firestore.QuerySnapshot) => void,
  ) {
    return this.$firebase!.firestore!.collectionGroup('selfEvaluationItems')
      .where('categories', 'array-contains', category)
      .get()
      .then(callback);
  }
}
</script>

<style scoped lang="scss">
.team-stats {
  height: 100%;
  display: flex;
  &__main {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    &__row {
      display: flex;
      & > * {
        margin: 1rem;
      }
    }
  }
}
</style>
