const express = require('express');
const app = express();

var users = [{
    name:"john",
    kidneys:[{
        healthy:true
    }, {
        healthy: false
    }]
}]


app.use(express.json());


function isThereAnyUnhealthyKidney(){
    for(let i =0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy == false) return true;
    }
    return false;
}

app.get("/",(req,res)=>{
    // const patNo = req.query.pNo
    noOfKidneys = users[0].kidneys.length;
    let noOfHealhtyKidneys = 0;
    for(let i =0;i<noOfKidneys;i++){{
        if(users[0].kidneys[i].healthy){
            noOfHealhtyKidneys = noOfHealhtyKidneys+1;
        }
    }}
    let noOfunhelthyKidneys = noOfKidneys - noOfHealhtyKidneys;
    res.json({
        noOfKidneys,
        noOfHealhtyKidneys,
        noOfunhelthyKidneys

    });
})

app.post("/",function(req,res){
    let ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    console.log(ishealthy);

    res.json({
        msg:"done"
    })
})

app.put("/",function(req,res){
    for(let i =0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg:"done"
    })
})

app.delete("/",(req,res)=>{
    const newK = [];
    if(isThereAnyUnhealthyKidney()){
        for(let i =0 ;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newK.push({
                    healthy:true
                })
            }
        }
        users[0].kidneys = newK;
        res.json({
            msg:"deleted all the unlhealthy kidneys"
        })
    }else{
        res.json({
            msg:"there are no unhealthy kidneys"
        })
    }
})



app.listen(3001);
console.log("http://localhost:3000");