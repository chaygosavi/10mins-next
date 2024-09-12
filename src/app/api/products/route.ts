import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { isServer, productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;

  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }
  const inputImage = isServer
    ? (validatedData.image as File)
    : (validatedData.image as FileList)[0];
  const filename = `${Date.now()}.${validatedData.image.name
    .split(".")
    .slice(-1)}`;

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", filename),
      buffer
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to save the file to fs" },
      { status: 500 }
    );
  }

  try {
    await db.insert(products).values({ ...validatedData, image: filename });
  } catch (error) {
    return Response.json(
      { message: "Failed to store the product into the database" },
      { status: 500 }
    );
  }

  return Response.json({ message: "OK" }, { status: 201 });
}

export async function GET() {
  try {
    return Response.json(
      await db.select().from(products).orderBy(desc(products.id))
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
