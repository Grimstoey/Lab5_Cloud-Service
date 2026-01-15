import * as authService from '../services/AuthService'
import express  from 'express'
import type { roleModel as role } from '../generated/prisma/models/role';
import * as authMiddleware from '../middleware/AuthMiddleware'



const router = express.Router();


router.post('/authenticate', async (req, res) => {
    const {username, password} = req.body;
    const user = await authService.findByUsername(username);
    if(!user){
        res.status(401).json({messege: "User doesn't exist" });
	   return
    }
    if (password === undefined || user.password === undefined || user.password === null) {
        res.status(400).json({messege: "Password is required" });
	   return
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if(!isPasswordCorrect){
        res.status(401).json({messege: "Invalid credentials"});
	   return
    }
    const token = authService.generatetoken(user.id);
    res.status(200).json({
        status: 'success',
        access_token: token,
        // user: {
        //     id: user.id,
        //     username: user.organizer?.name || 'unknown',
        //     roles: user.roles.map((role: role) => role.name)
        // }
    });
})


router.get('/me', authMiddleware.protect, async (req, res) => {
    const user = req.body.user;
    res.status(200).json({
        status: 'success',
        user: {
            id: user.id,
            username: user.organizer?.name || 'unknown',
            events: user.organizer?.events || [],
            roles: user.roles.map((role: role) => role.name)
        }
    })
})


router.post('/admin', authMiddleware.protect, authMiddleware.checkAdmin, async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You are an admin'
    })
})




export default router;
