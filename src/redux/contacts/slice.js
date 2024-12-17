import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContact } from './operations';
import { logout } from '../auth/operations';

const handlePending = state => {
  state.loading = true;
};

const handleRegected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContact.pending, handlePending)
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContact.rejected, handleRegected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        (state.error = null), state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRegected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id,
        );
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.items = [];
      });
  },
});


export default slice.reducer;
