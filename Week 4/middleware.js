const express = require('express');

const app = express();

function oldEnoughMiddleware(req, res, next){
    const age = req.query.age;
    if(age>=14){
        next();
    } else{
        res.status(411).json({
            msg: "Sorry you are not of age yet"
        })
    }
}

app.get("/ride1", oldEnoughMiddleware, function(req, res){
    res.json({
        msg: "You have successfully riden the ride 1"
    })
})

app.get("/ride2", oldEnoughMiddleware, function(req, res){
    res.json({
        msg: "You have successfully riden the ride 2"
    })
})

app.listen(3000);