/*
    1. Buat table dengan nama tasks dan buat field / column sebagai berikut: 
        - task_id => int auto increment
        - user_id => int
        - title => varchar
        - is_done => tinyint / enum (0/1)
        - created_at => datetime
        - updated_at => datetime
    
    2. buat process CRUD untuk table tersebut
    3. Pada function create task setelah berhasil menambahkan tampilkan data yang ditambahkan
    4. pada function update setelah berhasil memperbarui data tampilkan data yang di perbarui
*/

import * as ServiceUser from './services/user.js';

// await ServiceUser.createUser("Andika", "dika@gmal.com", "pass123");

// await ServiceUser.getUsers();

// await ServiceUser.updateUser(1, "Zafif", "zafif@gmail.com");

// await ServiceUser.getUsers();

await ServiceUser.deleteUser(7);

await ServiceUser.getUsers();

// ServiceUser.updateUser()