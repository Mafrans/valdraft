import { Handler } from "elysia";
import { Static } from "@sinclair/typebox";
import { searchTeamSchema } from "../../schemas/team/search";
import { SearchTeam } from "../../data/team";

type SearchTeamBody = Static<typeof searchTeamSchema.query>;

export const handleSearchTeam: Handler = ({ query }) => {
  const { q } = query as SearchTeamBody;

  return SearchTeam.get({ $query: q });
};
