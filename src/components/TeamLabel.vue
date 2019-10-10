<template>
  <div class="team-label">
    <div
      class="team-label__team-image"
      :style="{
        background: 'url(' + userImage + ' )',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>
    <p class="team-label__team-name">{{ userName }}</p>
    <p class="team-label__icon">&#10095;</p>
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
$imageSize: 3.5rem;
.team-label {
  margin: 1rem 0rem;
  background-color: #414141;
  display: flex;
  align-items: center;
  border-radius: $imageSize;
  cursor: pointer;
  padding: 1px;

  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;

  &:first-child {
    margin-top: 0;
  }

  &__team-image {
    width: $imageSize;
    height: $imageSize;
    border-radius: 60%;
  }
  &__team-name {
    color: #fff;
    font-size: 1.6rem;
    margin-left: 1rem;
  }
  &__icon {
    flex: 1;
    text-align: right;
    padding-right: 1rem;
    color: #2b2b2b;
    font-size: 1.6rem;
  }

  &:hover {
    background-color: #000;
  }
  &:hover &__icon {
    color: #6d6d6d;
  }
}
</style>
