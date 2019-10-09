<template>
  <div class="home">
    <sidebar-team-members />
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
import { bindFirestorePath } from 'vuetyfire';

@Component({
  components: { SidebarTeamMembers, UserCard },
})
export default class extends Vue {
  public usersList: any[] = [];
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
}
.user-card-main {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // align-content: flex-start;
  // justify-content: flex-start;
  overflow-y: scroll;

  &__row {
    margin: 0 auto;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
