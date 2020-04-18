import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getIndex = async (req: Request, res: Response) => {
    res.render('index');
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        var usersList = [];

        const response: QueryResult = await
            pool.query('SELECT * FROM users ORDER BY id ASC');
            for (var i = 0; i < response.rows.length; i++) {

                // Create an object to save current row's data
                var user = {
                    'nombre':response.rows[i].nombre,
                    'apellidos':response.rows[i].apellidos,
                    'nick':response.rows[i].nick,
                    'id':response.rows[i].id,
                    'email':response.rows[i].email,
                    'rol':response.rows[i].rol
                }
                // Add object into array
                usersList.push(user);
        }
        // Render index.pug page using array 
        res.render('listaUsuarios', {"userList": usersList});
        return res.status(200).json(response.rows);    
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
    const { nick,nombre,apellidos,rol,email } = req.body;
    const response = await pool.query('INSERT INTO users (nick,nombre,apellidos,rol,email) VALUES ($1, $2, $3, $4, $5)', [nick, nombre,apellidos,rol,email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { nick, nombre,apellidos,rol,email }
        }
    })
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nick, nombre,apellidos,rol,email } = req.body;

    const response = await pool.query('UPDATE users SET nick = $1, email = $2 WHERE id = $3', [
        nick, nombre,apellidos,rol,email
    ]);
    res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    return res.json(`User ${id} deleted Successfully`);
}catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
}
};

export const renderAddUser = async (req: Request, res: Response) => {
    res.render('agregarUsuario');
};

export const renderDeleteUser = async (req: Request, res: Response) => {
    res.render('eliminarUsuario');
};