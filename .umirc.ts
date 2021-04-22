import { defineConfig } from "umi";
import { resolve } from "path";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  theme: {
    "@blue": "#40a9ff",
  },
  history: { type: "hash" },
  publicPath: "./",
  alias: {
    "@components": resolve(__dirname, "./components"),
  },
  routes: [
    {
      path: "/",
      component: "@/pages",
      routes: [
        { path: "/", component: "@/pages/portal" },
        { path: "/test", component: "@/pages/test" },
        { path: "/AQ", component: "@/pages/AQ" },
        { path: "/blog", component: "@/pages/blog" },
        { path: "/blog/editor", component: "@/pages/blog/editor" },
        { path: "/blog/detail/:id", component: "@/pages/blog/detail" },
        { path: "/article/:key", component: "@/pages/articleLib" },
        { path: "/AQ/:id", component: "@/pages/question" },
        { path: "/aboutMe/:key", component: "@/pages/aboutMe" },
        {
          path: "/article/details/:id",
          component: "@/pages/articleLib/bookDetails",
        },
      ],
    },
  ],
  fastRefresh: {},
});
