const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const port = 3000;


// const connectDb = require('./db.js')
const employeeRoutes = require('./controllers/employee.controller');
const { errorHandler } = require('./middlewares');

const Employee = mongoose.model('Employee');//Assuming u have defined ur employee model

const app = express();

app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);

app.get('/employees/:fullName', async(req,res) =>{
    try{
        const name = req.params.name;
        const regex = new RegExp(name,'i'); //'i' flag for case-insensitive search

        // using the regex in the query to find matching employees

        const employees = await Employee.find({fullName:regex});
        if(employees.length===0){
            return res.status(404).json({message:'Employee name Not Found'});
        }
        //Return the matching employees as json
        res.json(employees);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
});

//Mongo database Connection...
mongoose.connect('mongodb://127.0.0.1/employee_db')
    .then(() => {
        console.log('MongoDB connection is successfull...')
        app.listen(3000,()=> console.log('Server started at 3000...'))
    }).catch(err => console.log(err));