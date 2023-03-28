import { useAPI } from "./useAPI";

type SessionResponse = {
  id: string;
  createdAt: number;
  blueTeamId: string | null;
  redTeamId: string | null;
};

export const useSession = (id: string) =>
  useAPI<SessionResponse>(`session/${id}`, "GET");
