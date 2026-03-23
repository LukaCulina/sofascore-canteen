import { defineConfig, defineTextStyles } from "@pandacss/dev"

const textStyles = defineTextStyles({
  display: {
    extraLarge: {
      value: {
        fontFamily: "sans",
        fontSize: "2xl",
        fontWeight: 700,
        lineHeight: 1.14,
        letterSpacing: "-0.14px",
      },
    },
    large: {
      value: {
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "24px",
        letterSpacing: "-0.2px",
      },
    },
    small: {
      value: {
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "16px",
        letterSpacing: "-0.2px",
      },
    },
    micro: {
      value: {
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: "14px",
        letterSpacing: "-0.012px",
      },
    },
  },
  assistive: {
    default: {
      value: {
        fontSize: "12px",
        fontWeight: 550,
        lineHeight: "16px",
        letterSpacing: "-0.1px",
      },
    },
  },
  body: {
    large: {
      value: {
        fontSize: "16px",
        fontWeight: "normal",
        lineHeight: "20px",
        letterSpacing: "-0.1px",
      },
    },
    medium: {
      value: {
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "16px",
        letterSpacing: "-0.2px",
      },
    },
  },
  label: {
    medium: {
      value: {
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "24px",
        letterSpacing: "-0.014px",
      },
    },
  },
})

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    textStyles,
    semanticTokens: {
      colors: {
        surface: {
          s0: { value: { base: "#edf1f6", _dark: "#000000" } },
          s1: { value: { base: "#ffffff", _dark: "#171C1F" } },
          s2: {
            value: {
              base: "rgba(229, 233, 239, 0.5)",
              _dark: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        background: { value: "#E5E9EF" },
        primary: {
          default: { value: { base: "#374DF5", _dark: "#7A84FF" } },
          highlight: {
            value: {
              base: "rgba(55, 77, 245, 0.15)",
              _dark: "rgba(122, 132, 255, 0.25)",
            },
          },
        },
        tertiary: {
          highlight: {
            value: {
              base: "rgba(202, 194, 133, 0.15)",
              _dark: "rgba(202, 194, 133, 0.25)",
            },
          },
        },
        neutrals: {
          nLv1: { value: { base: "#222226", _dark: "#ECEDEF" } },
          nLv2: {
            value: {
              base: "rgba(34, 34, 38, 0.7)",
              _dark: "rgba(255, 255, 255, 0.75)",
            },
          },
          nLv3: {
            value: {
              base: "rgba(34, 34, 38, 0.45)",
              _dark: "rgba(255, 255, 255, 0.5)",
            },
          },
          nLv4: {
            value: {
              base: "rgba(34, 34, 38, 0.15)",
              _dark: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
        icons: {
          vegetarian: {
            value: {
              base: "#15B168",
              _dark: "#39B57A",
            },
          },
        },
      },
    },
    extend: {
      tokens: {
        sizes: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
          "4xl": { value: "48px" },
        },
        spacing: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
          "4xl": { value: "48px" },
        },
        radii: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
        },
      },
    },
  },
  conditions: {
    extend: {
      groupHasValue: '.group:is([data-hasvalue="true"]) &',
    },
  },
})
