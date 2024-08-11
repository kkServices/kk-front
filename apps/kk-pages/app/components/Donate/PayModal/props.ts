import type { HTMLAttributes } from 'vue'

export interface DonatePayModalProps {
  class?: HTMLAttributes['class']
  isApi?: boolean
  // visible: boolean
  qrCode: string | undefined
  outTradeNo: string | undefined
}

export const defaultProps = {
  class: '',
  // visible: false,
  isApi: false,
  // qrCode: '',
}
