<template>
  <div class="user-approval">
    <h1>Approve users</h1>
    <div class="user-approval__users">
      <div
        class="user-approval__users__user"
        v-for="(user, index) in allUsers"
        v-bind:key="index"
      >
        <div>
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
        <div
          class="user-approval__toggle"
          :class="{ 'user-approval__toggle--toggled': !!user.approved }"
          @click="changeApprovalOfUser(user)"
        >
          ✓
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setFirestoreDocument } from 'vuetyfire';

@Component
export default class extends Vue {
  public changeApprovalOfUser(user: any) {
    const path = `users/${user.uid}`;
    const data = {
      approved: !user.approved,
    };
    setFirestoreDocument({ path, data, merge: true });
  }
}
</script>

<style lang="scss" scoped>
.user-approval {
  display: flex;
  flex-direction: column;
  padding: 6rem;
  &__users {
    display: flex;
    flex-direction: column;
    &__user {
      height: 8rem;
      background: #f4f4f4;
      border-radius: 1rem;
      padding: 1rem;
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__toggle {
    height: 6rem;
    width: 6rem;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px solid rgba(0, 0, 0, 0.2);
    color: transparent;
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &--toggled {
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
