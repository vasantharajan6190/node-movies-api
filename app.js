var express = require("express")
var app = express()
var request = require("request")
var port  = process.env.PORT|| 3000
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("search")
})

app.get("/result",(req,res)=>{
    var search = req.query.search
    if (search==""){
         return res.render("search")
    }
    var url = "http://omdbapi.com/?s="+search+"&apikey=9e35c9dc&"
    request(url,(error,result)=>{
            if(!error){
                var data = JSON.parse(result.body)
                if(data["Response"]=="False"){
                   return res.render("search")
                }
                res.render("result",{data:data})
            }
    })
})

app.listen(port,()=>{
    console.log("Server started")
})