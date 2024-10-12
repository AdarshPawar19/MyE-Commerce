import { z } from "zod";

export const customerInputJsonValidation=z.object({
    firstName:z.string({message:"Fist Name should be string only"}).min(3,"Atleast 3 char required."),
    lastName:z.string({message:"Last Name should be string only"}).min(3,"Atleast 3 char required."),
    password:z.string({message:"Password should be string only"}).min(5,"Atleast 5 char required."),
    confirmPassword:z.string({message:"Password should be string only"}).min(5,"Atleast 5 char required."),
    email:z.string({message:"Email should be string only"}).email({message:"Should be email only"}).min(5,"Atleast 5 char required."),
}).refine((data)=>data.password ===data.confirmPassword,{
    message:"Password doesn't match"
})

export type CustomerInputForm=z.infer<typeof customerInputJsonValidation>

export const ifCustomerExistsValidation=z.object({
    confirmPassword:z.string({message:"Password should be string only"}).min(5,"Atleast 5 char required."),
    email:z.string({message:"Email should be string only"}).email({message:"Should be email only"}).min(5,"Atleast 5 char required."),
})

export type IfCustomerExistsInoputForm=z.infer<typeof ifCustomerExistsValidation>