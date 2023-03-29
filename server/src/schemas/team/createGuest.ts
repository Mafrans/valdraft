import { t } from "elysia";

export const addGuestTeamToSessionSchema = {
  params: t.Object({
    id: t.String({ minLength: 32, maxLength: 32 }),
  }),
  body: t.Object({
    name: t.String({ minLength: 1, maxLength: 32 }),
    shortCode: t.Optional(t.String({ minLength: 1, maxLength: 4 })),
  }),
};
