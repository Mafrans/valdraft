import { route } from "preact-router";
import { useCreateSession } from "../hooks/useCreateSession";
import { useSession } from "../hooks/useSession";
import { PrimaryLayout } from "../layouts/PrimaryLayout";

export function HomePage() {
  const createSession = useCreateSession();

  const handleCreateSession = async () => {
    const session = await createSession();
    route(`draft/${session.id}`, true);
  };

  return (
    <PrimaryLayout>
      <h1 class="text-3xl mb-6">Home Page</h1>

      <h2 class="text-2xl mb-2">Join a draft</h2>
      <input
        class="p-2 bg-slate-100 mb-6"
        type="text"
        placeholder="Enter draft code"
      />

      <h2 class="text-2xl mb-2">Create a draft</h2>
      <button
        onClick={handleCreateSession}
        class="p-1 px-2 bg-indigo-200 rounded"
      >
        Create draft
      </button>
    </PrimaryLayout>
  );
}
