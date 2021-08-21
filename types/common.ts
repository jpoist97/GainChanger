export interface ExerciseSet {
   reps?: string;
   time?: string;
   weight: string;
}

export interface Exercise {
   name: string;
   sets: Array<ExerciseSet>;
   id: string;
}
