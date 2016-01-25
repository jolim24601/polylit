# Schema Information

## stories
column name    | data type | details
------------   |-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null, indexed
body           | text      | not null
subtitle       | string    |
publication_id | integer   | foreign key (references publications), indexed
published      | boolean   | default: false

## publications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, indexed, unique
description | text      |
email       | string    |
facebook_url| string    |
twitter_url | string    |
slug        | string    |

## publishers
column name      | data type | details
------------     |-----------|-----------------------
id               | integer   | not null, primary key
publication_id   | integer   | not null, foreign key (references publications), indexed
author_id        | integer   | not null, foreign key (references authors), indexed
editor           | boolean   | not null, default: false

## responses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references authors), indexed
story_id    | integer   | not null, foreign key (references stories), indexed
body        | text      | not null

## bookmarks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references authors), indexed
story_id    | integer   | not null, foreign key (references stories), indexed, unique [author_id]

## favorites (aka recommendations)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references authors), indexed
story_id    | integer   | not null, foreign key (references stories), indexed, unique [author_id]

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, indexed
story_id    | integer   | not null, foreign key (references stories), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## follows
column name      | data type | details
------------     |-----------|-----------------------
id               | integer   | not null, primary key
follower_id      | integer   | not null, foreign key (references authors), indexed, unique [followable_id]
followable_id    | integer   | not null, foreign key (references authors/publications), indexed
followable_type  | string    | not null


## authors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
pen_name        | string    | not null, indexed
description     | string    |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique


## highlights (bonus)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
story_id    | integer   | not null, foreign key (references stories), indexed
author_id   | integer   | not null, foreign key (references authors), indexed
body        | text      | not null
