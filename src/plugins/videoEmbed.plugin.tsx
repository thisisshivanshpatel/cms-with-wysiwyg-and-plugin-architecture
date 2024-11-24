import { Node, mergeAttributes } from "@tiptap/core";

export const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: "355",
      },
      height: {
        default: "200",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="video-embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src } = HTMLAttributes;

    // Extract video ID for YouTube URLs
    const getYouTubeId = (url: string) => {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
      );
      return match ? match[1] : url;
    };

    // Create embedded iframe based on video URL
    const getEmbedUrl = (url: string) => {
      if (url.includes("youtube")) {
        const videoId = getYouTubeId(url);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // Add support for other video platforms here
      return url;
    };

    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "video-embed" }),
      [
        "iframe",
        {
          src: getEmbedUrl(src),
          frameborder: "0",
          allowfullscreen: "true",
          width: HTMLAttributes.width,
          height: HTMLAttributes.height,
          loading: "lazy",
        },
      ],
    ];
  },
});
