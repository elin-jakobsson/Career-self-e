<template>
  <div v-if="!openEditConfiguration" class="welcome">
    <h1>Welcome, {{ name }}!</h1>
    <p>
      You have just created an account. To get you started we need you to fill
      in some more information about yourself.
    </p>

    <button
      class="button welcome__button welcome__button--fixed"
      @click="openEditConfiguration = true"
    >
      Continue and edit your profile ⟹
    </button>
  </div>
  <div v-else class="edit-form-container">
    <edit-form :firtsConfiguration="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setFirestoreDocument, bindFirestorePath } from 'vuetyfire';
import EditForm from '../components/EditForm.vue';
import { User } from '../models';

@Component({
  components: { EditForm },
})
export default class extends Vue {
  public name: string = '';
  public openEditConfiguration: boolean = false;

  public created() {
    this.name = this.$firebase.currentUser!.displayName || '';
  }

  // public setUser() {
  //   // const uid = this.$firebase.currentUser!.uid;
  //   // const path = this.userPath;
  //   this.userItem.configured = true;
  //   // const data = {
  //   //   configured: true,
  //   // };
  //   setFirestoreDocument({
  //     path: this.userPath,
  //     data: this.userItem,
  //     merge: true,
  //   })
  //     .then(() => {
  //       this.$router.push({ name: 'home' });
  //     })
  //     .catch(err => {
  //       throw new Error(err);
  //     });
  // }
}
</script>

<style lang="scss" scoped>
.welcome {
  padding: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin-top: 5rem;
  }
  &__button {
    background-color: palegreen;
    &--fixed {
      position: fixed;
      bottom: 10rem;
      right: 10rem;
    }
  }
}
.edit-form-container {
  padding: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
