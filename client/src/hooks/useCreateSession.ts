import { useSWRConfig } from "swr";
import { apiFetch } from "./useAPI";

type CreateSessionResponse = {
  id: string;
  createdAt: number;
  blueTeamId: string | null;
  redTeamId: string | null;
};

export const useCreateSession = () => {
  const { mutate } = useSWRConfig();

  return async () => {
    const session = await apiFetch<CreateSessionResponse>(
      "session/create",
      "POST"
    );

    if (session) {
      mutate(`session/${session.id}`, session);
    }

    return session;
  };
};
