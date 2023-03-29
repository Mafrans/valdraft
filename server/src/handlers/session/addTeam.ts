import { Handler } from "elysia";
import { Static } from "@sinclair/typebox";
import { AddTeamToSession } from "../../data/session";
import { addTeamToSessionSchema } from "../../schemas/session/addTeam";
import { GetTeamById } from "../../data/team";
import { StatusCodes } from "http-status-codes";

type AddTeamToSessionParams = Static<typeof addTeamToSessionSchema.params>;
type AddTeamToSessionBody = Static<typeof addTeamToSessionSchema.body>;

export const handleAddTeamToSession: Handler = ({ params, body, set }) => {
  const { id } = params as AddTeamToSessionParams;
  const { teamId } = body as AddTeamToSessionBody;

  const team = GetTeamById.get({ $id: teamId });
  if (team == null) {
    set.status = StatusCodes.BAD_REQUEST;
    return "Team ID must be of an existing team.";
  }

  return AddTeamToSession.run({ $id: id, $teamId: team.id });
};
