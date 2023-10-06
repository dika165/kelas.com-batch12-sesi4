import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, created_at, updated_at FROM users";

    return dbPool.query(query);
}

const getDataByID = (user_id) => {
    const query = "SELECT user_id, name, email, created_at, updated_at FROM users WHERE user_id = ?";

    return dbPool.query(query,[user_id]);
}

const createData = (name, email, password) => {
    let createdAt = new Date();

    const query =  "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)";
    const value  = [name, email, password, createdAt];
    const result = dbPool.query(query, value);

    return result;
}

const updateData = (id, name, email) => {
    let updateAt = new Date();

    const query = "UPDATE users SET name = ?, email= ? WHERE user_id = ?";
    const value = [name, email, id];

    return dbPool.query(query, value);
}

const deleteData = (id) => {
    const query = "DELETE FROM users where user_id = ?";

    return dbPool.query(query,[id]);
}

const getDataByEmail = (email) => {
    const query = "SELECT user_id, name, email, password FROM users where email = ?";

    return dbPool.query(query, [email]);
}

export { getData, createData, getDataByID, updateData, deleteData, getDataByEmail}