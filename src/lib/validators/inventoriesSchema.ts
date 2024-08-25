import { z } from "zod";

export const inventoriesSchema = z.object({
  sku: z
    .string({ message: "SKU should be a string" })
    .length(8, "SKU should be 8 chars long"),
  productId: z.number({ message: "Product id should be a number" }),
  warehouseId: z.number({ message: "warehouse id should be a number" }),
});
