import { useId } from "react"
import { IconCheckbox, IconCheckboxFilled } from "@/components/icons"
import { css } from "@/styled-system/css"
import { Text } from "./Text"

interface CheckboxProps {
  checked: boolean
  label: string
  name?: string
  disabled?: boolean
  onChange: (checked: boolean) => void
}

const labelClass = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "sm",
  cursor: "pointer",
})

const checkboxWrapperClass = css({
  position: "relative",
  width: "17px",
  height: "17px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
})

const checkboxInputClass = css({
  appearance: "none",
  WebkitAppearance: "none",
  width: "17px",
  height: "17px",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "neutrals.nLv3",
  borderRadius: "xs",
  cursor: "pointer",
  backgroundColor: "surface.s1",
  _checked: {
    borderColor: "primary.default",
    backgroundColor: "primary.highlight",
  },
  _disabled: {
    cursor: "not-allowed",
    opacity: 0.6,
  },
})

const checkboxIconClass = css({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  transition: "opacity 0.15s ease, transform 0.15s ease",
})

const checkboxIconUncheckedClass = css({
  opacity: 1,
  transform: "scale(1)",
  _peerChecked: {
    opacity: 0,
    transform: "scale(0.9)",
  },
})

const checkboxIconCheckedClass = css({
  opacity: 0,
  transform: "scale(0.9)",
  _peerChecked: {
    opacity: 1,
    transform: "scale(1)",
  },
})

export const Checkbox = ({ checked, label, name, disabled = false, onChange }: CheckboxProps) => {
  const inputId = useId()

  return (
    <label className={labelClass} htmlFor={inputId}>
      <span className={checkboxWrapperClass}>
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className={`${checkboxInputClass} peer`}
        />
        <span className={`${checkboxIconClass} ${checkboxIconUncheckedClass}`} aria-hidden="true">
          <IconCheckbox width={17} height={17} />
        </span>
        <span className={`${checkboxIconClass} ${checkboxIconCheckedClass}`} aria-hidden="true">
          <IconCheckboxFilled width={17} height={17} />
        </span>
      </span>
      <Text textStyle="body.large" color="neutrals.nLv1">
        {label}
      </Text>
    </label>
  )
}
