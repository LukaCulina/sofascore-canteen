import { FormikProvider, useFormik } from "formik"
import type { ReactNode } from "react"
import { useIntl } from "react-intl"
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

export const AddMealFormProvider = ({
  children,
  onClose,
  onMealCreated,
}: AddMealFormProviderProps) => {
  const addToast = useToastStore((s) => s.addToast)
  const intl = useIntl()

  const schema = yup.object({
    name: yup
      .string()
      .trim()
      .required(intl.formatMessage({ id: "validation.mealNameRequired" })),
    price: yup
      .number()
      .transform((parsedValue, originalValue) => (originalValue === "" ? Number.NaN : parsedValue))
      .typeError(intl.formatMessage({ id: "validation.priceMustBeNumber" }))
      .moreThan(0, intl.formatMessage({ id: "validation.priceGreaterThanZero" }))
      .required(intl.formatMessage({ id: "validation.priceRequired" })),
    isVegetarian: yup.boolean().required(),
    imageUrl: yup.string().optional(),
  })

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
        addToast(intl.formatMessage({ id: "toast.mealAdded" }), "success")
      } catch {
        addToast(intl.formatMessage({ id: "toast.mealAddFailed" }), "error")
      }
    },
  })

  return <FormikProvider value={formik}>{children}</FormikProvider>
}
