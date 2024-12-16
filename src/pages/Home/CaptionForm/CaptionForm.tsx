import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlayerSubstitutionFormType, PlayerSubstitutionFormSchema, formDefaultValues } from './constant';
import { TextField, Button, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { CREATE_CAPTION_MUTATION } from '../../../utils/graphql/mutations';
import { useMutation } from '@apollo/client';

const CaptionForm: React.FC = () => {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [createCaption] = useMutation(CREATE_CAPTION_MUTATION);
  const { control, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<PlayerSubstitutionFormType>({
    resolver: zodResolver(PlayerSubstitutionFormSchema),
    defaultValues: formDefaultValues,
  });

  console.log("Watch", watch());

  const onSubmit = async (data: PlayerSubstitutionFormType) => {
    try {
      setSubmitError(null);
      await createCaption({
        variables: {
          playerOut: data.playerOut.name,
          playerOutNumber: data.playerOut.number,
          playerIn: data.playerIn.name,
          playerInNumber: data.playerIn.number,
          substitutionTime: data.substitutionTime,
        },
      });
    } catch (error) {
      setSubmitError('Failed to create. Please try again.');
      console.error("Error creating substitution:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Player Substitution</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="playerOut"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Player Out Name"
                  fullWidth
                  error={!!errors.playerOut}
                  helperText={errors.playerOut?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='playerOut.number'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Player Out Number"
                  fullWidth
                  error={!!errors.playerOut?.number}
                  helperText={errors.playerOut?.number?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="playerIn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Player In Name"
                  fullWidth
                  error={!!errors.playerIn}
                  helperText={errors.playerIn?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="playerIn.number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Player In Number"
                  type="number"
                  fullWidth
                  error={!!errors.playerIn?.number}
                  helperText={errors.playerIn?.number?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="substitutionTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="time"
                  label="Substitution Time"
                  fullWidth
                  error={!!errors.substitutionTime}
                  helperText={errors.substitutionTime?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              aria-label="Submit Player Substitution Form" 
              type="submit" 
              disabled={isSubmitting} 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              {isSubmitting ? <><CircularProgress size={20} sx={{ color: 'white', mr: 2 }} />Please wait...</> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {submitError && <Typography color="error">{submitError}</Typography>}

    </Box>
  );
};

export default CaptionForm;
