import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

const uri = "mongodb+srv://csis3380:Csis33801234@cluster0.cvrdzvp.mongodb.net/BookList";

// Create and/or connect to the database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

console.log('Connected');

const bookSchema = new Schema({
    id: String,
    title: String,
    author: String,
    description: String
});

// Use the "bookInfo" collection
const Book = model("BookSchema", bookSchema, "300371938-ivan");

// insert book
app.post("/", async (req, res, next) => {
    const formdata = req.body;
    try {
        const newBook = new Book({
            id : formdata.id,
            title: formdata.title,
            author: formdata.author,
            description: formdata.description
        })
        await Book.insertMany([newBook]);
        res.json({
            message: "Successful insert.",
            // dbserver: uri,
        })
        res.status(204).end();
    } catch(err){
        next(err);
    }
})

// update book
app.post("/:id", async (req, res, next) => {
    const id = req.params.id;
    const formdata = req.body;
    try {
        const update = await Book.updateMany(
            {id: id},
            { $set: {
                    title: formdata.title,
                    author: formdata.author,
                    description: formdata.description
                }
            }
        )
        res.json({
            message: `updated.`,
        })
        res.status(204).end();
    } catch(err){
        next(err);
    }
})

// get all books
app.get("/", async (req, res, next) => {
    try {
        const records = await Book.find({});
        res.json(records);
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
})

// get books by id
app.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const records = await Book.find({id : id});
        res.json(records);
        res.status(204).end();
    }
    catch(err) {
        next(err);
    }
})

// delete books
app.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteResult = await Book.deleteMany({ id: id });
        res.json(`${deleteResult.deletedCount} books deleted.`);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
})

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            // dbserver: uri,
        }
    })
});

app.listen(5000, () => console.log('user API listening on port 5000!'));