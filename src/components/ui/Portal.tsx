import ReactDOM from "react-dom"

interface PortalProps {
  id?: string
}

const Portal = ({ id = "portals", children }: React.PropsWithChildren<PortalProps>) => {
  const element = document.getElementById(id)

  if (!element) {
    return null
  }

  return ReactDOM.createPortal(children, element)
}

export default Portal

