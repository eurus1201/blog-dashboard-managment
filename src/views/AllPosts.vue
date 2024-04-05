<template>
  <div class="container">
    <h1>All posts</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Tags</th>
            <th scope="col">Excerpt</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Table rows here -->
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [], // Array to store posts
      newPost: { title: "", content: "" }, // Object for creating new post
      editedPost: { id: null, title: "", content: "" }, // Object for editing existing post
      editingPost: false, // Flag to control visibility of edit modal
    };
  },
  methods: {
    addPost() {
      // Implement logic to add a new post
      // Push newPost to the posts array
      this.posts.push({ ...this.newPost, id: this.posts.length + 1 });
      // Reset newPost object
      this.newPost = { title: "", content: "" };
    },
    editPost(post) {
      // Set editedPost to the selected post
      this.editedPost = { ...post };
      // Show edit modal
      this.editingPost = true;
    },
    savePostChanges() {
      // Find the index of the edited post
      const index = this.posts.findIndex(
        (post) => post.id === this.editedPost.id
      );
      // Update the post in the array
      this.posts.splice(index, 1, this.editedPost);
      // Close edit modal
      this.editingPost = false;
    },
    deletePost(postId) {
      // Remove the post from the posts array
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
    closeModal() {
      // Close edit modal
      this.editingPost = false;
    },
  },
};
</script>

<style>
.modal.show {
  display: block;
}
</style>
