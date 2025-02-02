import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { FilterStatus, SortType } from '../../../app/types';

interface ControlState {
  filterStatus: FilterStatus;
  sortType: SortType;
}

const initialState: ControlState = {
  filterStatus: 'all',
  sortType: 'None'
};

const controlSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const { setFilterStatus, setSortType } = controlSlice.actions;

// Selectors for extracting data from Redux state
export const selectFilterStatus = (state: RootState) => state.controls.filterStatus;
export const selectSortType = (state: RootState) => state.controls.sortType;

export default controlSlice.reducer;
