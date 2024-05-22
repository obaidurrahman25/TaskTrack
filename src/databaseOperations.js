import db from "./database"

export const dbOperations = {
    AddTask: async (taskDetails) => {
        await db.tasks.add(taskDetails);
    },
    DeleteTask: async (taskId) => {
        await db.tasks.delete(taskId);
    },
    UpdateStatus: async (id, newStatus) => {
        await db.tasks.update(id, { status: newStatus });
    }
};