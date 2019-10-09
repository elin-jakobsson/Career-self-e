<template>
  <div class="user-card" @click="flippOverTheCard()">
    <div class="user-card--flip" :class="{ 'user-card--rotate-full': rotated }">
      <div class="user-card--front">
        <user-card-front :user="user" />
      </div>
      <div class="user-card--back">
        <user-card-back :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserCardFront from '../user-card/UserCardFront.vue';
import UserCardBack from '../user-card/UserCardBack.vue';

@Component({
  components: { UserCardFront, UserCardBack },
})
export default class extends Vue {
  @Prop({ default: { name: 'no name' } }) readonly user: any;

  public rotateFlippBase: string[] = ['user-card--flip'];
  public rotated: boolean = false;

  public flippOverTheCard(): void {
    this.rotated = !this.rotated;
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  width: 25rem;
  // min-width: 25rem;
  // max-width: 28rem;
  // flex: 1;
  height: 38rem;
  margin: 1rem;
  perspective: 1300px;
  cursor: pointer;

  &--flip {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-out;
    transform-style: preserve-3d;
    &:hover {
      transform: rotateY(-10deg);
    }
  }

  &--rotate-full {
    transform: rotateY(-180deg);
    &:hover {
      transform: rotateY(-180deg);
    }
  }

  &--front,
  &--back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
  }

  &--back {
    transform: rotateY(-180deg);
  }
}
</style>
