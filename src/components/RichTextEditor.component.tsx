"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

const RichTextEditor = ({
  getHtmlContent,
  content,
}: {
  getHtmlContent: (value: string) => void;
  content: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose max-w-none prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline focus:outline-none",
      },
      handleClick: (view, pos, event) => {
        const target = event.target as HTMLElement;
        const link = target.closest("a");

        if (link instanceof HTMLAnchorElement) {
          event.preventDefault();
          window.open(link.href, "_blank", "noopener,noreferrer");
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      getHtmlContent(html);
    },
  });

  // Effect to update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p>Start writing...</p>");
    }
  }, [content, editor]);

  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    let validUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      validUrl = `https://${url}`;
    }

    // Checking if there's selected text
    const selectedText = editor.state.selection.empty
      ? url // If no text is selected, use the URL as link text
      : editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to
        );

    if (editor.state.selection.empty) {
      // If no text is selected, insert the URL as a link
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: selectedText,
          marks: [
            {
              type: "link",
              attrs: { href: url },
            },
          ],
        })
        .run();
    } else {
      // If text is selected, convert it to a link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const addImage = () => {
    if (!editor) return;

    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="p-4 border rounded w-[80%] bg-white">
      <div className="flex flex-wrap gap-2 mb-4 bg-gray-100 p-2 rounded">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 ${
            editor.isActive("underline")
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          <AlignCenter size={16} />
        </button>

        {/* Special Features */}
        <button
          onClick={addLink}
          className={`px-2 py-1 ${
            editor.isActive("link") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <LinkIcon size={16} />
        </button>
        <button
          onClick={addImage}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
        >
          <ImageIcon size={16} />
        </button>
      </div>

      <style jsx global>{`
        .ProseMirror a {
          color: #2563eb;
          text-decoration: none;
        }
        .ProseMirror a:hover {
          text-decoration: underline;
          color: #1d4ed8;
        }
      `}</style>

      <EditorContent
        editor={editor}
        className="min-h-[300px] max-h-[300px] overflow-y-auto border p-2 bg-white"
      />
    </div>
  );
};

export default RichTextEditor;
