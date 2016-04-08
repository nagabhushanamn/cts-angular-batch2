var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


//---------------------------------------------------

var productSchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    make:Date
});

var Product=mongoose.model('Product',productSchema);

//-----------------------------------------------------

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get("/",function(req,resp,next){
    // load all products
    Product.find(function(err,data){
        if(err){
            console.log(err);
        }
        resp.json(data);
    });
});
router.get("/:id",function(req,resp,next){
    // load product by id
    Product.findById(req.params.id,function(err,data){
         if(err){
            console.log(err);
        }
         resp.json(data);
    })
});
router.post("/",function(req,resp,next){
    // create new product
    var input=req.body;
    var product=new Product({
        name:input.name,
        price:input.price,
        description:input.description,
        make:input.make
    });
    product.save(function(err,data){
        resp.json(data);
    });
});

router.put("/:id",function(req,res,next){
    // create or update product
    var product=req.body;
    Product.update(product,function(err,data){
        res.json(data);
    });
    
});
router.delete("/:id",function(req,resp,next){
    // delete product 
    Product.remove({_id:req.params.id},function(err,data){
        resp.json(data);
    });
});

module.exports = router;
