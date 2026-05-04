import { useFormikContext } from "formik"
import { Dialog } from "@/components/dialog"
import { Spinner, Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Flex } from "@/styled-system/jsx"
import { AddMealForm, type AddMealFormValues } from "./AddMealForm"

interface AddMealDialogProps {
  isOpen: boolean
  onClose: () => void
}

const AddMealDialogFooter = ({
  isSubmitting,
  onCancel,
}: {
  isSubmitting: boolean
  onCancel: () => void
}) => {
  const { isValid, dirty } = useFormikContext<AddMealFormValues>()

  return (
    <Flex gap="lg" w="full">
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting || !dirty || !isValid}>
        {isSubmitting ? (
          <Flex alignItems="center" gap="sm">
            <Spinner size="sm" />
            Adding...
          </Flex>
        ) : (
          "Add Meal"
        )}
      </Button>
    </Flex>
  )
}

export const AddMealDialog = ({ isOpen, onClose }: AddMealDialogProps) => {
  const formik = useFormikContext<AddMealFormValues>()

  if (!isOpen) {
    return null
  }

  const handleClose = () => {
    if (formik.isSubmitting) {
      return
    }

    formik.resetForm()
    onClose()
  }

  return (
    <Dialog.Root onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Dialog.Header>
          <Dialog.Title>Add New Meal</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <AddMealForm />
          {formik.status ? (
            <Text mt="sm" textStyle="assistive.default" color="status.error.default">
              {formik.status}
            </Text>
          ) : null}
        </Dialog.Content>
        <Dialog.Footer>
          <AddMealDialogFooter isSubmitting={formik.isSubmitting} onCancel={handleClose} />
        </Dialog.Footer>
      </form>
    </Dialog.Root>
  )
}
