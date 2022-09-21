const mongoose = require('mongoose');

const AddBookModel = require('../Models/addbook.model');

module.exports = {
    insertBook: async (req, res) => {
        book = new AddBookModel(req.body);
        console.log('insert book controller');
        checkexists_title = await AddBookModel.findOne({
            title: req.body.title
        });

        if (checkexists_title) {
            console.log(JSON.stringify('Book Already exists!'));
            return res.send(JSON.stringify('Book Already exists!'));
        } else {
            const result = await book.save();
            if (result) {
                return res.send(JSON.stringify('Book Added Successsfully'));
            }
        }
    },selectBookByID: async (req, res) => {
        try {
            const result = await AddBookModel.findById(req.params.id);

            if (result) {
                console.log(result);
                res.send({ result: result });
            } else {
                res.send('Not found');
                return;
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    selectallBooks: async (req, res, next) => {
        try {
            const result = await AddBookModel.find();

            if(result)
            {
                res.send({ data: result });
            }else{
                res.send(JSON.stringify("No records found!"));
            }

            //console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    updateBookbyid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await AddBookModel.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'update failed' });
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    deleteBookByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await AddBookModel.findByIdAndDelete(req.params.id);
            if (result) {
                return res.send({ msg: 'Book deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
   
};
