const express=require("express");
const bodyParser=require("body-parser");

const app=express();

var items=["Buy Food","Cook Food","Eat Food"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/",function(req,res)
{
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day= today.toLocaleDateString("en-US", options);
    res.render("list", {kindofDay : day, newListItems : items})
})

app.post("/" ,function(req,res){
    var item = req.body.newItem ;
    items.push(item);
    console.log(item);
    res.redirect("/")
})

app.post("/delete-todo", function(req, res) {
    var itemId = req.body.id;
    items = items.filter(function(item) {
        return item !== itemId;
    });
    res.redirect("/");
});


app.listen(3000,function(){
    console.log("ok");
})

