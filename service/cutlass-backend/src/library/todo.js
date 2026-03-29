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

const markTodoAsDone = async (todoId) => {
    const client = await gPool.connect();
    const updateQuery = `
        UPDATE todo
        set done = true
        where id = ($1); `;
    const results = await client.query(updateQuery, [todoId]);
    let findTodo = !!results.rowCount;
    await client.release(true);
    return findTodo;
}

const getAllTodos = async () => {
    const client = await gPool.connect();
    const result = await client.query('SELECT id, action, done FROM todo');
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


module.exports = {markTodoAsDone, getAllTodos, checkIsTableExists, getTodoCount, insertTodo}