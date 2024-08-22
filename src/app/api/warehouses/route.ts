import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Response) {
    const requestData = await request.json()

    let validatedData;

    try {
        validatedData = await warehouseSchema.parse(requestData)
    } catch (error) {
        return Response.json({message: error}, {status: 400})
    }

    try {
        await db.insert(warehouses).values(validatedData)
        return Response.json({message: 'OK'}, {status: 201})

    } catch (error) {
        console.log(error)
        return Response.json({message: 'Failed to store the ware house'}, {status: 500})
        
    }
}

export async function GET() {
    try {
        return Response.json(await db.select().from(warehouses))
    } catch (error) {
        return Response.json({message: "Falied to fetch all warehouses"}, {status: 500})
        
    }
    
}