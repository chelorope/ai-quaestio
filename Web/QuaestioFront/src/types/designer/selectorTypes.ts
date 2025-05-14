import { DesignerState } from "./Designer";

export type DesignerSelector<T> = (state: { designer: DesignerState }) => T;
