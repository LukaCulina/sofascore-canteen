import { defineConfig, defineTextStyles } from "@pandacss/dev"

const textStyles = defineTextStyles({
  display: {
    extraLarge: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "2xl",
        fontWeight: 700,
        lineHeight: 1.14,
        letterSpacing: "-0.14px",
      },
    },
    large: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "24px",
        letterSpacing: "-0.2px",
      },
    },
    medium: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "lg",
        fontWeight: "bold",
        lineHeight: "20px",
        letterSpacing: "-0.032px;",
      },
    },
    small: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "16px",
        letterSpacing: "-0.2px",
      },
    },
    micro: {
      value: {
        fontFamily: "SofascoreSans",
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
        fontFamily: "SofascoreSans",
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
        fontFamily: "SofascoreSans",
        fontSize: "lg",
        fontWeight: "normal",
        lineHeight: "20px",
        letterSpacing: "-0.1px",
      },
    },
    medium: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "16px",
        letterSpacing: "-0.2px",
      },
    },
    small: {
      value: {
        fontFamily: "SofascoreSans",
        fontSize: "12px",
        fontWeight: "normal",
        lineHeight: "16px",
        letterSpacing: "-0.2px",
      },
    },
  },
  label: {
    medium: {
      value: {
        fontFamily: "SofascoreSans",
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
          nLv5: {
            value: {
              base: "rgba(34, 34, 38, 0.06)",
              _dark: "rgba(255, 255, 255, 0.08)",
            },
          },
        },
        status: {
          success: {
            default: { value: { base: "#15B168", _dark: "#39B57A" } },
            highlight: {
              value: {
                base: "rgba(21, 177, 104, 0.1)",
                _dark: "rgba(57, 181, 122, 0.1)",
              },
            },
          },
          error: {
            default: { value: { base: "#C7361F", _dark: "#E35C47" } },
            highlight: {
              value: {
                base: "rgba(199, 54, 31, 0.1)",
                _dark: "rgba(227, 92, 71, 0.1)",
              },
            },
          },
          alert: {
            default: { value: { base: "#C7921F", _dark: "#DBAA3F" } },
            highlight: {
              value: {
                base: "rgba(199, 146, 31, 0.1)",
                _dark: "rgba(255, 117, 0, 0.1)",
              },
            },
          },
        },
      },
    },
    extend: {
      tokens: {
        spacing: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
          "2xl": { value: "32px" },
          "4xl": { value: "48px" },
          "6xl": { value: "64px" },
        },
        radii: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
        },
        sizes: {
          "2xs": { value: "2px" },
          xs: { value: "4px" },
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          xl: { value: "24px" },
          "2xl": { value: "32px" },
          "4xl": { value: "48px" },
          "6xl": { value: "64px" },
        },
        borderWidths: {
          thin: { value: "1px" },
          thick: { value: "2px" },
          heavy: { value: "4px" },
        },
        zIndex: {
          toast: { value: 9999 },
        },
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  conditions: {
    extend: {
      groupHasValue: '.group:is([data-hasvalue="true"]) &',
    },
  },
  globalCss: {
    "input[type='date']::-webkit-calendar-picker-indicator": {
      opacity: 0,
      position: "absolute",
      right: 0,
      width: "3xl",
      height: "100%",
      cursor: "pointer",
    },
  },
})
