import { Database } from "bun:sqlite";

export const db = new Database("db.sql", { create: true });

// Create tables

db.run(`--sql
  create table if not exists Sessions (
    id text not null primary key,
    createdAt integer not null,
    blueTeamId integer,
    redTeamId integer
  );
`);

db.run(`--sql
  create table if not exists Teams (
    id text not null primary key,
    createdAt integer not null,
    name varchar(32) not null,
    shortCode varchar(4),
    guest boolean default false
  );
`);

// Create triggers

db.run(`--sql
  create trigger if not exists delete_teams_after_session_delete
  after delete on Sessions
  begin
    delete from Teams where (id = old.blueTeamId or id = old.redTeamId) and guest = true;
  end;
`);
