var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Object } = require('../models');

const v = new Validator();

router.get('/', async (req, res) => {
    const object = await Object.findAll();
    return res.json(object);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const object = await Object.findByPk(id);
    return res.json(object);
});

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        description: 'string'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
        .status(400)
        .json(validate);
    }

    const object = await Object.create(req.body);

    res.json(object);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let object = await Object.findByPk(id);

    if (!object){
        return res.json({message: 'Tidak ditemukan'});
    }

    const schema = {
        name: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res
        .status(400)
        .json(validate);
    }

    object = await object.update(req.body);
    res.json(object);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const object = await Object.findByPk(id);

    if (!object){
        return res.json({message: 'Tidak ditemukan'});
    }

    await object.destroy();

    res.json({
        message: 'Barang dihapus'
    });
});

module.exports = router;