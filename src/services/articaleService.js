import withAuth from "./withAuth";

const BASE_URL = "https://api.realworld.io/api";

export const getAllArticles = async () => {
  try {
    const data = await withAuth("get", `${BASE_URL}/articles`);
    return data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const deleteArticle = async (slug) => {
  try {
    await withAuth("delete", `${BASE_URL}/articles/${slug}`);
    console.log("Article deleted successfully.");
  } catch (error) {
    console.error("Error deleting article:", error);
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
    console.log("Article created successfully.");
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};
