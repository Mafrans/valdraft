import { Static } from "@sinclair/typebox";
import { Handler } from "elysia";
import { CreateSession, GetLatestSession } from "../../data/session";
import { CreateTeam, GetLatestTeam } from "../../data/team";
import { createTeamSchema } from "../../schemas/team/create";

type CreateTeamBody = Static<typeof createTeamSchema.body>;

export const handleCreateTeam: Handler = ({ body }) => {
  const { name, shortCode, guest } = body as CreateTeamBody;

  return CreateTeam.get({
    $name: name,
    $shortCode: shortCode,
    $guest: guest,
  });
};
