import { useTeam } from "../hooks/useTeam";

type TeamCardProps = {
  id: string;
};

export function TeamCard({ id }: TeamCardProps) {
  const { data: team } = useTeam(id);

  if (!team) {
    return null;
  }

  return (
    <div class="my-6">
      <p>Team ID: {team.id}</p>
      <p>Team name: {team.name}</p>
      <p>Team short code: {team.shortCode}</p>
    </div>
  );
}
