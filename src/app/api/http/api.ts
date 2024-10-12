import { CustomerInputForm, IfCustomerExistsInoputForm } from "@/validations/customerInputValidations";
import { api } from "./client";

export const createCustomerData =async(data:CustomerInputForm)=>{
    const response=await api.post("/customer/create",data)
    return response.data;
}


export const ifSignInSuccessfullRedirectToMainpage=async(data:IfCustomerExistsInoputForm)=>{
    const response=await api.post("/customer/ifAccountSignIn",data)
    return response.data;
}
