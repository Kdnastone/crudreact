const express = require('express');
const app = express();
const mysql = require("mysql");

const cors = require("cors");
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "usuario1",
    password: "recia10",
    database: "registro"
});

app.use(cors());

app.post("/create",(req,res)=>{
    const grupo = req.body.grupo;
    const tipo = req.body.tipo;
    const nombreComun = req.body.nombreComun;
    const genero = req.body.genero;
    const especie = req.body.especie;

    db.query('INSERT INTO ingreso(grupo, tipo, nombreComun, genero, especie) VALUES (?,?,?,?,?)',
    [grupo, tipo, nombreComun, genero, especie],
    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result)    
        }
    });
});

app.get("/ingresos",(req,res)=>{
    db.query('SELECT * FROM ingreso',
    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result)    
        }
    });
});

app.put("/update",(req,res)=>{
    const id =req.body.id
    const grupo = req.body.grupo;
    const tipo = req.body.tipo;
    const nombreComun = req.body.nombreComun;
    const genero = req.body.genero;
    const especie = req.body.especie;

    db.query('UPDATE ingreso SET grupo=?, tipo=?, nombreComun=?, genero=?, especie=? WHERE id=?',
    [grupo, tipo, nombreComun, genero, especie,id],
    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result)    
        }
    });
});

app.delete("/delete/:id",(req,res)=>{
    const id =req.params.id

    db.query('DELETE FROM ingreso WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result)    
        }
    });
});



app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
});
