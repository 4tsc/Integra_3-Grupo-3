const { Router } = require('express');
const router = new Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');

function Images(pool) {
    // RENDER FORM UPLOAD
    router.get('/images/upload', (req, res) => {
        res.render('index');
    });

    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads'),
    });

    const uploadImage = multer({
        storage,
        limits: {fileSize: 1000000}
    }).single('image');

    router.post('/images/upload/:id', async (req, res) => {
        const userId = req.params.id;
        uploadImage(req, res, async (err) => {
            if (err) {
                err.message = 'The file is too heavy for my service';
                return res.send(err);
            }
            // actualiza la imagen del usuario en la base de datos
            try {
                const connection = await pool.getConnection();
                const [result] = await connection.execute(
                    'UPDATE usuario SET imagen_usuario = ? WHERE id_usuario = ?',
                    [req.file.filename, userId]
                );
                connection.release();
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
            console.log(req.file.filename); 
            res.send('uploaded');
        });
    });
    
    router.get('/images/:id', async (req, res) => {
        const userId = req.params.id;
        console.log('ID del usuario recibido:', userId);
    
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT imagen_usuario FROM usuario WHERE id_usuario = ?', [userId]);
            connection.release();
    
            if (rows.length === 1) {
                const imageName = rows[0].imagen_usuario;
                const pathImage = path.join(__dirname, '../public/uploads/' + imageName);
                
                if (fs.existsSync(pathImage)) {
                    res.sendFile(pathImage);
                } else {
                    // User has no image, send default image
                    res.sendFile(path.join(__dirname, '../public/uploads/Imagen_perfil.png'));
                }
            } else {
                // User not found, send default image
                res.sendFile(path.join(__dirname, '../public/uploads/Imagen_perfil.png'));
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });
    

    return router;
}

module.exports = Images;