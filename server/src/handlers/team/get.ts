import { Handler } from "elysia";
import { Static } from "@sinclair/typebox";
import { getTeamSchema } from "../../schemas/team/get";
import { GetTeamById } from "../../data/team";

type GetTeamParams = Static<typeof getTeamSchema.params>;

export const handleGetTeam: Handler = ({ params }) => {
  const { id } = params as GetTeamParams;

  return GetTeamById.get({ $id: id });
};
