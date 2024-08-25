import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await deliveryPersonSchema.parse(requestData);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(deliveryPersons).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Falied to store the delivery person into the database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return Response.json(
      await db
        .select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouses: warehouses.name
        })
        .from(deliveryPersons)
        .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id))
        .orderBy(desc(deliveryPersons.id))
    );
  } catch (error) {
    return Response.json(
      { message: "Falied fetch delivery persons" },
      { status: 500 }
    );
  }
}
