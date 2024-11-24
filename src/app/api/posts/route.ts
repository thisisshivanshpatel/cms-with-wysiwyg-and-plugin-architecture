import { pool } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content, slug } = await request.json();
    await pool.query(
      "INSERT INTO cms.posts (slug,title, content,created_at,updated_at) VALUES ($1, $2, $3, now(), now())",
      [slug, title, content]
    );
    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      // Fetch a specific post by slug
      const result = await pool.query(
        "SELECT * FROM cms.posts WHERE slug = $1",
        [slug]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result.rows[0], { status: 200 });
    } else {
      // Fetch all posts
      const result = await pool.query(
        "SELECT slug, title FROM cms.posts order by updated_at desc"
      );
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { slug, title, content, id } = await request.json();

    // Update the post
    await pool.query(
      "UPDATE cms.posts SET title = $1, slug = $2, content = $3,updated_at = now() WHERE id = $4",
      [title, slug, content, id]
    );

    return NextResponse.json(
      { message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { slug } = await request.json();
  console.log("slug", slug);

  await pool.query("DELETE FROM cms.posts WHERE slug = $1", [slug]);
  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
