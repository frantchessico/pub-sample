import { Router } from 'express';
import { allUsers, createUser , findUserById, updateUser, deleteUser} from '../services/user.service';




const router = Router();


router.post('/users/new', createUser);
router.get('/users', allUsers);
router.get('/users/:id', findUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)



export { router }