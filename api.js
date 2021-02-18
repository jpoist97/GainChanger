import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Helper function that returns a reference to the current logged in user in 
 * Firestore.
 */
const getUserRef = () => {
   const currentUser = firebase.auth().currentUser.uid;
   const dbRef = firebase.firestore();
   const userRef = dbRef.collection('users').doc(currentUser);

   return userRef;
};


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
   return await userRef.collection('workouts').doc(workoutId).delete();
}


/**
 * Deletes the given cycle from Firestore. Only deletes the cycle document
 * itself, nothing else
 * 
 * @param {String} cycleId 
 */
export async function deleteCycleDocument(cycleId) {
   const userRef = getUserRef();
   return await userRef.collection('cycles').doc(cycleId).delete();
}


export async function updateWorkoutDocument(workoutId, newWorkoutContent) {
   const userRef = getUserRef();
   return await userRef.collection('workouts').doc(workoutId).update(newWorkoutContent);
}


export async function updateUserProgress(totalWeightLifted, totalWorkoutsPerformed, weightPersonalRecord) {
   const userRef = getUserRef();
   return await userRef.update({
      totalWeightLifted,
      totalWorkoutsPerformed,
      weightPersonalRecord,
   });
}

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

export async function postExerciseRecords(exerciseRecords) {
   const execiseRecordsRef = getUserRef().collection('exerciseRecords');

   const dbPostPromises = exerciseRecords.map((record) => execiseRecordsRef.add(record));
   
   await Promise.all(dbPostPromises);
}

export async function updateSelectedCycleIndex(newIndex) {
   const userRef = getUserRef();

   await userRef.update({
      selectedCycleIndex: newIndex,
   });
}
