import { Handler } from "elysia";
import { CreateSession, GetLatestSession } from "../../data/session";

export const handleCreateSession: Handler = () => {
  return CreateSession.get({});
};
