<template>
  <div class="user-card-front">
    <div class="user-card-front__header">
      <div
        class="user-card-front__header--userImg"
        :style="{
          background: `url(${
            !!user.photoUrl ? user.photoUrl : 'default-user-2.png'
          })center center / cover no-repeat, url(default-user-2.png )`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <p class="user-card-front__header--title">{{ user.name }}</p>
      <div class="darkenDivider"></div>
      <p class="user-card-front__header--sub-title">{{ user.profession }}</p>
    </div>

    <div class="user-card-front__content">
      <div class="user-card-front__content--subject">
        <p class="user-card-front__content--title">Favorite tools</p>
        <div class="divider"></div>
        <div
          v-if="topExp.length > 0"
          class="user-card-front__content--toolsContainer"
        >
          <div
            v-for="(exp, index) in topExp"
            :key="index"
            class="user-card-front__tool"
          >
            <div
              class="user-card-front__tool--toolImg"
              :style="{
                background:
                  'url(' + exp.imgUrl + ')center center / cover no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
            <p class="user-card-front__tool--toolName">{{ exp.name }}</p>
          </div>
        </div>
        <div v-else>
          <p class="user-card-front__content--default-text">
            I haven't decided yet :)
          </p>
        </div>
      </div>

      <div
        class="user-card-front__content--subject user-card-front__content--lastSubject"
      >
        <p class="user-card-front__content--title">intresting tools</p>
        <div class="divider"></div>
        <div
          v-if="topExp.length > 0"
          class="user-card-front__content--toolsContainer"
        >
          <div
            v-for="(interest, index) in topInt"
            :key="index"
            class="user-card-front__tool"
          >
            <div
              class="user-card-front__tool--toolImg"
              :style="{
                background:
                  'url(' + interest.imgUrl + ')center center / cover no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
            <p class="user-card-front__tool--toolName">{{ interest.name }}</p>
          </div>
        </div>
        <div v-else>
          <p class="user-card-front__content--default-text">
            I haven't decided yet :)
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

  public subjects = [
    { title: 'Favorite Tools' },
    { title: 'intresting tools' },
  ];

  get topExp() {
    return !!this.user.topExperience ? this.user.topExperience : [];
  }

  get topInt() {
    return !!this.user.topInterest ? this.user.topInterest : [];
  }

  mounted() {
    // console.log(this.user);
  }
}
</script>

<style lang="scss" scoped>
.user-card-front {
  width: 100%;
  height: 100%;

  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.3);

  background-color: #f4f4f4;
  border-radius: 0.5rem;
  border: 1px solid #f4f4f4;
  display: flex;
  font-size: 1.6rem;
  flex-direction: column;
  justify-content: space-between;

  &__header {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    &--userImg {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    &--title {
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 400;
    }
    &--sub-title {
      font-style: italic;
      font-size: 1.2rem;
    }
  }

  &__content {
    height: 60%;

    background-color: #fff;
    padding: 1rem;
    // padding-top: 2rem;
    border-radius: 0 0 0.5rem 0.5rem;

    &--subject {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 2rem;
    }

    &--default-text {
      color: grey;
      font-size: 1rem;
    }

    &--lastSubject {
      margin-bottom: 1rem;
    }

    &--title {
      width: 100%;
      text-align: left;
    }

    &--toolsContainer {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }

  &__tool {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;

    &--toolImg {
      width: 4rem;
      height: 4rem;
    }
    &--toolName {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
}

.divider {
  border-bottom: 1px solid #eeeeee;
  margin: 0 0 1rem 0;
  width: 100%;
}

.darkenDivider {
  border-bottom: 1px solid #e2e1e1;
  margin: 0 0 1rem 0;
  width: 70%;
}
</style>
