// 加密模块
const bcrypt=require('bcryptjs');
// 格式化服务器返回的错误信息
const errors=require('restify-errors');

const { User }=require('../../../models');

const usersRoute=(app)=>{
    //获取用户
    app.get('/api/admin/users',async (req,res,next)=>{
        const users=await User.find({});
        res.send(users);
        next();
    })

    // 根据ID获取单个用户
    app.get('/api/admin/users/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const user=await User.findById(id);
            res.send(user);
        }catch(error){
            res.send(new errors.ResourceNotFoundError(error))
        }
        next();
    })

    // 新增用户
    app.post('/api/admin/users',async (req,res,next)=>{
        const userExist=await User.count({userName:req.body.userName});
        if(userExist>0){
            res.send({
                code:'error',
                message:'用户名已经存在'
            })
        }else {
            const user=new User(req.body);
            // 用户密码加密处理
            const salt=bcrypt.genSaltSync(10);
            const pwd=bcrypt.hashSync(req.body.password,salt);
            user.password=pwd;
            const userSave=await user.save();
            res.send(userSave);
        }
        next();
    })

    // 修改用户
    app.put('/api/admin/users/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const updataResult=await User.findByIdAndUpdate(id,req.body);
            res.send(updataResult);
        } catch (error) {
            res.send(new errors.ResourceNotFoundError(error))
        }
        // res.send(users);
        next();
    })

    // 删除用户
    app.del('/api/admin/users/:id',async (req,res,next)=>{
        try {
            const { id }=req.params;
            const delResult=await User.findByIdAndDelete(id);
            res.send(delResult);
        } catch (error) {
            res.send(new errors.InternalServerError(error))
        }
        next();
    })
}

module.exports=usersRoute;