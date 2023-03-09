import { Static } from "@sinclair/typebox";
import { Handler } from "elysia";
import { CreateSession, GetLatestSession } from "../../data/session";
import { CreateTeam, GetLatestTeam } from "../../data/team";
import { createTeamSchema } from "../../schemas/team/create";

type CreateTeamBody = Static<typeof createTeamSchema.body>;

export const handleCreateTeam: Handler = ({ body }) => {
  const { name, shortCode } = body as CreateTeamBody;

  CreateTeam.run({
    $name: name,
    $shortCode: shortCode,
  });

  return GetLatestTeam.get({});
};
