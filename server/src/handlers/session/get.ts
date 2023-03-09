import { Handler } from "elysia";
import { Static } from "@sinclair/typebox";
import { GetSessionById } from "../../data/session";
import { getSessionSchema } from "../../schemas/session/get";

type GetSessionParams = Static<typeof getSessionSchema.params>;

export const handleGetSession: Handler = ({ params }) => {
  const { id } = params as GetSessionParams;

  return GetSessionById.get({ $id: id });
};
