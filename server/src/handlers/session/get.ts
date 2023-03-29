import { Handler } from "elysia";
import { Static } from "@sinclair/typebox";
import {
  DeleteSession,
  GetSessionById,
  sessionIsExpired,
} from "../../data/session";
import { getSessionSchema } from "../../schemas/session/get";
import { StatusCodes } from "http-status-codes";

type GetSessionParams = Static<typeof getSessionSchema.params>;

export const handleGetSession: Handler = ({ params, set }) => {
  const { id } = params as GetSessionParams;
  const session = GetSessionById.get({ $id: id });

  if (session == null) {
    set.status = StatusCodes.NOT_FOUND;
    return "Session ID must be of an existing session.";
  }

  if (sessionIsExpired(session)) {
    DeleteSession.run({ $id: session.id });

    set.status = StatusCodes.GONE;
    return "Session has expired.";
  }

  return session;
};
