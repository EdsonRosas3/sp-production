import TypeService from "../models/TypeService";

export const allTypeService = async(req,res)=>{
    try {
        const types = await TypeService.findAll();
        return res.status(200).json(types);
    } catch (error) {
        
    }
}