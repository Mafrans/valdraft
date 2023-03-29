import { useTeam } from "../hooks/useTeam";

type TeamCardProps = {
  id: string;
};

export function TeamCard({ id }: TeamCardProps) {
  const { data: team, error } = useTeam(id);

  if (error) {
    return <p class="text-red-600">{error}</p>;
  } else if (!team) {
    return <p>Loading...</p>;
  }

  return (
    <div class="my-6">
      <p>Team ID: {team.id}</p>
      <p>Team name: {team.name}</p>
      <p>Team short code: {team.shortCode}</p>
    </div>
  );
}
