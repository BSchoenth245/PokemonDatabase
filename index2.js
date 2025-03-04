const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const HTTP_PORT = 8000;

const PokemonDatabase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mickey2025!",
    database: "pokemondatabase"
});

var app = express();
app.use(express.json());

app.get("/alive", (req, res, next) => {
    res.status(200).json({status:"alive"});
})

app.get("/pokemon",(req,res,next) => {
        //this line opens a connection to the database so you can send it a query
        PokemonDatabase.getConnection(function(err,connection) {
        //error checking the database connection
            if (err){
                console.log("Error connecting to database");
                console.log(err);
                
                res.status(500).json({status:"error",message:"Error connecting to database"});
            } else {
            //this creates the query you plan to run
                let strCommand = 'SELECT * FROM tblPokemon left join tblMoves on tblPokemon.Move1ID = tblMoves.MoveID';
                // this runs the query and adds the vendorid from the url in place of the ? in the query
                PokemonDatabase.query(strCommand, function (err, result) {
                // makes sure there is no error in the query run
                    if(err){
                        console.log("Error retrieving record");
                        console.log(err);
                        
                        res.status(500).json({status:"error",message:"Error retrieving pokemon"});
                    } else {
                    // checks that the query returns at least one row
                        if(result.length == 0){
                        // if the query returns 0 rows, this error is returned
                            res.status(404).json({status:"error",message:"Pokemon not found"});
                        } else {
                        //returns the query results as JSON object
                            res.status(200).json(result);
                        }
                    }
                });
            }
            // releases the database connection so that you do not have memory leaks or cause issues with performance
            //PokemonDatabase.release();
        });
})

app.post("/organization",(req,res,next) => {
    if(verifySession(req) == true){
        let strOganizationID = uuidv4();
        let strName = req.body.Name;
        let strPrimaryPhone = req.body.PrimaryPhone;
        let strPrimaryEmail = req.body.PrimaryEmail;
        let strURL = req.body.URL;
        PokemonDatabase.getConnection(function(err,connection) {
            if (err){
                console.log("Error connecting to database");
                console.log(err);
                
                res.status(500).json({status:"error",message:"Error connecting to database"});
            } else {
                let strCommand = "INSERT INTO tblOrganizations VALUES (?,?,?,?,?)";
                
                PokemonDatabase.query(strCommand, [strOganizationID, strName, strPrimaryPhone, strPrimaryEmail,strURL], function (err, result) {
                    if(err){
                        console.log("Error inserting record");
                        console.log(err);
                        
                        res.status(500).json({status:"error",message:"Error adding organization type"});
                    } else {
                        res.status(201).json({status:"success",message:"Organization added",organizationid:strOganizationID});
                    }
                });
            }
            connection.release();
        });
    } else {
        res.status(401).json({status:"error",message:"Unauthorized"});
    }
})



app.listen(HTTP_PORT, () => {
    console.log('listening on port', HTTP_PORT);
})