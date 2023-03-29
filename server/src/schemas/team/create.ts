import { t } from "elysia";

export const createTeamSchema = {
  body: t.Object({
    name: t.String({ minLength: 1, maxLength: 32 }),
    shortCode: t.Optional(t.String({ minLength: 1, maxLength: 4 })),
    guest: t.Optional(t.Boolean()),
  }),
};
