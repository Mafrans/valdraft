import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { handleAddGuestTeamToSession } from "./handlers/session/addGuestTeam";
import { handleAddTeamToSession } from "./handlers/session/addTeam";
import { handleCreateSession } from "./handlers/session/create";
import { handleGetSession } from "./handlers/session/get";
import { handleCreateTeam } from "./handlers/team/create";
import { handleGetTeam } from "./handlers/team/get";
import { handleSearchTeam } from "./handlers/team/search";
import { addTeamToSessionSchema } from "./schemas/session/addTeam";
import { getSessionSchema } from "./schemas/session/get";
import { createTeamSchema } from "./schemas/team/create";
import { addGuestTeamToSessionSchema } from "./schemas/team/createGuest";
import { getTeamSchema } from "./schemas/team/get";
import { searchTeamSchema } from "./schemas/team/search";
const server = new Elysia();

export async function start() {
  server.use(cors());

  server.post("/session/create", handleCreateSession);
  server.get("/session/:id", handleGetSession, {
    schema: getSessionSchema,
  });
  server.post("/session/:id/addTeam", handleAddTeamToSession, {
    schema: addTeamToSessionSchema,
  });
  server.post("/session/:id/addGuestTeam", handleAddGuestTeamToSession, {
    schema: addGuestTeamToSessionSchema,
  });

  server.post("/team/create", handleCreateTeam, {
    schema: createTeamSchema,
  });
  server.get("/team/:id", handleGetTeam, {
    schema: getTeamSchema,
  });
  server.get("/team/search", handleSearchTeam, {
    schema: searchTeamSchema,
  });

  server.listen(3000);
}
