\set ON_ERROR_STOP on

DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
      CREATE ROLE postgres LOGIN PASSWORD 'postgres';
   ELSE
      ALTER ROLE postgres WITH LOGIN PASSWORD 'postgres';
   END IF;
END
$$;

SELECT 'CREATE DATABASE collegedunia_mvp'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'collegedunia_mvp')\gexec

GRANT ALL PRIVILEGES ON DATABASE collegedunia_mvp TO postgres;
