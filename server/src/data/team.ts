import { db } from "./database";

export type Team = {
  id: string;
  createdAt: number;
  name: string;
  shortCode?: string;
  guest?: boolean;
};

type CreateTeamProps = {
  $name: string;
  $shortCode?: string;
  $guest?: boolean;
};

type GetTeamByIdProps = {
  $id: string;
};

type SearchTeamProps = {
  $query: string;
};

export const CreateTeam = db.query<void, CreateTeamProps>(`--sql
  insert into Teams (id, createdAt, name, shortCode, guest) values (
    hex(randomblob(16)),
    unixepoch(),
    $name,
    $shortCode,
    $guest
  ) returning *;
`);

export const GetTeamById = db.query<Team, GetTeamByIdProps>(`--sql
  select * from Teams where id = $id;
`);

export const SearchTeam = db.query<Team, SearchTeamProps>(`--sql
  select * from Teams where name like '%' || $query || '%' limit 10;
`);

export const GetLatestTeam = db.query<Team, {}>(`--sql
  select * from Teams order by createdAt desc limit 1;
`);
