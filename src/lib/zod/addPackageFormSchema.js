import { z } from 'zod';

const addPackageFormSchema = (data) =>
  z.object({
    receivingTenantFullTenantDesc: z
      .string()
      .refine(
        (value) =>
          data.some((user) => user.fullUserDescription === value),
        // console.log(data),
        {
          message: 'הוסף דייר קיים',
        }
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
    notesOnArrival: z.string().optional().or(z.literal('')),
  });

export default addPackageFormSchema;