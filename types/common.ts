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

export interface Workout {
   id: string;
   lastPerformed: number;
   exercises: Array<Exercise>;
}

export interface WorkoutRecord {}
