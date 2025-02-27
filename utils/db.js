import { openDB } from "idb";

const DB_NAME = "QuizDB";
const STORE_NAME = "quizHistory";

export async function saveQuizResult(score, total) {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {autoIncrement: true});
            }
        }
    })
    await db.put(STORE_NAME, {score, total, date: new Date().toISOString})
}

export async function getQuizHistory() {
    const db = await openDB(DB_NAME, 1);
    return await db.getAll(STORE_NAME);
}