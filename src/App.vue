<template class="template">
  <div>
    <div class="header">
      <router-link to="/">ВСЕ СОБАКЕНЫ</router-link>
      <router-link to="/random-dog">СЛУЧАЙНЫЙ СОБАКЕН</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>

<style lang="scss" scoped>

  .template {
    min-height: 100vh;
  }

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    display: flex;
    flex-direction: row;

    padding: 25px 60px;
    background: #f8f1ff;


    a {
      margin-right: 30px;
      transition: opacity 0.3s ease-in-out;
      font-weight: 600;
      font-size: 1.5rem;

      &:hover {
        opacity: 0.6;
      }
    }

    @media screen and (max-width: 767px) {
      padding: 25px 20px;
    }
  }
</style>
