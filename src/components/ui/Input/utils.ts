type MutableRefList<T> = Array<React.RefCallback<T> | React.MutableRefObject<T> | undefined | null>

/**
 * Utility function which allows multiple refs to consume the same node.
 *
 * @param refs List of refs
 * @returns React.Ref object
 */
export function mergeRefs<T>(...refs: MutableRefList<T>): React.RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs)
  }
}

/**
 * Utility function to set value of multiple ref objects.
 *
 * @param val Value to store
 * @param refs List of refs
 */
export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref(val)
    } else if (ref != null) {
      ref.current = val
    }
  })
}
