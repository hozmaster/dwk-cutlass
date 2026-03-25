const {gPool} = require("../db/database");

const checkIsTableExists = async () => {
    let tableExists = false;
    // SELECT to_regclass('schema_name.table_name');
    try {
        const client = await gPool.connect();
        const result = await client.query("SELECT to_regclass('public.todo');");
        await client.release(true);
        if (result.rows[0].to_regclass) {
            tableExists = true;
        }
    } catch (e) {
        console.error(e);
    }
    return tableExists
}

const getAllTodos = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT id, action FROM todo');
    await client.release(true);
    return result.rows;
}

const getTodoCount = async () => {
    const client = await gPool.connect();
    const countQuery = `select count(*)
                        from todo;`;
    const result = await client.query(countQuery);
    const theCount = result.rows[0].count;
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

module.exports = {getAllTodos, checkIsTableExists, getTodoCount, insertTodo}