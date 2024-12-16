import { z } from 'zod';

export const PlayerSubstitutionFormSchema = z.object({
  playerOut: z.object({
    name: z.string().min(1, 'Player Out name is required'),
    number: z.number().min(1, 'Player Out number is required'),
  }),
  playerIn: z.object({
    name: z.string().min(1, 'Player In name is required'),
    number: z.number().min(1, 'Player In number is required'),
  }),
  substitutionTime: z.string().min(1, 'Substitution time is required'),
});

export type PlayerSubstitutionFormType = z.infer<typeof PlayerSubstitutionFormSchema>;

export const formDefaultValues: PlayerSubstitutionFormType = {
  playerOut: {
    name: '',
    number: 0,
  },
  playerIn: {
    name: '',
    number: 0,
  },
  substitutionTime: '',
};