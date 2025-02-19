import {
  selectFact,
  updateFactTitle,
  updateFactGuidelines,
  updateFactDefault,
  updateFactMandatory,
} from "@/redux/slices/flowSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DetailsDrawer from "./DetailsDrawer";

export default function FactDetailsDrawer({ factId }: { factId?: string }) {
  const dispatch = useAppDispatch();
  const fact = useAppSelector(selectFact(factId));

  const handleTitleChange = (value) => {
    dispatch(updateFactTitle({ title: value, id: factId }));
  };

  const handleGuidelinesChange = (value) => {
    dispatch(
      updateFactGuidelines({
        guidelines: value,
        id: factId,
      })
    );
  };

  const handleDefaultChange = (value) => {
    dispatch(updateFactDefault({ id: factId, default: value }));
  };

  const handleMandatoryChange = (value) => {
    dispatch(updateFactMandatory({ id: factId, mandatory: value }));
  };

  return (
    <DetailsDrawer
      title={fact?.data?.title}
      onTitleChange={handleTitleChange}
      guidelines={fact?.data?.guidelines}
      onGuidelinesChange={handleGuidelinesChange}
      isDefault={fact?.data?.default}
      onDefaultChange={handleDefaultChange}
      isMandatory={fact?.data?.mandatory}
      onMandatoryChange={handleMandatoryChange}
    />
  );
}
