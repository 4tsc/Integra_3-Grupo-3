const express = require('express');

const router = express.Router();

function UserConfig(pool) {

    // Obtener información de usuario por ID
    router.get('/users/:id', async (req, res) => {
        const userId = req.params.id;
        console.log('ID del usuario recibido:', userId);

        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [userId]);
            connection.release();

            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });

    // Actualizar información de usuario por ID
    router.put('/users/:id', async (req, res) => {
        const userId = req.params.id;
        const { nombre, correo, pass } = req.body;

        try {
            // Validate request payload
            if (!nombre || !correo ) {
                return res.status(400).json({ mensaje: 'Se requieren nombre y correo para actualizar el usuario' });
            }
            // si no hay contraseña, solo se actualizan nombre y correo
            if (!pass) {
                const sql = `
                    UPDATE usuario
                    SET nombre = ?, correo = ?
                    WHERE id_usuario = ?;
                `;
                const [result] = await pool.query(sql, [nombre, correo, userId]);

                if (result.affectedRows === 0) {
                    // No se encontró el usuario para actualizar
                    res.status(404).send('Usuario no encontrado para actualizar');
                } else {
                    res.status(200).send('Usuario actualizado exitosamente');
                }
            } else {
                const sql = `
                    UPDATE usuario
                    SET nombre = ?, correo = ?, pass = ?
                    WHERE id_usuario = ?;
                `;
                const [result] = await pool.query(sql, [nombre, correo, pass, userId]);

                if (result.affectedRows === 0) {
                    // No se encontró el usuario para actualizar
                    res.status(404).send('Usuario no encontrado para actualizar');
                } else {
                    res.status(200).send('Usuario actualizado exitosamente');
                }
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).send('Error en el servidor al actualizar el usuario');
        }
    });

    return router;
   }

module.exports = UserConfig;