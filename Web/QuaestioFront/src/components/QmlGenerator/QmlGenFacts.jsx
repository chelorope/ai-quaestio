import { useDispatch, useSelector } from "react-redux";
import EditableList from "./EditableList";
import {
  addFact,
  removeFact,
  selectFacts,
  setSelectedFact,
  updateFactDescription,
} from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenFacts() {
  const dispatch = useDispatch();
  const facts = useSelector(selectFacts);
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

  const handleItemRemove = (index) => {
    dispatch(removeFact(index));
  };

  return (
    <EditableList
      items={facts}
      itemPrefix="F"
      selected={selectedFact}
      onItemChange={handleItemChange}
      onItemSelect={handleItemSelect}
      onItemAdd={handleItemAdd}
      onItemRemove={handleItemRemove}
    />
  );
}
