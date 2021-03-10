import * as firebase from 'firebase';
import 'firebase/firestore';
import { parse, differenceInCalendarDays } from 'date-fns';

// --------------------------------------------------------------------------
// Database References
// --------------------------------------------------------------------------

/**
 * Helper function that returns a reference to the current logged in user in 
 * Firestore.
 */
const getUserRef = () => {
   const currentUser = firebase.auth().currentUser.uid;
   const dbRef = firebase.firestore();
   return dbRef.collection('users').doc(currentUser);
};


/**
 * Helper function that returns a reference to the Firestore database.
 */
const getDBRef = () => {
   return firebase.firestore();
}


// --------------------------------------------------------------------------
// Workouts
// --------------------------------------------------------------------------

/**
 * Function that retrieves all workouts for a user in Firebase. Returns an
 * array of workout objects.
 */
export async function fetchWorkouts() {
   const userRef = getUserRef();

   const workouts = [];
   const workoutRef = userRef.collection('workouts');
   const workoutSnapshot = await workoutRef.get();
   
   workoutSnapshot.forEach((doc) => {
      const {
         exercises, name, lastPerformed, muscleGroups,
      } = doc.data();
      const dateDiff = differenceInCalendarDays(new Date(), parse(lastPerformed, 'yyyy-MM-dd', new Date()));
   
      if (exercises && name && muscleGroups) {
         workouts.push({
         id: doc.id,
         name,
         exercises,
         muscleGroups,
         lastPerformed: dateDiff,
         });
      }
   });
   
   return workouts;
}


/**
 * Function that updates a workout document in Firestore. Takes in the workoutId
 * of the desired workout and a PartialWorkout object that represents all of the
 * fields that need to be updated in the workout document.
 * 
 * @param {String} workoutId 
 * @param {PartialWorkout} newWorkoutContent 
 */
export async function updateWorkoutDocument(workoutId, newWorkoutContent) {
   const userRef = getUserRef();
   return userRef.collection('workouts').doc(workoutId).update(newWorkoutContent);
}


/**
 * Function that removes the workout specified by workoutId from each of the
 * cycles in cycleIds. Returns an array of cycleIds that need to be deleted.
 * 
 * @param {String} workoutId = workoutId of workout to delete
 * @param {Array<String>} cycleIds = array of cycleIds all of which contain the given workoutId
 */
export async function purgeWorkoutFromCycles(workoutId, cycleIds) {   
   const emptyCycles = []
   const userRef = getUserRef();

   const cycleRefs = cycleIds.map((cycleId) => userRef.collection('cycles').doc(cycleId).get());
   const cycleDocuments = await Promise.all(cycleRefs);

   cycleDocuments.forEach((cycleDoc) => {
      const data = cycleDoc.data();

      const filteredWorkouts = data.workoutIds.filter((filterWorkoutId) => filterWorkoutId !== workoutId);

      // If this is the last workout in a cycle, delete it. 
      // Otherwise just delete the single workout from the cycle
      if(filteredWorkouts.length === 0) {
         emptyCycles.push(cycleDoc.id);
      } else {
         userRef.collection('cycles').doc(cycleDoc.id).update({
            workoutIds: filteredWorkouts,
         });
      }
   });

   return emptyCycles
}


/**
 * Deletes the given workout from Firestore. Only deletes the workout document
 * itself, nothing else
 * 
 * @param {String} workoutId 
 */
export async function deleteWorkoutDocument(workoutId) {
   const userRef = getUserRef();
   return userRef.collection('workouts').doc(workoutId).delete();
}


// --------------------------------------------------------------------------
// Cycles
// --------------------------------------------------------------------------

/**
 * Function that retrieves all of the cycles for the logged in user. Returns
 * an array of cycles objects.
 */
export async function fetchCycles() {
   const userRef = getUserRef();

   const cycles = [];
   const cycleRef = userRef.collection('cycles');
   const cycleSnapshot = await cycleRef.get();

   cycleSnapshot.forEach((doc) => {
      const { workoutIds, name } = doc.data();

      if (workoutIds && name) {
         cycles.push({
            id: doc.id,
            name,
            workouts: workoutIds,
         });
      }
   });

   return cycles;
}


/**
 * Deletes the given cycle from Firestore. Only deletes the cycle document
 * itself, nothing else
 * 
 * @param {String} cycleId 
 */
export async function deleteCycleDocument(cycleId) {
   const userRef = getUserRef();
   return userRef.collection('cycles').doc(cycleId).delete();
}


/**
 * Function that returns all of the cycles that contain a specific workout
 * specified by workoutId. Returns an array of cycleIds.
 * 
 * @param {String} workoutId 
 */
export async function getCycleIdsContainingWorkout(workoutId) {
   const matchingCycles = [];
   const userRef = getUserRef();

   const querySnapshot = await userRef.collection('cycles').where('workoutIds', 'array-contains', workoutId).get();
   querySnapshot.forEach((doc) => {
      matchingCycles.push(doc.id);
   });

   return matchingCycles;
}


// --------------------------------------------------------------------------
// Exercises
// --------------------------------------------------------------------------

/**
 * Function that retrieves both custom and shared exercises for the logged in user.
 * Returns an array of exercise objects.
 */
export async function fetchExercises() {
   const exerciseResponses = await Promise.all([fetchSharedExercises(), fetchCustomExercises()]);

   return [...exerciseResponses[0], ...exerciseResponses[1]];
}


/**
 * Helper function that retrieves all shared exercises from Firestore and
 * returns them in an array of exercise objects.
 */
async function fetchSharedExercises() {
   const sharedExercises = [];

   const dbRef = getDBRef();
   const exerciseRef = dbRef.collection('exercises');
   const exerciseSnapshot = await exerciseRef.get();
 
   exerciseSnapshot.forEach((doc) => {
     const { name, muscleGroups } = doc.data();
 
     if (name && muscleGroups) {
      sharedExercises.push({
         id: doc.id,
         name,
         muscleGroups,
       });
     }
   });

   return sharedExercises;
}


/**
 * Helper function that retrieves all custom exercises for the logged in user.
 * Returns them in an array of exercises.
 */
async function fetchCustomExercises() {
   const customExercises = [];
   const userRef = getUserRef();

   const customExerciseRef = userRef.collection('customExercises');
   const customExerciseSnapshot = await customExerciseRef.get();

   customExerciseSnapshot.forEach((doc) => {
      const { name, muscleGroups } = doc.data();
      if (name && muscleGroups) {
         customExercises.push({
            id: doc.id,
            name,
            muscleGroups,
         });
      }
   });

   return customExercises;
}


/**
 * Function that adds a new custom exercise to the logged in user's collection
 * in Firestore. Takes in the new exercise object to add.
 * 
 * @param {Exercise} exercise 
 */
export async function addCustomExercise(exercise) {
  const userRef = getUserRef();
  return userRef.collection('customExercises').add(exercise);
}


// --------------------------------------------------------------------------
// User Document
// --------------------------------------------------------------------------

/**
 * Function that retrieves the user document for the currently logged in user.
 * Returns the user document as an object.
 */
export async function fetchUserDoc() {
   const userRef = getUserRef();
   const userDoc = await userRef.get();

   return userDoc.data();
}


/**
 * Function that updates the logged in user's selectedCycleIndex in Firestore.
 * Returns nothing.
 * 
 * @param {Number} newIndex 
 */
export async function updateSelectedCycleIndex(newIndex) {
   const userRef = getUserRef();

   await userRef.update({
      selectedCycleIndex: newIndex,
   });
}



// --------------------------------------------------------------------------
// User Progress
// --------------------------------------------------------------------------

/**
 * Function that updates the currently logged in user's progress stats.
 * 
 * @param {Number} totalWeightLifted 
 * @param {Number} totalWorkoutsPerformed 
 * @param {Number} weightPersonalRecord 
 */
export async function updateUserProgress(totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) {
   const userRef = getUserRef();
   return userRef.update({
      totalWeightLifted,
      totalWorkoutsPerformed,
      weightPersonalRecord,
   });
}


/**
 * Function that retrieves exercise records for a given exerciseId from the
 * currently logged in user's Firestore.
 * 
 * @param {String} exerciseId 
 */
export async function retrieveExerciseRecords(exerciseId) {
   const execiseRecordsRef = getUserRef().collection('exerciseRecords');
   console.log(`getting exerciseRecords for ${exerciseId}`);

   const querySnapshot = await execiseRecordsRef.where('exerciseId', '==', exerciseId).get();
   
   const results = [];
   querySnapshot.forEach((doc) => {
      results.push(doc.data());
   });

   // Can do this in firestore query, but we'd have to set up a new index each
   // time a user is created.
   results.sort((a, b) => a.date.seconds - b.date.seconds);

   return results;
}

/**
 * Function that takes in an array of ExerciseRecord objects and adds them
 * all to Firestore.
 * 
 * @param {[ExerciseRecords]} exerciseRecords 
 */
export async function postExerciseRecords(exerciseRecords) {
   const execiseRecordsRef = getUserRef().collection('exerciseRecords');

   const dbPostPromises = exerciseRecords.map((record) => execiseRecordsRef.add(record));
   
   await Promise.all(dbPostPromises);
}


// --------------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------------


/**
 * Function that updates the user settings. THIS FUNCTION NEEDS THE ENTIRE
 * SETTINGS OBJECT, OTHERWISE IT WILL WIPE OUT OLD SETTINGS
 * 
 * @param {Settings} settings 
 */
export async function updateUserSettings(settings) {
   const userRef = getUserRef();

   await userRef.update({
      settings,
   })
}
