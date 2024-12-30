<template>
  <div class="default-layout">
    <!-- 頂部導航列 -->
    <AppNavbar />
  
    <!-- 內容區域 -->
    <main>
      <router-view /> <!-- 動態顯示頁面內容 -->
    </main>
  
    <!-- 頁尾 -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}
</style>
