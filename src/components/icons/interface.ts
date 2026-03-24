import type { SVGProps } from "react"
import type { ColorToken } from "@/styled-system/tokens"

export type IconProps = SVGProps<SVGSVGElement> & {
  fill?: ColorToken
}
