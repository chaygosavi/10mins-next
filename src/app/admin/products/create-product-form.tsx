import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/lib/validators/productSchema";

type Props = {};

const CreateProductForm = (props: Props) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
  });
  return <div>CreateProductForm</div>;
};

export default CreateProductForm;
