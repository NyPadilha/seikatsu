export type Tag = "endurance" | "rep" | "rep/side" | "fatigue"

export type Exercise = {
  name: string,
  tag: Tag,
  config: number
}

export type Workout = {
  title: string,
  rest: number,
  sets: number,
  exercises: Exercise[]
}