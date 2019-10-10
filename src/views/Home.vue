<template>
  <div class="home">
    <!-- <sidebar-team-members /> -->
    <sidebar>
      <template v-slot:header>
        <div class="home__sidebar__header">
          <div
            class="home__sidebar__header--team-image"
            :style="{
          background: `url(${
            !!teamImage ? teamImage : 'default-user-2.png'
          })center center / cover no-repeat, url(default-user-2.png )`,
        }"
          ></div>
          <h4>Team name</h4>
        </div>
      </template>

      <div class="home__sidebar__channels">
        <p>#channels</p>
        <hr class="light" />
      </div>
      <template v-slot:sidebar__scroll-list>
        <team-label v-for="n in 3" :key="n" />
      </template>
    </sidebar>
    <div class="user-card-main">
      <div class="user-card-main__row">
        <user-card v-for="user in usersList" :key="user.uid" :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SidebarTeamMembers from '../components/SidebarTeamMembers.vue';
import UserCard from '../components/user-card/UserCard.vue';
import Sidebar from '../components/Sidebar.vue';
import TeamLabel from '../components/TeamLabel.vue';
import { bindFirestorePath } from 'vuetyfire';

@Component({
  components: { SidebarTeamMembers, UserCard, Sidebar, TeamLabel },
})
export default class extends Vue {
  public usersList: any[] = [];
  public teamImage: string =
    'https://miro.medium.com/max/3200/0*QUqE4WGF8_cC9bIl.jpg';
  created() {
    bindFirestorePath({
      vm: this,
      key: 'usersList',
      path: 'users',
    });
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: row;

  &__sidebar {
    &__channels {
      padding: 2rem;
      color: #f4f4f4;
      & p {
        margin-bottom: 0.5rem;
      }
    }
    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f4f4f4;
      justify-content: center;
      &--team-image {
        border-radius: 50%;
        box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
        height: 8rem;
        width: 8rem;
        margin-bottom: 1rem;
      }
    }
  }
}

.user-card-main {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  overflow-y: auto;

  &__row {
    width: 95%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    grid-gap: 3rem;
    justify-items: center;
    // margin: 0 auto;
    // display: flex;
    // width: 100%;
    // flex-wrap: wrap;
    // flex-direction: row;
  }
}
</style>
