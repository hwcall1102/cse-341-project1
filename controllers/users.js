const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('ContactList').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/JSON');
        res.status(200).json(users);
    })    
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('ContactList').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/JSON');
        res.status(200).json(users[0]);
    })    
}

module.exports = { getAll, getSingle}