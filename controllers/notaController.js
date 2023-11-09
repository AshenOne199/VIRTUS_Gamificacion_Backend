const { response, request } = require('express');

const Nota = require('../models/Nota');


const obtenerNotaPorUsuarioYActividad = async (req = request, res = response) => {
    try {
        const { idUsuario, idActividad } = req.query;

        const nota = await Nota.findOne({
            "usuarioEstudianteFK": idUsuario,
            "actividadFK" : idActividad
        });
        const valorEncontrado = nota.valor
        res.status(200).json({
            msg: 'Nota obtenida correctamente',
            valorEncontrado
        });
    } catch (error) {
        console.error('Error al obtener las nota:', error);
        res.status(500).json({
            msg: 'Error al obtener las nota',
        });
    }
};

const obtenerNotasPorActividad = async (req = request, res = response) => {
    try {
        const { idActividad } = req.query;

        if (!idActividad) {
            return res.status(400).json({
                msg: 'El parámetro idActividad es requerido en Query Params.'
            });
        }

        const notas = await Nota.find({ "actividadFK":idActividad });
        
        if (notas.length > 0) {
            res.status(200).json({
                msg: 'Notas obtenidas correctamente',
                notas
            });
        } else {
            res.status(404).json({
                msg: 'No se encontraron notas para la actividad con el ID proporcionado'
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las notas por actividad',
        });
    }
};



const guardarNota = async (req = request, res = response) => {
    try {
        const { valor, usuarioEstudianteFK, actividadFK } = req.body;

        const nota = new Nota({ valor, usuarioEstudianteFK, actividadFK });

        await nota.save();

        res.status(201).json({
            msg: 'Nota guardada correctamente',
            nota
        });
    } catch (error) {
        console.error('Error al guardar la nota:', error);
        res.status(500).json({
            msg: 'Error al guardar la nota',
            error: error.message
        });
    }
};

module.exports = {
    obtenerNotaPorUsuarioYActividad,
    obtenerNotasPorActividad,
    guardarNota
};
