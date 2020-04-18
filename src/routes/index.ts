import {Router} from 'express';
const router = Router();

import { getUsers, getUserById, createUser, updateUser, deleteUser,getIndex,renderAddUser,renderDeleteUser} from '../controllers/index.controller';
router.get('/',getIndex);
router.get('/users', getUsers);
router.get('/AgregarUsuario',renderAddUser)
router.get('/EliminarUsuario',renderDeleteUser)
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.get('/delete/:id', deleteUser);

export default router;