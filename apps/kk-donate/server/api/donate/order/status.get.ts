import { z } from 'zod';

const requestSchema = z
  .object({ outTradeNo: z.string().optional(), tradeNo: z.string().optional() })
  .refine((data) => data.outTradeNo || data.tradeNo, '请传入outTradeNo或tradeNo');

export default defineWrappedResponseHandler(async (event) => {
  return await validateRequest(requestSchema, event);
});
