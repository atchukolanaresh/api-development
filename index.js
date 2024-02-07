const express = require('express');
const mongoose = require( 'mongoose');


const app = express()
app.use(express.json())

app.listen(8000,()=>{
    console.log('server is running');
})
//moongoose database connection
mongoose.connect('mongodb://localhost:27017/users')
.then(()=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log(err);
})

//mongoose schema 
const usersSchema = mongoose.Schema({
    user_id: { type: Number, unique: true },
    name: {type:String,required:true},
    email: {type:String,required:[true,"email is mandatoty"]}
},{timestamps:true});

//model  creation

const usersModel = mongoose.model('users',usersSchema)



// app.get('/users/:id',(req,res)=>{
//     console.log(req.params.id);
//     res.send("'<h1> kjhfkjs</h1> <js>console.log('hi')<js>'")
    
// })

//post of all users data
// app.post('/users',(req,res)=>{
//   let users = (req.body);
//   usersModel.create(users)
//   .then((users)=>{
//     res.send(users)
//   })
//  .catch((err)=>{
//     console.log(err)
//     res.send(err)
//  })
// })

//get users data
app.get('/users',(req,res)=>{
    let users = usersModel.find().then(
        (users)=>{
            res.send(users)
        }
    ).catch((err)=>{
        res.send(err)
    })

})
// get individual user
app.get('/users/:id',(req,res)=>{
  
  usersModel.find({user_id:req.params.id})
  .then((user)=>{
    res.send(user)
  })
  .catch((err)=>{
    res.send(err)
  })
})

//updating data

app.put('/users/:id',(req,res)=>{
    let user = req.body
    usersModel.updateOne({user_id:req.params.id},user)
    .then((user)=>{
        res.send(user)
    })
    .catch((err)=>{
        res.send(err)
    })
})


//detele data
app.delete('/users/:id',(req,res)=>{
    usersModel.deleteOne({user_id:req.params.id}).
    then((user)=>res.send(user)).catch((err)=>res.send(err))

})