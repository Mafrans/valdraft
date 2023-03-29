import { Hour } from "../utils/timeutils";
import { db } from "./database";

export type Session = {
  id: string;
  createdAt: number;
  blueTeamId?: string;
  redTeamId?: string;
};

type CreateSessionProps = {
  $blueTeamId?: string;
  $redTeamId?: string;
};

type GetSessionByIdProps = {
  $id: string;
};

type AddTeamToSessionProps = {
  $id: string;
  $teamId: string;
};

type DeleteSessionProps = {
  $id: string;
};

export const CreateSession = db.query<void, CreateSessionProps>(`--sql
  insert into Sessions (id, createdAt, blueTeamId, redTeamId) values (
    hex(randomblob(16)),
    unixepoch(),
    $blueTeamId,
    $redTeamId
  ) returning *;
`);

export const GetSessionById = db.query<Session, GetSessionByIdProps>(`--sql
  select * from Sessions where id = $id limit 1;
`);

export const GetLatestSession = db.query<Session, {}>(`--sql
  select * from Sessions order by createdAt desc limit 1; 
`);

export const AddTeamToSession = db.query<void, AddTeamToSessionProps>(`--sql
  update Sessions set
    blueTeamId = coalesce(blueTeamId, $teamId),
    redTeamId = case
      when blueTeamId is not null and redTeamId is null and blueTeamId != $teamId then $teamId
      else redTeamId
    end
  where id = $id and (blueTeamId is null or redTeamId is null);
`);

export const DeleteSession = db.query<void, DeleteSessionProps>(`--sql
  delete from Sessions where id = $id;
`);

export function sessionIsExpired(session: Session) {
  return Date.now() > session.createdAt + 24 * Hour;
}
