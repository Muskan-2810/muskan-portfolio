import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muskan Vishwakarma — Software Developer & AI Engineer",
    short_name: "Muskan Vishwakarma",
    description:
      "Portfolio of Muskan Vishwakarma — Software Developer and AI Engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
