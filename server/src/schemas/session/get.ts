import { t } from "elysia";

export const getSessionSchema = {
  params: t.Object({
    id: t.String({ minLength: 32, maxLength: 32 }),
  }),
};
