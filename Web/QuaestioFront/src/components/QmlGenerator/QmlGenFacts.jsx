import { useDispatch, useSelector } from "react-redux";
import EditableList from "./EditableList";
import {
  addFact,
  setSelectedFact,
  setSelectedQuestion,
  updateFactDescription,
} from "@/redux/qmlGeneratorSlice";

export default function QmlGenFacts() {
  const dispatch = useDispatch();
  const facts = useSelector((state) =>
    state.qmlGenerator.facts.map((fact) => fact.description)
  );
  const selectedFact = useSelector((state) => state.qmlGenerator.selectedFact);

  const handleItemChange = (value, index) => {
    dispatch(updateFactDescription({ value, index }));
  };

  const handleItemSelect = (index) => {
    dispatch(setSelectedFact(index));
  };

  const handleItemAdd = () => {
    dispatch(addFact());
  };

  return (
    <EditableList
      items={facts}
      itemPrefix="F"
      selected={selectedFact}
      onItemChange={handleItemChange}
      onItemSelect={handleItemSelect}
      onItemAdd={handleItemAdd}
    />
  );
}