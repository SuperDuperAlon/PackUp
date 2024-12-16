import { z } from 'zod';

const addPackageFormSchema = (users) => z.object({
  receivingTenantFullTenantDesc: z
    .string()
    .min(1, 'Please select a tenant from the list.')
    .refine(
      (value) =>
        users.some((user) => user.fullUserDescription === value),
      'הוסף דייר קיים'
    ),
  amount: z
    .enum(['1', '2', '3', '4', '5', '6', '7'], {
      required_error: 'Please specify the amount (1-7).',
    })
    .or(z.literal('')).refine((val) => val !== '', 'הוסף כמות'),
  type: z
    .enum(['חבילה', 'שקית', 'קרטון', 'אחר'], {
      required_error: 'Please select a valid package type.',
    })
    .or(z.literal('')).refine((val) => val !== '', 'הוסף סוג'),
  size: z
    .enum(['קטן', 'בינוני', 'גדול', 'ענק', 'אחר'], {
      required_error: 'Please select the package size.',
    })
    .or(z.literal('')).refine((val) => val !== '', 'הוסף גודל'),
  color: z
    .enum(['אדום', 'כחול', 'ירוק', 'צהוב', 'כתום', 'סגול', 'חום', 'שחור', 'לבן', 'מנומר', 'אחר'], {
      required_error: 'Please choose a color for the package.',
    })
    .or(z.literal('')).refine((val) => val !== '', 'הוסף צבע'),
});

export default addPackageFormSchema;