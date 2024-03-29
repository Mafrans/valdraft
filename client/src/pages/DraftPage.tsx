import { useSession } from "../hooks/useSession";
import { PrimaryLayout } from "../layouts/PrimaryLayout";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { route } from "preact-router";
import { useTeam } from "../hooks/useTeam";
import { useAddGuestTeam } from "../hooks/useAddGuestTeam";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TeamCard } from "../components/TeamCard";

type DraftPageProps = {
  id: string;
};

export function DraftPage({ id }: DraftPageProps) {
  const [teamId, setTeamId] = useLocalStorage<string>("teamId");
  const addGuestTeam = useAddGuestTeam(id);
  const { data: session, error: sessionError } = useSession(id);

  // If the session is not found, redirect to the home page
  useEffect(() => {
    if (sessionError) {
      route("/", true);
    }
  }, [sessionError]);

  // If we have a stored team ID, but it's not in the session, clear the team ID
  useEffect(() => {
    if (
      teamId &&
      session?.blueTeamId !== teamId &&
      session?.redTeamId !== teamId
    ) {
      setTeamId(undefined);
    }
  }, [teamId, session?.blueTeamId, session?.redTeamId, setTeamId]);

  const canAddTeam = useMemo(() => {
    return !session?.blueTeamId || !session?.redTeamId;
  }, [session?.blueTeamId, session?.redTeamId]);

  const handleAddGuestTeam = async (input: {
    name: string;
    shortCode?: string;
  }) => {
    const { team } = await addGuestTeam(input);

    if (team) {
      setTeamId(team.id);
    }
  };

  return (
    <PrimaryLayout>
      <h1 class="text-3xl mb-8">Draft Page</h1>
      {session && (
        <div>
          <p>Draft ID: {session.id}</p>
          <p>Created at: {new Date(session.createdAt).toString()}</p>
          <p>Blue team ID: {session.blueTeamId}</p>
          <p>Red team ID: {session.redTeamId}</p>
        </div>
      )}

      {session?.blueTeamId ? <TeamCard id={session.blueTeamId} /> : null}
      {session?.redTeamId ? <TeamCard id={session.redTeamId} /> : null}

      {canAddTeam && !teamId ? (
        <AddGuestTeamModal onAddGuestTeam={handleAddGuestTeam} />
      ) : null}
    </PrimaryLayout>
  );
}

function AddGuestTeamModal({
  onAddGuestTeam,
}: {
  onAddGuestTeam: (team: { name: string; shortCode?: string }) => void;
}) {
  const nameInput = useRef<HTMLInputElement>(null);
  const shortCodeInput = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const name = nameInput.current?.value;
    const shortCode = shortCodeInput.current?.value;

    if (name) {
      onAddGuestTeam({ name, shortCode });
    }
  };

  return (
    <div>
      <input
        class="p-2 bg-gray-100 rounded mb-2 block"
        ref={nameInput}
        placeholder="Name"
        type="text"
      />
      <input
        class="p-2 bg-gray-100 rounded mb-2 block"
        ref={shortCodeInput}
        placeholder="ShortCode"
        type="text"
      />
      <button
        class="px-2 py-1 bg-indigo-400 text-white rounded"
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>
  );
}
