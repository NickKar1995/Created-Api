
const express=require('express');
const app = express();
app.use(express.urlencoded({extended:true}));


const port = process.env.PORT ||3000

const fake_database = [
    {
        id: 1,
        name: 'Mike',
        age: 20
      },
      {
        id: 2,
        name: 'Josh',
        age: 27
      }
    ]


app.get('/',(req,res)=>{
    res.send(fake_database)
})

app.post('/user/new/', (req, res) => {
    const { name, age } = req.body;
    const id = fake_database.length + 1;
    const newUser = {
     id,
     name,
     age,
     };
    // console.log(newUser);

    fake_database.push(newUser);

    res.send('success')
    });

app.get('/user/:id',(req,res)=>{
    const {id}=req.params;
    // res.send(id)
    let searchedUser=fake_database.filter((user)=>{
        if (user.id===+id){
            return user
        }
    })
    res.send(searchedUser)
})  




app.post('/user/update/name',(req,res)=>{
    const {name,id}=req.body;
    fake_database.forEach((user)=>{
        if (user.id===+id){
           user.name = name;
        }
    })
    res.send('success')
})


app.delete('/user/delete/:id',(req,res)=>{
    const {id}=req.params;
    let index = fake_database.findIndex((user)=>{
        user.id === +id
    })
    fake_database.splice(index,1)
    res.send('success')
})





app.listen(port,()=>{
    console.log('Up and running')
})




