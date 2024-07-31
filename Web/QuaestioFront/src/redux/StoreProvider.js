"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makePersistor, makeStore } from "@/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function StoreProvider({ children }) {
  const [isClient, setIsClient] = useState(false);
  const storeRef = useRef();
  const persistorRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = makePersistor(storeRef.current);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Component = useMemo(() => (isClient ? PersistGate : Fragment));
  const props = useMemo(() =>
    isClient ? { loading: null, persistor: persistorRef.current } : {}
  );

  return (
    <Provider store={storeRef.current}>
      <Component {...props}>{children}</Component>
    </Provider>
  );
}
