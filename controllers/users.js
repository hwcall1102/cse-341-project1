const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    mongodb
        .getDb()
        .db()
        .collection('ContactList')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/JSON');
            res.status(200).json(lists);
        });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id)
    mongodb
        .getDb()
        .db()
        .collection('ContactList')
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/JSON');
            res.status(200).json(result[0]);
        });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('ContactList').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user');
    };
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('ContactList').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    };
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('ContactList').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user');
    };
};


module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };