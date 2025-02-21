import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

const useZodForm = (
  schema: ZodSchema,
  mutate: UseMutateFunction,
  defaultValues?: any
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = handleSubmit(async (values) => mutate(values));

  return {
    register,
    errors,
    onFormSubmit,
    watch,
    reset,
  };
};

export default useZodForm;
