import { z } from 'zod';

const formSchema = z.object({
  receivingTenantFullTenantDesc: z
    .string()
    .min(1, 'This field is required')
    .refine(
      (value) =>
        users.some((user) => user.fullUserDescription === value),
      'Invalid selection. Please choose a valid option from the list.'
    ),
  amount: z.enum(['1', '2', '3', '4', '5', '6', '7'], {
    required_error: 'Amount is required',
  }),
  type: z.enum(['חבילה', 'שקית', 'קרטון', 'אחר'], {
    required_error: 'Type is required',
  }),
  size: z.enum(['קטן', 'בינוני', 'גדול', 'ענק', 'אחר'], {
    required_error: 'Size is required',
  }),
  color: z.enum(['אדום', 'כחול', 'ירוק', 'צהוב', 'כתום', 'סגול', 'חום', 'שחור', 'לבן', 'מנומר', 'אחר'], {
    required_error: 'Color is required',
  }),
});

export default formSchema;