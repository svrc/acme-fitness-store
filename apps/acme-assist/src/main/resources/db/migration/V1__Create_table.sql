CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.vector_store (
             id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
             content text,
             metadata json,
             embedding public.vector(1536),
             CONSTRAINT unique_id_constraint UNIQUE (id)
);

CREATE INDEX ON vector_store USING HNSW (embedding vector_cosine_ops);
