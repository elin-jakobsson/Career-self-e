<template>
  <div class="circle-chart-container">
    <svg
      class="circle-chart"
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        transformOrigin: 'center',
      }"
      :width="chartDiamterSize * 2"
      :height="chartDiamterSize * 2"
      :viewBox="viewBox"
      version="1.1"
    >
      <circle
        :stroke-dasharray="backgroundDashArray"
        stroke="#ddd"
        stroke-width="8"
        fill="white"
        :cx="chartDiamterSize"
        :cy="chartDiamterSize"
        :r="radius"
      />
      <circle
        :style="{ transform: 'rotate(-90deg)' }"
        class="circle-chart__circle"
        :stroke-dasharray="strokeDashArray"
        stroke-linecap="round"
        :stroke="percentageColor"
        stroke-width="8"
        fill="none"
        :cx="chartDiamterSize"
        :cy="chartDiamterSize"
        :r="radius"
      />
      <g class="circle-chart__info">
        <!-- <div
          class="circle-chart__info__img"
          :style="{
            background: `url(${
              !!itemImage ? itemImage : 'default-user-2.png'
            })center center / cover no-repeat, url(default-user-2.png )`,
          }"
        />-->
        <image
          :xlink:href="itemImage"
          x="50%"
          :y="chartDiamterSize - 10"
          width="30"
          height="30"
          transform="translate(-15,-15)"
        />
        <text
          class="circle-chart__percent"
          :x="chartDiamterSize"
          :y="
            chartDiamterSize >= 100 ? chartDiamterSize * 1.2 : chartDiamterSize
          "
          alignment-baseline="central"
          text-anchor="middle"
          :font-size="chartDiamterSize >= 100 ? '1.8rem' : '1.2rem'"
        >
          {{ Math.floor(percentInput * 100) }}%
        </text>
        <!-- <text
          v-if="chartDiamterSize >= 100"
          class="circle-chart__subline"
          :x="chartDiamterSize"
          :y="chartDiamterSize - 0 + 10"
          alignment-baseline="central"
          text-anchor="middle"
          font-size="0.7rem"
        >Yay {{ Math.floor(percentInput * 100) }}% progress!</text>-->
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  // public circumference: number =
  @Prop({ default: 1 }) public percentInput!: number;
  @Prop({ default: 100 }) public chartDiamterSize!: number;
  @Prop({ default: '' }) public itemImage!: string;
  public circelChartColor = 'blue';
  // public percentInput = 0.333;
  // public diameter: number = 100;

  get circumference(): number {
    return this.chartDiamterSize * Math.PI;
  }

  get percentageColor(): string {
    let color = '#e99000';
    if (this.percentInput > 0.4) {
      color = '#5b08c7';
    }
    if (this.percentInput > 0.7) {
      color = '#0cc9bf';
    }
    return color;
  }

  get radius(): number {
    return this.chartDiamterSize / 2;
  }

  get strokeDashArray(): string {
    return `${this.percentage} ${this.circumference}`;
  }
  get backgroundDashArray(): string {
    return `${this.circumference} ${this.circumference}`;
  }

  get circlePath(): string {
    let testPath = `M ${this.chartDiamterSize}, ${this.radius} a ${this.radius} ${this.radius} 0 0 1 0 ${this.chartDiamterSize} a ${this.radius} ${this.radius} 0 0 1 0 -${this.chartDiamterSize}`;

    return testPath;
  }

  get viewBox(): string {
    let boxWidth = this.chartDiamterSize * 2;
    return `0 0 ${boxWidth} ${boxWidth}`;
  }

  get percentage(): number {
    let totalLenght = this.circumference;
    let percentLength = totalLenght * this.percentInput;
    return percentLength;
  }
}
</script>

<style lang="scss" scoped>
.circle-chart {
  position: relative;

  &__circle {
    animation: circle-chart-fill 1s reverse;
    transform-origin: center;
  }

  &__info {
    animation: circle-chart-appear 2s forwards;
    opacity: 0;
    transform: translateY(0.3em);

    &__img {
      width: 2rem;
      height: 2rem;
    }
  }
}

@keyframes circle-chart-fill {
  to {
    stroke-dasharray: 0 999;
  }
}

@keyframes circle-chart-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
