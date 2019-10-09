<template>
  <div class="edit-form">
    <h2 class="edit-form--title">Who are you?</h2>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-input">
        <input
          type="text"
          id="userName"
          @input="updateInput($event.target.value, 'name')"
          :value="userItem.name"
          required
        />
        <label for="userName">Name</label>
      </div>
      <div class="edit-form_url-container">
        <div
          ref="userImageUrl"
          class="edit-form_url-container--user-url"
          :style="{
            background: `url(
              ${
                !!userItem.photoUrl ? userItem.photoUrl : 'default-user-2.png'
              }  
              ) center center / cover no-repeat, url(default-user-2.png )`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }"
        ></div>
        <div class="edit-form_url-container--user-url-input-wrapper">
          <div class="form-input">
            <input
              type="text"
              id="userPhoto"
              required
              @input="updateInput($event.target.value, 'photoUrl')"
              :value="userItem.photoUrl"
            />
            <label for="userPhoto">URL-link to a photo of you</label>
          </div>
        </div>
      </div>
      <div class="form-input">
        <input
          type="text"
          id="userProfession"
          @input="updateInput($event.target.value, 'profession')"
          :value="userItem.profession"
          required
        />
        <label for="userProfession">Profession</label>
      </div>
      <div class="form-input">
        <input
          type="text"
          id="userTeam"
          @input="updateInput($event.target.value, 'team')"
          :value="userItem.team"
          required
        />
        <label for="userTeam">Team</label>
      </div>
      <div class="edit-form--button-container">
        <!-- <button class="edit-form--button-container_clear" >Clear all</button> -->
        <button type="submit" class="edit-form--button-container_save">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '../models';
import { bindFirestorePath, setFirestoreDocument } from 'vuetyfire';
@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly firtsConfiguration!: boolean;
  public userImage = '';
  public userItem: User = {
    approved: false,
    configured: false,
    name: '',
    team: '',
    email: '',
    photoUrl: '',
    profession: '',
    topExperience: [],
    topInterest: [],
    uid: '',
  };

  get userPath() {
    const uid = this.$firebase!.currentUser!.uid;
    return `users/${uid}`;
  }

  updateInput(input: string, parameter: string) {
    if (parameter === 'photoUrl') {
      this.userItem.photoUrl = input.trim();
    }
    if (parameter === 'profession') {
      this.userItem.profession = input;
    }
    if (parameter === 'team') {
      this.userItem.team = input;
    }
    if (parameter === 'name') {
      this.userItem.name = input;
    }
  }

  onSubmit() {
    console.log('send ', this.userItem);

    if (this.firtsConfiguration) {
      this.userItem.configured = true;
    }

    setFirestoreDocument({
      data: this.userItem,
      path: this.userPath,
      merge: true,
    })
      .then(() => {
        console.log('Success!');
        if (this.firtsConfiguration) {
          this.$router.push({ name: 'home' });
        } else {
          this.$emit('cancel');
        }
      })
      .catch((err?: any) => {
        console.log(err);
      });
  }

  created() {
    // console.log(this.$firebase!.currentUser!.uid);
    bindFirestorePath({
      vm: this,
      key: 'userItem',
      path: this.userPath,
    });
  }
}
</script>

<style lang="scss" scoped>
.edit-form {
  width: 50vw;
  min-width: 40rem;
  max-width: 60rem;
  &--title {
    margin: 1rem 1rem 4rem 1rem;
    width: 80%;
    min-width: 30rem;
    color: #3c1da0;
  }

  &_url-container {
    display: flex;

    &--user-url {
      // background: url('../../public/default-user-2.png');
      // background-position: center;
      // background-repeat: no-repeat;
      // background-size: cover;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      margin-right: 3rem;
      position: relative;
    }
    &--user-url-input-wrapper {
      flex: 1;
    }
  }

  &--button-container {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    & button {
      padding: 1rem 3rem;
      border-radius: 3rem;
      transition: 0.5s;
    }

    &_clear {
      border: 1px #a1a1a1 solid;
      color: gray;
      margin-right: 4rem;

      &:hover {
        border: 1px #868686 solid;
        color: #333333;
      }
    }
    &_save {
      background-color: #4e29c7;
      color: #fff;
      &:hover {
        background-color: #3c1da0;
      }
    }
  }
}
</style>
