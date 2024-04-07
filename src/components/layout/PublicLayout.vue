<template>
  <div class="public-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PublicLayout",
};
</script>
<style scoped>
.public-layout {
  height: 100vh;
  display: flex;
  align-items: center;
}

.main-content {
  flex: 1;
}
</style>