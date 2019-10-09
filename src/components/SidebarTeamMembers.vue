<template>
  <div class="sidebar">
    <div class="sidebar__header sidebar-header">
      <div
        class="sidebar-header__icon"
        :style="{
          background: 'url(' + groupImage + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <div class="sidebar-header__title">
        FRONTEND GROUP
      </div>
      <hr class="sidebar-header__title-divider light" />
    </div>
    <div class="sidebar__search sidebar-search">
      <input class="sidebar-search__input-field" />
    </div>
    <div class="sidebar__main sidebar-main">
      <div class="sidebar-main__team-members-title">
        Team members
      </div>
      <hr class="sidebar-main__team-members-divider light" />
      <team-member />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserLabel from '../components/UserLabel.vue';
import TeamMember from '../components/TeamMember.vue';

@Component({
  components: {
    UserLabel,
    TeamMember,
  },
})
export default class extends Vue {
  public groupImage =
    'http://icons.iconarchive.com/icons/dakirby309/windows-8-metro/256/Apps-Command-Prompt-Metro-icon.png';
}
</script>

<style scoped lang="scss">
@import '../styles/global-variables.scss';
.sidebar {
  height: 100%;
  width: 30rem;
  background-color: $sidebarBackgroundColor;
  box-shadow: $sidebarBoxShadow;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  &__header {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 1rem;
    margin-top: 1rem;
  }
  .sidebar-header {
    &__title {
      text-align: center;
      color: white;
      padding-top: 1rem;
    }

    &__icon {
      width: 8rem;
      height: 8rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 50%;
    }
  }
  .sidebar__search {
    width: 100%;
    margin-top: 2.5rem;

    .sidebar-search {
      &__input-field {
        width: 93%;
        display: block;
        margin: 0 auto;
        border-radius: 20px;
      }
    }
  }

  .sidebar-main {
    &__team-members-title {
      font-size: 1.35rem;
      color: white;
    }
  }

  hr {
    background: white;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
