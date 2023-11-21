import { useEffect, useState } from "react"
import { Center, CloseButton } from "@chakra-ui/react"

import BannerNotification from "@/components/BannerNotification"
import type { ChildOnlyProp } from "@/lib/types"

type DismissibleBannerProps = ChildOnlyProp & {
  storageKey: string
}

const DismissibleBanner = ({
  children,
  storageKey,
}: DismissibleBannerProps) => {
  const TRUE = "true"
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem(storageKey) === TRUE
    setShow(!isDismissed)
  }, [])

  const onClose = () => {
    localStorage.setItem(storageKey, TRUE)
    setShow(false)
  }

  return (
    <BannerNotification shouldShow={show}>
      <Center paddingEnd="8">{children}</Center>
      <CloseButton onClick={onClose} aria-label="Close Banner" />
    </BannerNotification>
  )
}

export default DismissibleBanner
