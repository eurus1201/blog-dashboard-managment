<template>
  <div class="authenticated-layout container w-100">
    <header>
      <NavbarComponent />
    </header>
    <main role="main" class="w-100">
      <Sidebar />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "AuthenticatedLayout",
  components: {
    Sidebar,
    NavbarComponent,
  },
};
</script>
<style scoped>
.authenticated-layout {
  display: flex;
  margin-top: 40px;
}

.main-content {
  flex: 1;
}
</style>
