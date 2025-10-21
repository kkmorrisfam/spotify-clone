import { Router } from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from '../controller/user.controller.js';

const router = Router();

// router.get('/') protected so only logged in users can see
// messages
router.get("/", protectRoute, getAllUsers);



export default router;