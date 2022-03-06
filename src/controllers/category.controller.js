import Category from "../models/Category";

export const allCategory = async(req,res)=>{
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        
    }
}