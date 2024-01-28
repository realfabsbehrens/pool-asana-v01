// clientPromise importieren von Globas
import clientPromise from ".";

// value initieren
let client;
let db;
let tasks;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("poool");
    tasks = await db.collection("projects");
  } catch (error) {
    throw new Error("Failted to stablish connection to database");
  }
}

(async () => {
  await init();
})();

//////////////
/// MOVIES //
////////////

export async function getTasks() {
  try {
    if (!tasks) await init();
    const result = await tasks
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();

    return { tasks: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}