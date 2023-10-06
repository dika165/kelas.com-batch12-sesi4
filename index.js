/*
    1. Pasang authorization middleware pada endpoint, create user, update user, dan delete user.
    2. Buat table dengan nama tasks dan buat field / column sebagai berikut: 
        - task_id => int auto increment
        - user_id => int
        - title => varchar
        - is_done => tinyint / enum (0/1)
        - created_at => datetime
        - updated_at => datetime
    
    3. buat process CRUD untuk table tersebut
    4. Pada function create task setelah berhasil menambahkan tampilkan data yang ditambahkan
    5. pada function update setelah berhasil memperbarui data tampilkan data yang di perbarui
*/

import * as ServiceUser from './services/user.js';
import express from 'express';
import { validateToken } from './utils/token.js';

const host='localhost';
const port=5000;
const app = express();

app.use(express.json());

app.get("/users",validateToken,ServiceUser.getUsers);
app.post("/users",ServiceUser.createUser);
app.post("/login", ServiceUser.login);

app.listen(port, host, ()=> {
    console.log(`server berjalan di http://${host}:${port}`);
});

// await ServiceUser.createUser("Andika", "dika@gmal.com", "pass123");

// await ServiceUser.getUsers();

// await ServiceUser.updateUser(1, "Zafif", "zafif@gmail.com");

// await ServiceUser.getUsers();

// await ServiceUser.deleteUser(7);

// await ServiceUser.getUsers();

// ServiceUser.updateUser()