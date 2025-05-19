import { DesignerState } from "./DesignerTypes";

export type DesignerSelector<T> = (state: { designer: DesignerState }) => T;
