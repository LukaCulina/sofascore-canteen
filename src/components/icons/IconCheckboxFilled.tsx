import type { IconProps } from "@/components/icons/interface"
import { type ColorToken, token } from "@/styled-system/tokens"

interface IconCheckboxFilledProps extends IconProps {
  fill?: ColorToken
}

export const IconCheckboxFilled = ({ fill = "primary.default", ...props }: IconCheckboxFilledProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Checkbox Filled Icon"
      {...props}
    >
      <path
        d="M7.1 10.2463L4.777 7.923C4.6385 7.78467 4.46442 7.71383 4.25475 7.7105C4.04525 7.70733 3.868 7.77817 3.723 7.923C3.57817 8.068 3.50575 8.24367 3.50575 8.45C3.50575 8.65633 3.57817 8.832 3.723 8.977L6.46725 11.7213C6.64808 11.9019 6.859 11.9923 7.1 11.9923C7.341 11.9923 7.55192 11.9019 7.73275 11.7213L13.2962 6.15775C13.4346 6.01925 13.5054 5.84517 13.5087 5.6355C13.5119 5.426 13.4411 5.24875 13.2962 5.10375C13.1512 4.95892 12.9756 4.8865 12.7693 4.8865C12.5629 4.8865 12.3872 4.95892 12.2423 5.10375L7.1 10.2463ZM1.80775 17C1.30258 17 0.875 16.825 0.525 16.475C0.175 16.125 0 15.6974 0 15.1923V1.80775C0 1.30258 0.175 0.875 0.525 0.525C0.875 0.175 1.30258 0 1.80775 0H15.1923C15.6974 0 16.125 0.175 16.475 0.525C16.825 0.875 17 1.30258 17 1.80775V15.1923C17 15.6974 16.825 16.125 16.475 16.475C16.125 16.825 15.6974 17 15.1923 17H1.80775Z"
        fill={token(`colors.${fill}`)}
      />
    </svg>
  )
}

