const {gPool} = require("../db/database");

const tableName = "todo";

const getAllTodos = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT id, action FROM todo');
    await client.release(true);
    return result.rows;
}

const getTodoCount = async () => {
    const client = await gPool.connect();
    const countQuery = `select count(*) from todo;`;
    const result = await client.query(countQuery);
    const theCount = results.rows[0].count;
    await client.release(true);
    return theCount;
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

module.exports = {getAllTodos, getTodoCount, insertTodo}