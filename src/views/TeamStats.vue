<template>
  <div class="team-stats">
    <sidebar>
      <template v-slot:header>
        <div class="team-stats__sidebar__header">
          <div
            class="team-stats__sidebar__header--team-image"
            :style="{
          background: `url(${
            !!teamImage ? teamImage : 'default-user-2.png'
          })center center / cover no-repeat, url(default-user-2.png )`,
        }"
          ></div>
          <h4>Team name</h4>
        </div>
      </template>

      <div class="team-stats__sidebar__channels">
        <p>#channels</p>
        <hr class="light" />
      </div>
      <template v-slot:sidebar__scroll-list>
        <team-label v-for="n in 3" :key="n" />
      </template>
    </sidebar>

    <div class="team-stats__main">
      <div class="team-stats__main__row" v-for="(stats, index) in teamStats" v-bind:key="index">
        <top-rating :items="stats.interestItems" :isInterest="true" :categoryName="stats.category" />
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
import TeamLabel from '../components/TeamLabel.vue';

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
  components: { Sidebar, TopRating, TeamLabel },
})
export default class extends Vue {
  public topInterest: GraphItem[] = [];
  public topExperience: GraphItem[] = [];

  public teamStats: TeamStats[] = [];

  public teamImage: string =
    'https://miro.medium.com/max/3200/0*QUqE4WGF8_cC9bIl.jpg';

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
              // console.log('snap ', meanValueItems);

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

  &__sidebar {
    &__channels {
      padding: 2rem;
      color: #f4f4f4;
      & p {
        margin-bottom: 0.5rem;
      }
    }
    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f4f4f4;
      justify-content: center;
      &--team-image {
        border-radius: 50%;
        box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
        height: 8rem;
        width: 8rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
