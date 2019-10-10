// const { User }=require('../../../models');

// const usersRoute=(app)=>{
//     app.get('/api/admin/users',async (req,res,next)=>{
//         const users=await users.find({});
//         res.send(users);
//         next()
//     });

//     app.get('/api/admin/users/:id',async (req,res,next)=>{
//         const { id }=req.params;
//         const user=await User.findById(id);
//         res.send(user); 
//         next();
//     });

//     app.post('/api/admin/users',async (req,res,next)=>{
//         const user=new User(req.body);
//         const userSave=await user.save();
//         res.send(userSave);
//         next();
//     });

//     app.put('/api/admin/users/:id',async (req,res,next)=>{
//         const { id }=req.params;
//         const updateResult=await User.findByIdAndUpdate(id,req.body);
//         res.send(updateResult);
//         next();
//     });

//     app.del('/api/admin/users/:id',async (req,res,next)=>{
//         const { id }=req.params;
//         const delRestlt=await User.findByIdAndDelete(id);
//         res.send(delRestlt);
//         next();
//     });
// }

// module.exports=usersRoute;