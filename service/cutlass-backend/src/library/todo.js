const {gPool} = require("../db/database");

const tableName = "todo";

const getAllTodos = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT id, action FROM todo');
    await client.release(true);
    return result.rows;
}

const insertTodo = async (action) => {
    const client = await gPool.connect();
    const insertQuery = `
        INSERT INTO "todo" ("action")
        VALUES ($1)
    `;
    await client.query(insertQuery, [action]);
    await client.release(true);
}

module.exports = {getAllTodos, insertTodo}