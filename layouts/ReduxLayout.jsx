"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function ReduxLayout({ children }) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
