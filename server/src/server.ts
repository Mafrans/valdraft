import { Elysia } from "elysia";
const server = new Elysia();

export async function start() {
  server.listen(3000);
}
