const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vinesh:ZPeJqoeB3pV8VcBP@cluster0.jshxrz1.mongodb.net/');
const todoSchema = mongoose.Schema({
    description:String,
})
const Todos = mongoose.model('Todos', todoSchema);


app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    // res.json({
    //     message:"checking"
    // })
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
})   

// To get all data 
app.get('/todo', async(req, res) => {
    try{
        const data = await Todos.find({});
        if(data){
            res.json({
                message:"data send successfully!",
                data
            })
        }else{
            res.json({
                message:"something went wrong!"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
});

// To add data
app.post('/todo', async(req, res)=>{
    try{
        const { description} = req.body;
        const dataToBeUpdated = {
            description
        }
        const ret = await Todos.create(dataToBeUpdated);
        if(ret){
            res.json({
                message:"data added successfully!",
                data:ret
            })
        }else{
            res.json({
                message:"data does not added!"
            })
        }

    }catch(err){
        res.json({
            message:err.message
        })
    }
    
})

// To delete todo from our array
app.delete('/todo/:id',async(req, res)=>{
    try{
        const id = req.params.id;
        const deletedData = await Todos.findOneAndDelete({_id:id});
        if(deletedData){
            res.json({
                message:"data deleted successfully!",
                deletedData:deletedData
            })
        }else{
            res.json({
                message:"You entered the wrong ID!"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
    
})

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});







