<template>
    <div class="container">
      <h1>Post Management</h1>
      
      <!-- Create Post Form -->
      <form @submit.prevent="addPost">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="newPost.title" required>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea class="form-control" id="content" v-model="newPost.content" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add Post</button>
      </form>
      
      <hr>
      
      <!-- List of Posts -->
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id" class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <button class="btn btn-sm btn-info" @click="editPost(post)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deletePost(post.id)">Delete</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No posts available.</p>
      </div>
      
      <!-- Modal for Editing Post -->
      <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': editingPost }">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Post</h5>
              <button type="button" class="close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="editTitle">Title</label>
                <input type="text" class="form-control" id="editTitle" v-model="editedPost.title" required>
              </div>
              <div class="form-group">
                <label for="editContent">Content</label>
                <textarea class="form-control" id="editContent" v-model="editedPost.content" required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary" @click="savePostChanges">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [], // Array to store posts
        newPost: { title: '', content: '' }, // Object for creating new post
        editedPost: { id: null, title: '', content: '' }, // Object for editing existing post
        editingPost: false // Flag to control visibility of edit modal
      };
    },
    methods: {
      addPost() {
        // Implement logic to add a new post
        // Push newPost to the posts array
        this.posts.push({...this.newPost, id: this.posts.length + 1});
        // Reset newPost object
        this.newPost = { title: '', content: '' };
      },
      editPost(post) {
        // Set editedPost to the selected post
        this.editedPost = {...post};
        // Show edit modal
        this.editingPost = true;
      },
      savePostChanges() {
        // Find the index of the edited post
        const index = this.posts.findIndex(post => post.id === this.editedPost.id);
        // Update the post in the array
        this.posts.splice(index, 1, this.editedPost);
        // Close edit modal
        this.editingPost = false;
      },
      deletePost(postId) {
        // Remove the post from the posts array
        this.posts = this.posts.filter(post => post.id !== postId);
      },
      closeModal() {
        // Close edit modal
        this.editingPost = false;
      }
    }
  };
  </script>
  
  <style>
  .modal.show {
    display: block;
  }
  </style>
  