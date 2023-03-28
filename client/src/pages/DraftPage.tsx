import { useSession } from "../hooks/useSession";
import { PrimaryLayout } from "../layouts/PrimaryLayout";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";

type DraftPageProps = {
  id: string;
};

export function DraftPage({ id }: DraftPageProps) {
  const { data: session, error } = useSession(id);

  useEffect(() => {
    if (error) {
      route("/", true);
    }
  }, [error]);

  return (
    <PrimaryLayout>
      <h1 class="text-3xl">Draft Page</h1>
      {session && (
        <div>
          <p>Draft ID: {session.id}</p>
          <p>Created at: {new Date(session.createdAt).toString()}</p>
          <p>Blue team ID: {session.blueTeamId}</p>
          <p>Red team ID: {session.redTeamId}</p>
        </div>
      )}
    </PrimaryLayout>
  );
}
