import { t } from "elysia";

export const searchTeamSchema = {
  query: t.Object({
    q: t.String({ minLength: 1, maxLength: 32 }),
  }),
};
