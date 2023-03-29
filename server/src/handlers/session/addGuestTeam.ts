import { Static } from "@sinclair/typebox";
import { Handler } from "elysia";
import { StatusCodes } from "http-status-codes";
import {
  AddTeamToSession,
  CreateSession,
  GetLatestSession,
  GetSessionById,
  SessionExists,
} from "../../data/session";
import { CreateTeam, GetLatestTeam } from "../../data/team";
import { createTeamSchema } from "../../schemas/team/create";
import { addGuestTeamToSessionSchema } from "../../schemas/team/createGuest";

type AddGuestTeamParams = Static<typeof addGuestTeamToSessionSchema.params>;
type AddGuestTeamBody = Static<typeof addGuestTeamToSessionSchema.body>;

export const handleAddGuestTeamToSession: Handler = ({ body, params, set }) => {
  const { id } = params as AddGuestTeamParams;
  const { name, shortCode } = body as AddGuestTeamBody;

  if (!SessionExists.get({ $id: id })) {
    set.status = StatusCodes.NOT_FOUND;
    return "Session ID must be of an existing session.";
  }

  const team = CreateTeam.get({
    $name: name,
    $shortCode: shortCode,
    $guest: true,
  });

  if (team == null) {
    set.status = StatusCodes.INTERNAL_SERVER_ERROR;
    return "Internal server error.";
  }

  const session = AddTeamToSession.get({
    $id: id,
    $teamId: team.id,
  });

  return {
    session,
    team,
  };
};
