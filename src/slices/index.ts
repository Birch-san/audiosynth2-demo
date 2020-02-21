import { combineReducers } from "@reduxjs/toolkit";
import {keyboardReducer} from "./keyboard.slice";

export const rootReducer = combineReducers({
  keyboard: keyboardReducer
});
