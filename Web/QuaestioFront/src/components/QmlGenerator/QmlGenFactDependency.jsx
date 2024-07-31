import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import {
  selectFactDependencies,
  selectRestFacts,
  updateFactDependency,
} from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenFactDependency({ factId, type = "partially" }) {
  const dispatch = useDispatch();
  const dependencies = useSelector((state) =>
    selectFactDependencies(state, factId, type)
  );
  const facts = useSelector((state) => selectRestFacts(state, factId));
  const handleSelectToggle = (itemId) => {
    dispatch(
      updateFactDependency({
        index: factId,
        value: itemId,
        type,
      })
    );
  };
  return (
    <SelectableCardList
      items={facts}
      selected={dependencies}
      onSelect={handleSelectToggle}
      itemPrefix="F"
    />
  );
}
