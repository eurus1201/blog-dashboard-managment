import withAuth from "./withAuth";
import Toast from "@/components/Toast.vue";
import router from "@/router";

const BASE_URL = "https://api.realworld.io/api";

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

export const getAllArticles = async () => {
  try {
    const data = await withAuth("get", `${BASE_URL}/articles`);
    return data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    showToastMessage("Error fetching articles.", "Error");
    return [];
  }
};

export const deleteArticle = async (slug) => {
  try {
    await withAuth("delete", `${BASE_URL}/articles/${slug}`);
    showToastMessage("Article deleted successfully.", "Success");
  } catch (error) {
    console.error("Error deleting article:", error);
    showToastMessage("Error deleting article.", "Error");
    throw error;
  }
};

export const createNewArticle = async (title, description, body, tagList) => {
  try {
    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    await withAuth("post", `${BASE_URL}/articles`, articleData);
    showToastMessage("Well done! Article created successfully.", "Success");
    router.push("/allPosts");
  } catch (error) {
    console.error("Error creating article:", error);
    showToastMessage("Error creating article.", "Error");
    throw error;
  }
};

export const editArticle = async (slug, updatedBody) => {
  try {
    const articleData = {
      article: {
        body: updatedBody,
      },
    };
    await withAuth("put", `${BASE_URL}/articles/${slug}`, articleData);
    showToastMessage("Well done! Article updated successfully.", "Success");
    router.push("/allPosts");
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
