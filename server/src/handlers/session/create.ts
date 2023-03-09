import { Handler } from "elysia";
import { CreateSession, GetLatestSession } from "../../data/session";

export const handleCreateSession: Handler = () => {
  CreateSession.run({});
  return GetLatestSession.get({});
};
