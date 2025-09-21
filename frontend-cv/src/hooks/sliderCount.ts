
import { CounterAction, CounterState, CounterActionTypes } from '../types';

function reducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
      case CounterActionTypes.NEXTSLIDER: {
        if (state.sliderCount < state.maxSliders - 1) {
          return {
            sliderCount: state.sliderCount + 1,
            maxSliders: state.maxSliders
          };
        }
        return {
          sliderCount: 0,
          maxSliders: state.maxSliders
        };
      }
      case CounterActionTypes.PREVIOUSSLIDER: {
        if (state.sliderCount > 0) {
          return {
            sliderCount: state.sliderCount - 1,
            maxSliders: state.maxSliders
          };
        }
        return {
          sliderCount: state.maxSliders - 1,
          maxSliders: state.maxSliders
        };
      }
      case CounterActionTypes.SETSLIDER: {
        if (action.payload.sliderCount >= 0 && action.payload.sliderCount < state.maxSliders) {
          return {
            sliderCount: action.payload.sliderCount,
            maxSliders: state.maxSliders
          };
        }
        return {
          sliderCount: 0,
          maxSliders: state.maxSliders
        };
      }
      default:
        throw Error('Unknown action: ' + action);
    }
  }

export default reducer