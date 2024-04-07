<template>
  <div class="container mt-4">
    <h1>All posts</h1>
    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
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
          <tr v-for="(article, index) in articles" :key="article.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ article.title }}</td>
            <td>{{ article.author.username }}</td>
            <td>
              <span
                v-for="(tag, index) in article.tagList"
                :key="index"
                class="badge bg-primary"
                >{{ tag }}</span
              >
            </td>
            <td>{{ article.description }}</td>
            <td>{{ article.createdAt }}</td>
            <td>
              <select
                class="form-select btn-primary"
                @change="handleActionChange(article, $event.target.value)"
              >
                <option value="" disabled selected>Select Action</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <router-link
            :to="getPaginationPath(currentPage - 1)"
            class="page-link"
            tabindex="-1"
            :aria-disabled="currentPage === 1"
            >Previous</router-link
          >
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
        >
          <router-link :to="getPaginationPath(pageNumber)" class="page-link">{{
            pageNumber
          }}</router-link>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <router-link
            :to="getPaginationPath(currentPage + 1)"
            class="page-link"
            >Next</router-link
          >
        </li>
      </ul>
    </nav>

    <!-- Modal for delete confirmation -->
    <div
      v-if="deleteModalVisible"
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this article?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="deleteConfirmed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getAllArticles, deleteArticle } from "@/services/articaleService";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  name: "AllPosts",
  setup() {
    const route = useRoute();
    const articles = ref([]);
    const currentPage = ref(1);
    const deleteTargetSlug = ref(null);
    const deleteModalVisible = ref(false);

    onMounted(async () => {
      await loadArticles();
    });

    const loadArticles = async () => {
      const page = Number(route.params.page) || 1;
      articles.value = await getAllArticles(page);
      currentPage.value = page;
    };
    const handleActionChange = (article, action) => {
      if (action === "delete") {
        deleteTargetSlug.value = article.slug;
        deleteModalVisible.value = true;
        const deleteModal = document.getElementById("deleteModal");
        if (deleteModal) {
          deleteModal.classList.add("show");
          deleteModal.style.display = "block";
        }
      } else if (action === "edit") {
        router.push(`/articles/edit/${article.slug}`);
      }
    };
    const deleteConfirmed = async () => {
      try {
        await deleteArticle(deleteTargetSlug.value);
        await loadArticles();
        deleteModalVisible.value = false;
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    };
    const closeModal = () => {
      deleteModalVisible.value = false;
    };
    const totalPages = computed(() => {
      return Math.ceil(articles.value.length / 10); // Assuming 10 articles per page
    });

    const getPaginationPath = (page) => {
      if (page === 1) {
        return "/articles";
      } else {
        return `/articles/page/${page}`;
      }
    };
    return {
      articles,
      currentPage,
      totalPages,
      getPaginationPath,
      handleActionChange,
      deleteConfirmed,
      closeModal,
    };
  },
};
</script>

<style></style>
