export type Anime = {
  title: string,
  url: string,
  image: string,
  to_watch: boolean,
  description: string,
  tag: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "new_season" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "untagged",
}