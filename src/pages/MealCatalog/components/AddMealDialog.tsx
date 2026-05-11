import { useFormikContext } from "formik"
import { useId } from "react"
import { Dialog } from "@/components/dialog"
import { Spinner, Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Box, Flex } from "@/styled-system/jsx"
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
  const dialogTitleId = useId()
  const dialogDescriptionId = useId()

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
    <Dialog.Root
      onClose={handleClose}
      ariaLabelledBy={dialogTitleId}
      ariaDescribedBy={dialogDescriptionId}
    >
      <form onSubmit={formik.handleSubmit} aria-busy={formik.isSubmitting}>
        <Dialog.Header>
          <Dialog.Title>
            <span id={dialogTitleId}>Add New Meal</span>
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Box id={dialogDescriptionId}>
            <AddMealForm />
          </Box>
          {formik.status ? (
            <Text mt="sm" textStyle="assistive.default" color="status.error.default" role="alert">
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
