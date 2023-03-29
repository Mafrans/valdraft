import { useAPI } from "./useAPI";

type TeamResponse = {
  id: string;
  createdAt: number;
  name: string;
  shortCode: string;
  guest: boolean;
};

export const useTeam = (id: string) =>
  useAPI<TeamResponse>(`team/${id}`, "GET");
