<template>
  <div class="user-card-back">
    <div class="user-card-back__header">
      <div
        class="user-card-back__header--userImg"
        :style="{
          background: `url(${
            !!user.photoUrl ? user.photoUrl : 'default-user-2.png'
          })center center / cover no-repeat, url(default-user-2.png )`,
        }"
      ></div>
      <div class="user-card-back__header--title-container">
        <p class="user-card-back__header--title">{{ user.name }}</p>
        <div class="divider"></div>
        <p class="user-card-back__header--sub-title">{{ user.profession }}</p>
      </div>
    </div>
    <div class="user-card-back__main">
      <p class="user-card-back__main--intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <div class="divider"></div>
      <div
        v-for="(exp, index) in topExp"
        :key="index"
        class="user-card-back__interest"
      >
        <div
          class="user-card-back__interest--tool-url"
          :style="{
            background: `url(${
              !!exp.imgUrl ? exp.imgUrl : 'default-user-2.png'
            })center center / cover no-repeat, url(default-user-2.png )`,
          }"
        ></div>
        <div class="user-card-back__interest--tool-text-container">
          <p class="user-card-back__interest--title">{{ exp.name }}</p>
          <p class="user-card-back__interest--text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class extends Vue {
  @Prop({ default: { name: 'no name' } }) readonly user: any;

  get topExp() {
    return !!this.user.topExperience ? this.user.topExperience : [];
  }
}
</script>

<style lang="scss" scoped>
.user-card-back {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;

  &__header {
    align-self: flex-start;
    width: 100%;
    padding: 0.5rem;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    border-radius: 0.5rem 0.5rem 0 0;
    &--userImg {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      border-radius: 50%;
    }
    &--title-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &--title {
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 400;
    }

    &--sub-title {
      font-style: italic;
      font-size: 1.2rem;
    }
  }

  &__main {
    width: 100%;
    padding: 1rem;
    overflow: auto;
    &--intro {
      color: gray;
      font-size: 1.2rem;
      line-height: 1.7rem;
    }
  }
  &__interest {
    width: 100%;
    display: flex;

    margin-top: 1rem;

    &--tool-url {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      border-radius: 50%;
    }

    &--tool-text-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &--title {
      font-size: 1.6rem;
      font-weight: 400;
    }
    &--text {
      font-size: 1rem;
      color: gray;
    }
  }
}

.divider {
  border-bottom: 1px solid #eeeeee;
  margin: 0 0 1rem 0;
  width: 100%;
}
</style>
