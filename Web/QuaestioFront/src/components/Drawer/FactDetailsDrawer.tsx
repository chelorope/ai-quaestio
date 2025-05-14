import {
  selectFact,
  updateFactTitle,
  updateFactGuidelines,
  updateFactDefault,
  updateFactMandatory,
} from "@/redux/slices/designerSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import DetailsDrawer from "./DetailsDrawer";

export default function FactDetailsDrawer({ factId }: { factId: string }) {
  const dispatch = useDispatch();
  const fact = useAppSelector(selectFact(factId));

  const handleTitleChange = (value: string) => {
    dispatch(updateFactTitle({ title: value, id: factId }));
  };

  const handleGuidelinesChange = (value: string) => {
    dispatch(updateFactGuidelines({ guidelines: value, id: factId }));
  };

  const handleDefaultChange = (value: boolean) => {
    dispatch(updateFactDefault({ default: value, id: factId }));
  };

  const handleMandatoryChange = (value: boolean) => {
    dispatch(updateFactMandatory({ mandatory: value, id: factId }));
  };

  return (
    <DetailsDrawer
      id={factId}
      title={fact?.data?.title || ""}
      guidelines={fact?.data?.guidelines || ""}
      isDefault={fact?.data?.default}
      isMandatory={fact?.data?.mandatory}
      onTitleChange={handleTitleChange}
      onGuidelinesChange={handleGuidelinesChange}
      onDefaultChange={handleDefaultChange}
      onMandatoryChange={handleMandatoryChange}
    />
  );
}
