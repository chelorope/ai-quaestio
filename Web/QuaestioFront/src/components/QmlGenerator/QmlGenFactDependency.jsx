import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import { updateFactDependency } from "@/redux/qmlGeneratorSlice";

export default function QmlGenFactDependency({ factId, type = "partially" }) {
  const dispatch = useDispatch();
  const dependencies = useSelector((state) =>
    type === "partially"
      ? state.qmlGenerator.facts[factId].partiallyDepends
      : state.qmlGenerator.facts[factId].fullyDepends
  );
  const facts = useSelector((state) =>
    state.qmlGenerator.facts.filter((_, index) => index < factId)
  );
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
      onSelectToggle={handleSelectToggle}
      itemPrefix="F"
    />
  );
}
