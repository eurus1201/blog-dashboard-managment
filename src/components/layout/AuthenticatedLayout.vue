<template>
  <div class="authenticated-layout">
    <header>
      <NavbarComponent />
    </header>
  </div>
  <main role="main">
    <article class="d-flex">
      <Sidebar />
      <article class="content container-fluid">
          <section class="main-content">
              <router-view></router-view>
            </section>
        </article>
    </article>
  </main>
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
}

.main-content {
  flex: 1;
}
</style>
