export const workouts = [
   { name: 'Push', lastPerformed: 4, id: 0, muscleGroups: 'Chest Triceps', color: '#CAB0FF',  exercises: [
      { id: 'BENCH PRESS', sets: [{weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}]},
      { id: 'TRICEP DIPS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'SHOULDER PRESS', sets: [{weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'},]},
   ]},
   { name: 'Pull', lastPerformed: 3, id: 1, muscleGroups: 'Back Biceps', color: '#9D8DFF', exercises: [
      { id: 'BARBELL ROWS', sets: [{weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}]},
      { id: 'BICEP CURLS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'SHOULDER SHRUGS', sets: [{weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'},]},
   ]},
   { name: 'Legs', lastPerformed: 2, id: 2, muscleGroups: 'Quads Glutes', color: '#6D8DFF',  exercises: [
      { id: 'SQUATS', sets: [{weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}]},
      { id: 'ROMANIAN DEADLIFTS', sets: [{weight: '225', duration: '4'}, {weight: '225', duration: '4'}, {weight: '225', duration: '4'}, {weight: '225', duration: '4'},]},
      { id: 'CALF RAISES', sets: [{weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'},]},
   ]},
   { name: 'Upper Body', lastPerformed: 1, id: 3, muscleGroups: 'Chest Shoulder', color: '#CAB0FF', exercises: [
      { id: 'BENCH PRESS', sets: [{weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}, {weight: '150', duration: '8'}]},
      { id: 'SHOULDER PRESS', sets: [{weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'}, {weight: '120', duration: '8'},]},
      { id: 'BICEP CURLS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'TRICEP DIPS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
   ]},
   { name: 'Arms', lastPerformed: 7, id: 4, muscleGroups: 'Biceps Triceps', color: '#9D8DFF', exercises: [
      { id: 'BICEP CURLS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'TRICEP DIPS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'HAMMER CURLS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
      { id: 'SKULL CRUSHERS', sets: [{weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'}, {weight: '25', duration: '20'},]},
   ]},
]

export const cycleResp = {
   cycles: [
      { id: 0, color: '#9D8DFF',  name: 'Push, Pull, Legs', workouts: [0, 1, 2]},
      { id: 1, color: '#CAB0FF', name: 'Bro Split', workouts: [3, 4, 2]},
      { id: 2, color: '#6D8DFF', name: 'Legs Everyday', workouts: [2]},
      { id: 3, color: '#9D8DFF', name: 'Upper Lower Split', workouts: [3, 4, 2, 0, 1, 2]},
   ],
   selectedCycleId: 1,
   selectedCycleIndex: 1,
}

export const exercises = [
   { id: 'BENCH PRESS', name: 'Bench Press', muscleGroups: 'Chest'},
   { id: 'TRICEP DIPS', name: 'Tricep Dips', muscleGroups: 'Triceps'},
   { id: 'SHOULDER PRESS', name: 'Shoulder Press', muscleGroups: 'Deltoids'},
   { id: 'BARBELL ROWS', name: 'Barbell Rows', muscleGroups: 'Back Biceps'},
   { id: 'BICEP CURLS', name: 'Bicep Curls', muscleGroups: 'Biceps'},
   { id: 'SHOULDER SHRUGS', name: 'Shoulder Shrugs', muscleGroups: 'Traps'},
   { id: 'SQUATS', name: 'Squats', muscleGroups: 'Glutes Quads'},
   { id: 'ROMANIAN DEADLIFTS', name: 'Romanian Deadlifts', muscleGroups: 'Hamstrings'},
   { id: 'CALF RAISES', name: 'Calf Raises', muscleGroups: 'Calves'},
   { id: 'HAMMER CURLS', name: 'Hammer Curls', muscleGroups: 'Biceps'},
   { id: 'SKULL CRUSHERS', name: 'Skull Crushers', muscleGroups: 'Triceps'},
]