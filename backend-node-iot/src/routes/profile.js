import { Router } from 'express';
import db from '../db/knex.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /profile (protected)
router.get('/users', auth, async (req, res) => {
    try {
        // Seleccionamos id, name, email (NO la password)
        const users = await db('users').select('id', 'name', 'email'); 
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// --- NUEVO: Borrar usuario (Para el botón eliminar) ---
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await db('users').where({ id }).del();
        res.json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
});

export default router;
