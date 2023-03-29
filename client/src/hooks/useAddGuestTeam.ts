import { useSWRConfig } from "swr";
import { apiFetch } from "./useAPI";

type AddGuestTeamRequest = {
  name: string;
  shortCode?: string;
};

type AddGuestTeamResponse = {
  session: {
    id: string;
    createdAt: number;
    blueTeamId: string | null;
    redTeamId: string | null;
  };
  team: {
    id: string;
    createdAt: number;
    name: string;
    shortCode: string;
  };
};

export const useAddGuestTeam = (sessionId: string) => {
  const { mutate } = useSWRConfig();

  return async (teamRequest: AddGuestTeamRequest) => {
    const { session, team } = await apiFetch<
      AddGuestTeamResponse,
      AddGuestTeamRequest
    >(`session/${sessionId}/addGuestTeam`, "POST", teamRequest);

    if (session) {
      mutate(`session/${session.id}`, session);
    }

    if (team) {
      mutate(`team/${team.id}`, team);
    }

    return { session, team };
  };
};
