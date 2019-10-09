<template>
  <div class="team-member">
    <div class="team-member__avatar avatar">
      <div
        :style="{
          background: 'url(' + avatarImage + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
    </div>
    <div class="team-member__name">
      Gandalf the Grey
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public avatarImage =
    'https://vignette.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../styles/global-variables.scss';
.team-member {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: auto;
  font-size: 1.25rem;
  background-color: $teamMemberBackgroundColor;
  border-radius: 1.7rem;
  //height: 12rem,

  &__avatar {
    flex: 0 0 auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;

    div {
      width: 3.3rem;
      height: 3.3rem;
      border-radius: 50%;
    }
  }

  &__name {
    flex: 1 1 auto;
    padding-top: 0.95rem;
    color: white;
    padding-left: 2rem;
  }
}
</style>
