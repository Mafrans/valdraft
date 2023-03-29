import { t } from "elysia";

export const addTeamToSessionSchema = {
  params: t.Object({
    id: t.String({ minLength: 32, maxLength: 32 }),
  }),
  body: t.Object({
    teamId: t.String({ minLength: 32, maxLength: 32 }),
  }),
};
