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

export const CreateSession = db.query<void, CreateSessionProps>(`
  insert into Sessions (id, createdAt, blueTeamId, redTeamId) values (
    hex(randomblob(16)),
    unixepoch(),
    $blueTeamId, 
    $redTeamId
  );
`);

export const GetSessionById = db.query<Session, GetSessionByIdProps>(`
  select * from Sessions where id = $id limit 1;
`);

export const GetLatestSession = db.query<Session, {}>(`
  select * from Sessions order by createdAt desc limit 1; 
`);
