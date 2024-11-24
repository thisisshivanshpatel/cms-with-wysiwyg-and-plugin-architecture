export async function createPost(
  slug: string,
  title: string,
  content: { content: string }
) {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        title,
        content,
      }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getPost() {
  try {
    const response = await fetch("/api/posts");
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deletePost(slug: string) {
  try {
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`/api/posts?slug=${slug}`);
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updatePost(
  id: number,
  slug: string,
  title: string,
  content: { content: string }
) {
  try {
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, title, content, id }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
