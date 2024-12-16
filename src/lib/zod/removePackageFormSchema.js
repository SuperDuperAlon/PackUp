import { z } from 'zod';

const removePackageFormSchema = (users) => z.object({
  collectingTenantFullTenantDesc: z
    .string()
    .min(1, 'Please select a tenant from the list.')
    .refine(
      (value) =>
        users.some((user) => user.fullUserDescription === value),
      'הוסף דייר קיים'
    )
});

export default removePackageFormSchema;