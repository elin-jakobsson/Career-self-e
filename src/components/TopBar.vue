<template>
  <div class="top-bar">
    <div class="top-bar__container top-bar__container--space-between">
      <img class="top-bar__image" src="@/assets/sigma_logo.png" />
      <div class="top-bar__container__group" v-if="$firebase.isSignedIn">
        <div v-if="isConfigured">
          <button class="top-bar__button" @click="routeTo('home')">Home</button>
          <button class="top-bar__button" @click="routeTo('team-stats')">
            Team stats
          </button>
          <button class="top-bar__button" @click="routeTo('user-approval')">
            User approval
          </button>
          <button class="top-bar__button" @click="routeTo('self-evaluation')">
            Self evaluation
          </button>
          <button class="top-bar__button" @click="$emit('triggerEdit')">
            Edit user
          </button>
          <div class="vertical-divider"></div>
          <!-- <div class="top-bar__edit-user-button">
            <i class="fas fa-cog"></i>
          </div>-->
        </div>
        <button class="top-bar__button" @click="$firebase.signOut()">
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public routeTo(to: string) {
    this.$router.push({ name: to });
  }

  public get isConfigured() {
    if (this.$firebase.currentUser) {
      const uid = this.$firebase.currentUser.uid;
      const user = (this.allUsers as any).find((doc: any) => doc.uid === uid);
      if (!!user && user.approved && user.configured) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/global-variables.scss';

.top-bar {
  position: relative;
  height: $topBarHeight;
  &__container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $topBarHeight;
    padding: 1.5rem;
    background: black;
    display: flex;
    align-items: center;
    color: white;
    &--space-between {
      justify-content: space-between;
    }
    &__group,
    &__group > div {
      height: 100%;
      display: flex;
      // align-items: center;
    }
  }
  &__image {
    height: 100%;
  }

  &__button {
    height: 100%;
    font-size: 1.8rem;
    padding: 0 1rem;
    &:hover {
      border-bottom: 1px solid white;
    }
  }
  // &__edit-user-button {
  // }
}

.vertical-divider {
  display: inline-block;
  border-left: 1px solid gray;
  margin: 0 2rem;
  height: 90%;
}
</style>
