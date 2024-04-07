<template>
  <div class="container-fluid h-100">
    <h1 class="mt-4 mb-4">New Article</h1>
    <div class="row justify-content-center h-100">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-9 col-12">
            <!-- Title -->
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="post.title"
                placeholder="Enter title"
                required
              />
            </div>
            <!-- Description -->
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="post.description"
                placeholder="Enter description"
                required
              />
            </div>

            <!-- Body -->
            <div class="form-group">
              <label for="body">Body</label>
              <textarea
                class="form-control"
                id="body"
                rows="5"
                v-model="post.body"
                placeholder="Enter body"
                required
              ></textarea>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <!-- Tags -->
            <div class="form-group">
              <label>Tags</label>
              <div v-for="(tag, index) in tags" :key="index">
                <input
                  type="checkbox"
                  :id="'tag_' + index"
                  :value="tag"
                  v-model="selectedTags"
                />
                <label class="p-1" :for="'tag_' + index">{{ tag }}</label>
              </div>
              <div class="input-group mt-2">
                <input
                  type="text"
                  class="form-control"
                  v-model="newTag"
                  placeholder="Enter new tag"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="addNewTag"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAllTags, createNewArticle } from "@/services/articaleService";
import Toast from "@/components/Toast.vue";
import router from "@/router";

const showToastMessage = (message, status) => {
  const toast = new Toast({
    propsData: {
      message,
      status,
    },
  });
  toast.$mount();
  document.body.appendChild(toast.$el);
};

export default {
  name: "NewArticle",
  data() {
    return {
      post: {
        title: "",
        tags: [],
        description: "",
        body: "",
      },
      isLoading: false,
      tags: [],
      selectedTags: [],
      newTag: "",
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      try {
        await createNewArticle(
          this.post.title,
          this.post.description,
          this.post.body,
          this.selectedTags
        );
        this.resetForm();
        showToastMessage("Article created successfully.", "Success");
        router.push("/allPosts");
      } catch (error) {
        showToastMessage(error, "error");
        console.error("Error creating article:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async loadTags() {
      try {
        this.tags = await getAllTags();
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    },
    addNewTag() {
      if (this.newTag.trim() !== "") {
        this.selectedTags.push(this.newTag.trim());
        this.newTag = "";
      }
    },
    resetForm() {
      this.post.title = "";
      this.selectedTags = [];
      this.newTag = "";
      this.post.description = "";
      this.post.body = "";
    },
  },
  mounted() {
    this.loadTags();
  },
};
</script>
