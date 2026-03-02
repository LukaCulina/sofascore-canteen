import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { css, cx } from "@/styled-system/css"

import { inputRecipe } from "./Input.recipe"
import type { InputProps } from "./interface"
import { mergeRefs } from "./utils"

export const Input = (inputProps: InputProps) => {
  const {
    ref,
    label,
    value = "",
    defaultValue,
    name,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onPaste,
    onClick,
    startAdornment,
    endAdornment,
    // HTML Input props
    type = "text",
    required,
    disabled,
    autocomplete,
    minLength,
    maxLength,
    min,
    max,
    step = "1",
    ...rest
  } = inputProps
  const [variantProps, cssProps] = inputRecipe.splitVariantProps({
    ...rest,
  })

  const [fieldValue, setFieldValue] = useState(defaultValue || value)
  const [isFocused, setIsFocused] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const fieldRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isLabelFloating =
    isFocused || !!startAdornment || !!placeholder || !!fieldValue

  const classes = inputRecipe(variantProps)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()

    if (!isFocused) onFocus?.(fieldValue)

    setIsFocused(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(fieldValue, e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Call external handler
    onChange?.(newValue, e)

    setFieldValue(newValue)
  }

  useLayoutEffect(() => {
    let resizeObserver: ResizeObserver

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width } = entry.contentRect
          setContainerWidth(width)
        }
      })

      if (fieldRef.current) resizeObserver.observe(fieldRef.current)
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    setFieldValue(value)
  }, [value])

  return (
    <div
      className={cx(classes.root, css(cssProps))}
      title={typeof label === "string" ? label : undefined}
    >
      <div
        className={`group ${classes.wrapper}`}
        ref={wrapperRef}
        onClick={() => {
          fieldRef.current?.focus()
        }}
        tabIndex={-1}
        data-disabled={disabled || undefined}
        data-focus={isFocused || undefined}
        data-hasvalue={isLabelFloating || undefined}
      >
        {label && (
          <label
            className={classes.label}
            htmlFor={name}
            style={{ width: containerWidth }}
          >
            {label}
            {required && " *"}
          </label>
        )}

        {startAdornment && (
          <div className={classes.adornment}>{startAdornment}</div>
        )}

        <input
          ref={mergeRefs(ref, fieldRef)}
          className={`peer ${classes.input}`}
          tabIndex={0}
          type={type}
          name={name}
          placeholder={placeholder}
          aria-label={name}
          id={name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(e)
          }}
          onPaste={onPaste}
          onClick={onClick}
          value={fieldValue}
          disabled={disabled}
          autoComplete={autocomplete}
          min={min}
          max={max}
          step={step}
          minLength={minLength}
          maxLength={maxLength}
        />

        {!disabled && endAdornment && (
          <div className={classes.adornment}>{endAdornment}</div>
        )}
      </div>
    </div>
  )
}
