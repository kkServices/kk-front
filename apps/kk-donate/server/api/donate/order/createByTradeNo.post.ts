import { z } from 'zod';

const bodySchema = z.object({
  tradeNo: z.string({ message: '请填写正确的tradeNo' }),
  message: z.string({ message: '请填写正确的subject' }).optional(),
  email: z.string().email({ message: '请填写正确的email' }).optional(),
});

export default defineWrappedResponseHandler(async (event) => {
  return await validateRequest(bodySchema, event);
});
