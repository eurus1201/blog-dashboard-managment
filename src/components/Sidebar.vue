<template>
  <aside class="water-blue">
    <nav class="sidebar">
      <p class="post">Post</p>
      <ul class="list-unstyled">
        <li class="item">
          <span>All Articles</span>
        </li>
        <li class="item">
          <span>New Article</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.water-blue {
  background-color: #1c7cd5;
  position: fixed;
  left: 0;
  height: 100vh;
  width: 250px;
  top: 55px;
}
.post {
  width: 45px;
  height: 26px;
  margin: 10px 185px 16px 20px;
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
.item {
  width: 250px;
  height: 43px;
  margin: 16px 0;
  padding: 11px 132px 11px 34px;
  text-align: left;
  color: #fff;
}
</style>
