import { defineConfig } from "umi";
import { resolve } from "path";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
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
        { path: "/article", component: "@/pages/articleLib" },
        { path: "/question/:id", component: "@/pages/question" },
      ],
    },
  ],
  fastRefresh: {},
});
