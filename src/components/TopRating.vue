<template>
  <div class="top-rating">
    <div class="top-rating__title">
      <p>
        <strong>{{ categoryName }}</strong>
      </p>
      <p>
        <small>{{ isInterest ? 'Interest' : 'Experience' }}</small>
      </p>
    </div>
    <div class="top-rating__rating__first">
      <!-- <div class="top-rating__rating__first__circle">
        <img :src="getImgUrl(topOne)" />
        <span>{{ getItemValue(topOne) }}</span>
      </div>-->
      <div class="top-rating__rating__first__chart-wrapper">
        <div class="top-rating__rating__first__chart-wrapper--chart-cirkel">
          <pie-chart
            :itemImage="topOne.imgUrl"
            :percentInput="Number(getItemValue(topOne) * 0.1)"
            chartDiamterSize="100"
          />
        </div>
      </div>
      <h4>{{ topOne.name }}</h4>
    </div>
    <div
      v-for="(item, index) in theRest"
      v-bind:key="index"
      class="top-rating__rating"
    >
      <div class="top-rating__rating__circle">
        <!-- <span>{{ getItemValue(item) }}</span> -->
        <pie-chart
          :percentInput="Number(getItemValue(item)) * 0.1"
          chartDiamterSize="50"
        />
      </div>
      <div class="top-rating__rating__name">
        <img :src="getImgUrl(item)" />
        <h4>{{ item.name }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GraphItem } from '../models';
import { coordAsInterest, coordAsExperience } from '../utils';
import PieChart from '../components/PieChart.vue';
@Component({
  components: { PieChart },
})
export default class extends Vue {
  @Prop({ default: () => [] })
  public items!: GraphItem[];

  public itemImage: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png';

  @Prop({ default: false })
  public isInterest!: boolean;

  @Prop({ default: '' })
  public categoryName!: string;

  public get topOne() {
    return this.items[0] || new GraphItem();
  }

  public get topOnePercent(): number {
    if (this.isInterest) {
      let valueOfallInt = Number(
        coordAsInterest(this.items[0].coord, false).toFixed(2),
      );
      let interestPercent = valueOfallInt * 0.1;

      return interestPercent;
    } else {
      let valueOfallExp = Number(
        coordAsExperience(this.items[0].coord, false).toFixed(2),
      );

      let experiencePercent = valueOfallExp * 0.1;
      return experiencePercent;
    }
  }

  public get theRest() {
    if (this.items.length < 2) {
      return [];
    } else {
      return this.items.concat(new Array(4).fill(new GraphItem())).slice(1, 4);
    }
  }

  public getImgUrl(item: GraphItem) {
    return (
      item.imgUrl || 'https://screenshotlayer.com/images/assets/placeholder.png'
    );
  }

  public getItemValue(item: GraphItem) {
    if (this.isInterest) {
      return coordAsInterest(item.coord, false).toFixed(2);
    } else {
      return coordAsExperience(item.coord, false).toFixed(2);
    }
  }
}
</script>

<style scoped lang="scss">
.top-rating {
  position: relative;
  padding: 2rem;
  padding-bottom: 5rem;
  min-height: 10rem;
  min-width: 30rem;
  background: #f4f4f4;
  border-radius: 1rem;
  // box-shadow: 1rem 1rem 4rem rgba(0, 0, 0, 0.45);
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
  }
  img {
    height: 4rem;
    width: 4rem;
    max-width: 4rem;
  }
  &__rating {
    display: flex;
    margin-top: 2rem;
    &:nth-child(2) {
      margin-top: 3rem;
    }
    &__first {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &__chart-wrapper {
        position: relative;
        height: 10rem;
        width: 10rem;
        margin-bottom: 2rem;
        &--chart-cirkel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      & h4 {
        text-transform: capitalize;
      }

      // &__circle {
      //   height: 10rem;
      //   width: 10rem;
      //   background: #fff;
      //   border: 0.5rem solid MEDIUMSEAGREEN;
      //   border-radius: 50%;
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      //   justify-content: center;
      //   margin-bottom: 1rem;
      //   img {
      //     margin-bottom: 0.5rem;
      //   }
      // }
    }
    &__circle {
      height: 5rem;
      width: 5rem;
      // background: #fff;
      // border: 0.5rem solid palevioletred;
      // border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__name {
      height: 5rem;
      flex: 1;
      margin-left: 1rem;
      border-radius: 0.5rem;
      padding: 0 1rem;
      background: #fff;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      img {
        margin-right: 1rem;
      }
    }
  }
}
</style>
