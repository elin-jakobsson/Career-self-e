<template>
  <div class="user-label">
    <div
      class="user-label__userImg"
      :style="{
        background: 'url(' + userImage + ' )',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>
    <p class="user-label__userName">{{ userName }}</p>
    <p class="user-label__icon">&#10095;</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserObject } from '../assets/graphTypes/graphTypes';

@Component
export default class extends Vue {
  @Prop() public userObject!: UserObject;
  get userImage(): string {
    return this.userObject && !!this.userObject.imgUrl
      ? this.userObject.imgUrl
      : 'https://screenshotlayer.com/images/assets/placeholder.png';
  }
  get userName(): string {
    return this.userObject && !!this.userObject.name
      ? this.userObject.name
      : 'No Name';
  }
}
</script>

<style lang="scss" scoped>
$imageSize: 4.5rem;
.user-label {
  margin: 2rem 1rem;
  background-color: #1c1b27;
  display: flex;
  align-items: center;
  border-radius: $imageSize;
  cursor: pointer;

  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;

  &__userImg {
    width: $imageSize;
    height: $imageSize;
    border-radius: 60%;
  }
  &__userName {
    color: #fff;
    font-size: 1.6rem;
    margin-left: 1rem;
  }
  &__icon {
    flex: 1;
    text-align: right;
    padding-right: 1rem;
    color: #c0c0c0;
    font-size: 1.6rem;
  }

  &:hover {
    background-color: #000;
  }
  &:hover &__icon {
    color: #fff;
  }
}
</style>
