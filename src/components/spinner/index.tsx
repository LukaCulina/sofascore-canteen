import { css } from "@/styled-system/css"

const loaderStyle = css({
  width: "48px",
  height: "48px",
  border: "5px solid",
  borderColor: "white",
  borderBottomColor: "primary.default",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: "rotation 1s linear infinite",
})

export function Spinner() {
  return <span className={loaderStyle} />
}
