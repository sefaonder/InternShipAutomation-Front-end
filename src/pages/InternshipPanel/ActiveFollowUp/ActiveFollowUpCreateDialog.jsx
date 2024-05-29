import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useGetComissionACQuery } from 'src/app/api/autocompleteSlice';
import CustomAutocomplete from 'src/components/inputs/CustomAutocomplete';
import {
  useAddActiveFollowUpMutation,
  useUpdateActiveFollowUpMutation,
} from 'src/store/services/internshipPanel/internshipPanelApiSlice';

function ActiveFollowUpCreateDialog({ open, handleClose, onSucces, activeFollowUp }) {
  const [addActiveFollowUp, { isLoading }] = useAddActiveFollowUpMutation();
  const [updateActiveFollowUp, { isLoading: isLoadingUpdate }] = useUpdateActiveFollowUpMutation();

  const [form, setForm] = useState({ id: null });

  function handleFormChange(value) {
    setForm({ id: value?.id || null });
  }

  useEffect(() => {
    if (activeFollowUp?.id) {
      setForm({ id: activeFollowUp.active_follow_up.id });
    }
  }, [activeFollowUp]);

  console.log('activeFollowUp', activeFollowUp);
  console.log('form', form);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();

          console.log('form', form);

          try {
            let response = null;
            if (activeFollowUp?.id) {
              response = await updateActiveFollowUp({
                payload: { followUpId: form.id },
                activeFollowUpId: activeFollowUp?.id,
              }).unwrap();
            } else {
              response = await addActiveFollowUp({ payload: { followUpId: form.id } }).unwrap();
            }

            enqueueSnackbar(response.message, { variant: 'success' });
          } catch (error) {
            console.log(error);
          }
          onSucces();
          handleClose();
        },
      }}
    >
      <DialogTitle>
        {activeFollowUp?.id ? 'Staj Formu Yetkilisi Güncelle' : 'Yeni Staj Formu Yetkilisi Ekle'}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText maxWidth="20rem">Staj Formunda varsayılan Staj Formu Yetkilisini Seçin</DialogContentText>
        <CustomAutocomplete
          sx={{ minWidth: '15rem' }}
          name="activeFollowUp"
          id="activeFollowUp"
          label={'Staj Formu Yetkilisi'}
          value={form}
          onChange={(value) => handleFormChange(value)}
          required
          useACSlice={useGetComissionACQuery}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          İptal
        </Button>
        <Button type="submit" disabled={isLoading || isLoadingUpdate}>
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActiveFollowUpCreateDialog;
