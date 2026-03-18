import homepage from "./index.html";

const server = Bun.serve({
  port: parseInt(process.env.PORT || "3000"),
  routes: {
    "/": homepage,
  },
  development: process.env.NODE_ENV !== "production",
});

console.log(`Listening on http://localhost:${server.port}`);
