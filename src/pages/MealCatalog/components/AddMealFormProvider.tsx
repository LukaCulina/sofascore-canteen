import { FormikProvider, useFormik } from "formik"
import type { ReactNode } from "react"
import * as yup from "yup"
import { requestJson } from "@/api/http-client"
import { meals } from "@/api/routes"
import { useToastStore } from "@/stores/toast"
import type { CreateMealPayload } from "@/types"
import type { AddMealFormValues } from "./AddMealForm"

interface AddMealFormProviderProps {
  children: ReactNode
  onClose: () => void
  onMealCreated: () => Promise<unknown>
}

const initialValues: AddMealFormValues = {
  name: "",
  price: "",
  isVegetarian: false,
  imageUrl: "",
}

const schema = yup.object({
  name: yup.string().trim().required("Meal name is required"),
  price: yup
    .number()
    .transform((parsedValue, originalValue) => (originalValue === "" ? Number.NaN : parsedValue))
    .typeError("Price must be a valid number")
    .moreThan(0, "Price must be greater than 0")
    .required("Price is required"),
  isVegetarian: yup.boolean().required(),
  imageUrl: yup.string().optional(),
})

export const AddMealFormProvider = ({
  children,
  onClose,
  onMealCreated,
}: AddMealFormProviderProps) => {
  const addToast = useToastStore((s) => s.addToast)

  const formik = useFormik<AddMealFormValues>({
    initialValues,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: async (values, helpers) => {
      const payload: CreateMealPayload = {
        description: values.name.trim(),
        price: Number(values.price),
        is_vegetarian: values.isVegetarian,
        image_url: values.imageUrl.trim(),
      }

      try {
        await requestJson("POST", meals(), payload)
        await onMealCreated()
        helpers.resetForm()
        onClose()
        addToast("Meal added successfully.", "success")
      } catch {
        addToast("Failed to add meal. Please try again.", "error")
      }
    },
  })

  return <FormikProvider value={formik}>{children}</FormikProvider>
}
