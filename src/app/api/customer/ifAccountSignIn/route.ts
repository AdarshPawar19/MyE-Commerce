import { db } from "@/lib/db/db";
import { customer } from "@/lib/db/schema";
import { ifCustomerExistsValidation } from "@/validations/customerInputValidations";
import { and, eq } from "drizzle-orm";


export async function POST(request:Request,response:Response) {
    //extract json
    const extractJSON=await request.json();
    //validate json
    let validatedData;
    try {
        validatedData=ifCustomerExistsValidation.parse(extractJSON);
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {
      const result= await db.select({id:customer.id}).from(customer).where(
        and(
            eq(customer.email,validatedData.email),
            eq(customer.password,validatedData.confirmPassword)
        )
       )
    //    if(result.length){
    //       route.push("/")
    //    }else {
    //     route.push("/customer/create")
    //    }
    if(result.length){
        return Response.json({message:"Redirecting to product's page ."},{status:200})
    }else{
        return Response.json({message:"You dont have account , please Create new one"},{status:401})
    }
    } catch (error) {
        return Response.json({message:"Failed to fetch data"},{status:500})
    }
}