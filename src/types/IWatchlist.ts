export type Tag =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "new_season"
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "untagged";

export type Anime = {
  title: string,
  url: string,
  image: string,
  to_watch: boolean,
  description: string,
  tag: Tag,
}

export type TagChanger = {
  url: string | null,
  tag: Tag | null,
}