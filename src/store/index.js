import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/name.Trainer.slice";

export default configureStore({
  reducer: {
    nameTrainer
  }
})