import { db } from "@/lib/db/db";
import { customer } from "@/lib/db/schema";
import { customerInputJsonValidation } from "@/validations/customerInputValidations";
import { eq } from "drizzle-orm";

export async function POST(request:Request) {
    //1st extract json data
    const getjsonData=await request.json();
    //2nd validate json data
    let validateJson;
    try {
        validateJson= customerInputJsonValidation.parse(getjsonData);
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {

        const ifCustomerExists=await db.select({id:customer.id}).from(customer).where(
            eq(customer.email,validateJson.email)
        ).limit(1);

        if(ifCustomerExists.length){
            if(ifCustomerExists[0].id){
                return Response.json({message:"Customer already exists , please try to login in."},{status:401})
            }
        }
            await db.insert(customer).values({...validateJson,
                firstName:String(validateJson.firstName),
                lastName:String(validateJson.lastName),
                password:String(validateJson.confirmPassword),
                email:String(validateJson.email)
            })
        
        
        return Response.json({message:"created"},{status:201});
    } catch (error) {
        return Response.json({message:"Failed to create user."},{status:500})
    }

}