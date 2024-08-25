import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const requestData = await request.json();

  let validatedData;

  try {
    validatedData = await inventoriesSchema.parse(requestData);
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }

  try {
    await db.insert(inventories).values(validatedData);
    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Falied to store the invetnory into the database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return Response.json(
      await db
        .select({
          id: inventories.id,
          sku: inventories.sku,
          warehouse: warehouses.name,
          product: products.name,
        })
        .from(inventories)
        .leftJoin(warehouses, eq(inventories.id, warehouses.id))
        .leftJoin(products, eq(inventories.id, products.id))
        .orderBy(desc(inventories.id))
    );
  } catch (error) {
    return Response.json({});
  }
}
