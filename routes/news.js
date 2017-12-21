var News  = require('../models').News;
var express = require('express');
var router = express.Router();

var PAGE_SIZE=10;

router.post('/',function(req,res){
    var form = req.body;
    form.create_time = Date.now();
    News.create(form).then(function(data){
        res.status(201).json(data);
    });
})
router.get('/', function(req, res) {
    var search = req.query.search||'';
    var page = parseInt(req.query.page||1);
    News.findAndCountAll({
        where:{
            title:{
                $like:'%'+search+'%',
            }
        },
        order:[
            ['create_time','DESC'],
        ],
        limit:PAGE_SIZE,
        offset:PAGE_SIZE*(page-1),
    })
    .then(function(data){
        var total_count = data.count;
        var page_count = Math.floor(total_count/PAGE_SIZE);
        if(total_count%PAGE_SIZE>0){
            page_count++;
        }
        data = {
            total_count:data.count,
            page_count:page_count,
            next:page<page_count,
            previous:page>1,
            results:data.rows,
        }
        res.json(data)
    });
})
router.delete('/deletes/',function(req,res){
    News.destroy({
        where:{
            id:{
                $in:req.query.ids.split(',')
            }
        }
    })
    .then(function(){
        res.json({})
    })
})

router.route('/:id/')
.get(function(req,res){
    News.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(function(data){
        res.json(data);
    });
})
.put(function(req,res){
    News.update(req.body,{
        where:{
            id:req.params.id
        }
    })
    .then(function(data){
        res.json({})
    });
})
.delete(function(req,res){
    News.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(function(data){
        res.json({})
    });
});

module.exports = router;