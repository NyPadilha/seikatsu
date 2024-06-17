export type Tag = "endurance" | "rep" | "rep/side"

export type Exercise = {
  name: string,
  tags: Tag[],
  config: number
}

export type Workout = {
  title: string,
  rest: number,
  sets: number,
  exercises: Exercise[]
}