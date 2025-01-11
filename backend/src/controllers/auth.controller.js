import authService from "../services/auth.service.js";
import HttpError from "../utils/HttpError.js";
import userValidationSchemaForLogin from "../validations/userValidationSchema.js";

const registration = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role } = req.body;

  try {
    const newUser = await authService.registration({
      lastName,
      firstName,
      email,
      password,
      phone,
      role,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await userValidationSchemaForLogin.validate({ email, password });
    const token = await authService.login({ email, password });
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const listUsers=async(req,res,next)=>{
  try{
      const users=await authService.getAllUser();
      res.json(users);
  } catch(error){
      next(error);
  }
};

const getUser=async(req,res,next)=>{
  try{
    const id=req.params.id;
    if (id) {
      const user=await authService.getUserById(id);
      if(!user) next(new HttpError("User is not Found",404));
      else res.json(user);
  }

} catch(error){
    next(error);
}
};

const getOwnUser=async(req,res,next)=>{
  try{
      const id=  req.user.id;
      const user=await authService.getOwnUserById(id);
      if(!user) next(new HttpError("User is not Found",404));
      else res.json(user);
  

} catch(error){
    next(error);
}
};

const updateUser=async(req,res,next)=>{
  let{id,firstName,lastName,email,phone,password,role}=req.body;
 
  
  if(id) {
    if(req.user.role!="Admin" && id!=req.user.id) {
      next(new HttpError("Access denied: Admin can update users only",403));
      return;
    }
    if (req.user.role!="Admin") role=undefined;
    else if (id!=req.user.id) password=undefined;
    try{
    const user=await authService.updateUser(id,firstName,lastName,email,phone,role,password);
    if (user) res.status(201).json({message:"Update is successful."});
    else next(new HttpError("User is not Found",404));
  } catch(error){
    next(error);
  }
}
else next(new HttpError("User is not Found",404));
};

const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
     if (id) {
      const user=await authService.deleteUser(id);
      if (user) res.status(201).json({message:"User deleted"});
      else next(new HttpError("User is not Found",404));
     }
     else next(new HttpError("User id is required",401));
}

export default { registration, login, listUsers, getUser, getOwnUser, updateUser,deleteUser };
