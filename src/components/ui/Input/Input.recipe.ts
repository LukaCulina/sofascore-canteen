import { type RecipeVariantProps, sva } from "@/styled-system/css"

export const inputRecipe = sva({
  className: "input",
  slots: ["root", "label", "wrapper", "input", "adornment"],
  base: {
    root: {
      borderRadius: "sm",
    },
    label: {
      position: "absolute",
      top: "14px",
      insetInlineStart: "lg",
      textStyle: "body.large",
      color: "neutrals.nLv3",
      userSelect: "none",
      pointerEvents: "none",
      transitionProperty: "all",
      transitionDuration: "fast",

      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",

      _groupHasValue: {
        top: "xs",
        textStyle: "assistive.default",
      },

      _groupInvalid: {
        color: "status.error.default",
      },

      "& ~ .input__input": {
        paddingTop: "lg",
      },

      "& + .input__adornment": {
        paddingTop: "lg",
      },

      ".group[data-focus]:not([data-invalid]) &": {
        color: "primary.default",
      },
    },
    wrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      minHeight: "48px",
      padding: "0 token(spacing.md) 0 token(spacing.lg)",
      borderRadius: "sm",
      cursor: "text",
      transition: "border {durations.faster}",

      minWidth: "0px",
      flexGrow: 1,
      flexWrap: "wrap",
      gap: "xs",

      _disabled: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
    input: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "[0px]",
      width: "100%",

      border: "none",
      backgroundColor: "[transparent]",
      textStyle: "body.large",
      color: "neutrals.nLv1",
      outline: "none",

      overflow: "hidden",
      textOverflow: "ellipsis",

      "&::placeholder": {
        color: "neutrals.nLv3",
      },
    },

    adornment: {
      minWidth: "xl",
      display: "flex",
      alignItems: "center",
    },
  },
  variants: {
    variant: {
      filled: {
        wrapper: {
          backgroundColor: "surface.s2",
        },
      },
      outlined: {
        wrapper: {
          border: "1px solid {colors.neutrals.nLv4}",
          _focusWithin: {
            borderColor: "primary.default",
          },
          _invalid: {
            borderColor: "status.error.default",
            _focusWithin: {
              borderColor: "status.error.default",
            },
          },
          backgroundColor: "surface.s2",
        },
      },
      plain: {
        wrapper: {
          backgroundColor: "surface.s1",
          gap: "lg",
          px: "lg",
          py: "sm",
        },
      },
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
})

export type InputVariantProps = RecipeVariantProps<typeof inputRecipe>
