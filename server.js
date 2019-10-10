const restify=require('restify');
const mongoose=require('mongoose');

const { User }=require('./models');

const app=restify.createServer();

app.use(restify.plugins.bodyParser());

app.get('/',async(req,res,next)=>{
    res.send({
        code:'success',
        message:'服务器正常qqqq',
    });
    next();
})

app.get('/users',async(req,res,next)=>{
    const users=await User.find({});
    res.send(users);
})

require('./routers/api/admin/users')(app);
require('./routers/api/admin/product')(app);

app.listen(3005,()=>{
    console.log('http://localhost:3005')
    mongoose.connect('mongodb://localhost/sscx');
    const db=mongoose.connection;
    db.on('open',()=>{
        console.log('数据库连接正常');
    });
    db.on('error',(error)=>{
        console.log(error);
    });
})