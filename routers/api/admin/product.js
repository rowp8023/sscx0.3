const errors=require('restify-errors');

const { Product }=require('../../../models');

const productRoute=(app)=>{
    // 获取商品信息
    app.get('/api/admin/products',async (req,res,next)=>{
        const products=await Product.find();
        res.send(products)
        next();
    });

    // 根据Id获取商品信息
    app.get('/api/admin/products/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const product=await Product.findById(id);
            res.send(product);
        } catch (error) {
            res.send(new errors.ResourceNotFoundError(error));
        }
        next();
    });

    // 增加商品信息
    app.post('/api/admin/products',async (req,res,next)=>{
        try {
            const productExist=await Product.countDocuments({name:req.body.name});
        if(productExist>0){
            res.send({
                code:'error',
                message:'该商品已经存在',
            })
        }else{
            const product=new Product(req.body);
            const productSave=await product.save()
            res.send(productSave);
        }
        } catch (error) {
            res.send(new errors.InternalServerError(error));
        }
        
        next();
    })

    // 修改商品信息
    app.put('/api/admin/products/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const updateResult=await Product.findByIdAndUpdate(id,req.body);
            res.send(updateResult);
        } catch (error) {
            res.send(new errors.ResourceNotFoundError(error))
        }
        next();
    })

    // 删除商品
    app.del('/api/admin/products/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const delResult=await Product.findByIdAndDelete(id);
            res.send(delResult);
        } catch (error) {
            res.send(new errors.InternalServerError(error))
        }
        next();
    })
}

module.exports=productRoute;