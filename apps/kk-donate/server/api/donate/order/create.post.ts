import { z } from 'zod';

const bodySchema = z.object({
  totalAmount: z.number({ message: '请填写正确的金额' }),
  message: z.string({ message: '请填写正确的subject' }).optional(),
  email: z.string().email({ message: '请填写正确的email' }).optional(),
});

export default defineWrappedResponseHandler(async (event) => {
  // const config = useRuntimeConfig();
  const result = await validateRequest(bodySchema, event);
  return {
    qrCode: '二维码地址',
    outTradeNo: '订单号',
    isApi: false,
    message: result.message,
  };
});
