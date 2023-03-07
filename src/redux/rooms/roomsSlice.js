import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3000/api/v1';
export const FETCH_ROOMS = `${URL}/rooms`;

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
  const response = await axios.get(FETCH_ROOMS, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return response.data;
});

export const removeRoom = createAsyncThunk('rooms/removeRoom', async (id) => {
  await axios.delete(`${FETCH_ROOMS}/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  return id;
});

const initialState = {
  rooms: [],
  status: 'idle',
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRooms.pending, (state) => ({
        ...state,
        status: 'Loading',
      }))
      .addCase(getRooms.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        rooms: action.payload,
      }))
      .addCase(getRooms.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(removeRoom.fulfilled, (state, action) => {
        const rooms = state.rooms.filter((room) => room.id !== action.payload);
        return {
          ...state,
          rooms,
        };
      });
  },
});

export const selectAllRooms = (state) => state.rooms.rooms;
export const getRoomsStatus = (state) => state.rooms.status;
export const getRoomsError = (state) => state.rooms.error;

export default roomsSlice.reducer;
