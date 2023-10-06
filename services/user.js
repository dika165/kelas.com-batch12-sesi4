import { errorResp } from "../../example/kelas.com-todo-list-express/utils/response.js";
import { getData, createData,getDataByID, updateData, deleteData, getDataByEmail } from "../repositories/users.js";
import { successResp } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY_ACCESS_TOKEN= "kelas.com";
const SECRET_KEY_REFRESH_TOKEN= "backend";

export const getUsers = async (request, response, next) => {
    try {
        let [users] = await getData();
        console.log(request.claims);

        if(users.length > 0) {
            successResp(response, "success", users);
        } else {
            errorResp(response, "data not fund", 404);
        }
    } catch(error) {
        next(error)
    }
    
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;
        bcrypt.hash(password, saltRound, async (error, hashPassword) => {
            let [result] = await createData(name, email, hashPassword);
            if(result.insertId > 0) {
                let [users] = await getDataByID(result.insertId)
                successResp(response,"success",users)
            } else {
                errorResp(response,"error",400)
            }

        } );
    } catch {
        next(error);
    }
    
}

export const updateUser = async (id, name, email) => {
    let [result] = await updateData(id, name, email);

    if(result.affectedRows != 0) {
        console.log("update user berhasil")
    } else {
        console.log("gagal update data user")
    }
}

export const deleteUser = async (id) => {
    let [result] = await deleteData(id);

    if(result.affectedRows > 0) {
        console.log("menghapus data berhasil")
    } else {
        console.log("gagal menghapus data");
    }
}

export const login = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;

        let [result] = await  getDataByEmail(email);

        if (result.length > 0) {
            let user = result[0];
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    let payloads = {
                        user_id: user.user_id,
                        name: user.name, 
                        email: user.email,
                    }
                    let accessToken = jwt.sign(payloads, SECRET_KEY_ACCESS_TOKEN, {expiresIn:'15m'});
                    let refreshToken = jwt.sign(payloads, SECRET_KEY_REFRESH_TOKEN, {expiresIn:'60m'});
                    let dataToken = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }
                    successResp(response, "login berhasil", dataToken);
                } else {
                    errorResp(response, "email atau password tidak cocok", 401)
                }
            });
        }
    } catch(error) {
        next(error)
    }
    
}