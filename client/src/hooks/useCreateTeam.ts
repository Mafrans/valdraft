import { useSWRConfig } from "swr";
import { apiFetch } from "./useAPI";

type CreateTeamRequest = {
  name: string;
  shortCode?: string;
};

type CreateTeamResponse = {
  id: string;
  createdAt: number;
  name: string;
  shortCode: string;
  guest: boolean;
};

export const useCreateTeam = (teamOptions: CreateTeamRequest) => {
  const { mutate } = useSWRConfig();

  return async () => {
    const team = await apiFetch<CreateTeamResponse, CreateTeamRequest>(
      "team/create",
      "POST",
      teamOptions
    );

    if (team) {
      mutate(`team/${team.id}`, team);
    }

    return team;
  };
};
