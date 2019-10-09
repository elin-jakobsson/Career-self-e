<template>
  <div class="details-card">
    <button
      class="button details-card__button-remove"
      @click="$emit('remove', item)"
    />
    <div class="details-card__row-wrapper">
      <div
        class="details-card__img-background-container"
        :style="itemImage"
      ></div>
      <div class="details-card__text-container">
        <h4>{{ titleName }}</h4>
        <hr class="details-card__text-container__divider" />
        <p>Interest: {{ interest }}</p>
        <p>Experience: {{ experience }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GraphItem } from '../models';
import { coordAsInterest, coordAsExperience } from '../utils';

@Component
export default class DetailsCard extends Vue {
  @Prop({ default: () => new GraphItem() })
  public item!: GraphItem;

  get itemImage() {
    return {
      backgroundImage: `url(${this.item!.imgUrl ||
        'https://screenshotlayer.com/images/assets/placeholder.png'})`,
    };
  }
  get titleName(): string {
    return this.item!.name || 'No Title';
  }

  get interest(): number {
    return coordAsInterest(this.item!.coord);
  }

  get experience(): number {
    return coordAsExperience(this.item!.coord);
  }
}
</script>

<style scoped lang="scss">
.details-card {
  width: 100%;
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;

  &__button-remove {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    padding: 0;
    height: 3rem;
    width: 3rem;
    border-radius: 1.5rem;
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      font-size: 2rem;
      content: '+';
    }
  }

  &__row-wrapper {
    display: flex;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }

  &__img-background-container {
    width: 7rem;
    height: 7rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__text-container {
    flex: 1;
    text-align: left;
    margin-left: 1.5rem;

    &__divider {
      margin: 0.5rem 0;
    }
  }
}
</style>
