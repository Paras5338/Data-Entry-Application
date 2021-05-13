const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express();
const mysql=require('mysql');

const db=mysql.createPool({
    host: "localhost",
    user: "root",
    passward: "",
    database:"cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get',(req,res) => { 
    const sqlSelect  = "select * from stud_details";
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });
});

app.post("/api/insert",(req,res) => { 
    const studName = req.body.studName;
    const studDetail = req.body.studDetail;

    const sqlInsert = "insert into stud_details(studName, studDetail)values (?,?)";
    db.query(sqlInsert, [studName, studDetail], (err,result)=>{
        console.log(err);
    });
});

app.delete('/api/delete/:studName', (req,res)=> {
    const name=req.params.studName;
    const sqlDelete = "delete from stud_details where studName = ?";
     db.query(sqlDelete, name, (err,result) => {
        if (err) console.log(err)
     })
})


app.put('/api/update', (req,res)=> {
    const name=req.body.studName;
    const detail=req.body.studDetail;
    const sqlUpdate= "update stud_details set  studDetail = ? where studName = ?";
     db.query(sqlUpdate, [detail, name], (err,result) => {
        if (err) console.log(err)
     })
})

app.listen(3001, () => {
    console.log("running on port 3001");
});