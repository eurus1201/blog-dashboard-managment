<template>
  <div>
    <aside class="sidebarClass bg-primary" :class="{ show: isSidebarOpen }">
      <div
        class="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <p class="post">Post</p>
        <router-link
          class="nav-link "
          :class="{ active: isActive('/allPosts') }"
          to="/allPosts"
          >All Articles</router-link
        >
        <router-link
          class="nav-link"
          :class="{ active: isActive('/newPost') }"
          to="/newPost"
          >New Article</router-link
        >
      </div>
    </aside>
    <button class="sidebar-toggle" @click="toggleSidebar" v-if="isMobile">
      <span class="navbar-toggler-icon">...</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isSidebarOpen: false,
      isMobile: false,
    };
  },
  created() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener("resize", this.updateIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isMobile) {
        document.querySelector(".sidebarClass").style.width = this.isSidebarOpen
          ? "250px"
          : "0";
      }
    },
    isActive(route) {
      return this.$route.path === route;
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth < 768;
    },
  },
};
</script>

<style scoped>
.sidebarClass {
  position: fixed;
  left: 0;
  height: 100vh;
  width: 250px;
  top:55px;
  transition: width 0.3s ease;
  overflow: hidden;
}
.show {
  width: 300px;
}
.sidebar-toggle {
  position: absolute;
  top:45px;
  left: 0px;;
  display: none;
  z-index: 30000;
}
.sidebar-toggle .navbar-toggler-icon {
  color: #000;
  font-size: 24px;
}
.post {
  width: 45px;
  height: 26px;
  margin: 25px 185px 16px 20px;
  font-family: HelveticaNeue;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
.nav-link {
  text-align: left;
  color: #fff;
  transition: background-color 0.3s ease;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.15);
}
@media (max-width: 767px) {
  .sidebarClass {
    width: 0;
    overflow: hidden;
    transition: none;
  }
  .show {
    width: 0;
  }
  .sidebar-toggle {
    display: block;
  }
}
</style>
