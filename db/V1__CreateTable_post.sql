CREATE SCHEMA IF NOT EXISTS cms;

CREATE TABLE cms.posts (
	id bigserial NOT NULL,
	slug varchar NOT NULL,
	title varchar NOT NULL,
	"content" jsonb NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	CONSTRAINT posts_pk PRIMARY KEY (id),
	CONSTRAINT posts_unique UNIQUE (slug)
);
