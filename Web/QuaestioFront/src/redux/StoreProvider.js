"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function StoreProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Component = useMemo(
    () => (isClient ? PersistGate : Fragment),
    [isClient]
  );
  const props = useMemo(
    () => (isClient ? { loading: null, persistor } : {}),
    [isClient]
  );

  return (
    <Provider store={store}>
      <Component {...props}>{children}</Component>
    </Provider>
  );
}
