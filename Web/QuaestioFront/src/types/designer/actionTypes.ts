export interface UpdateNodeTitlePayload {
  id: string;
  title: string;
}

export interface UpdateNodeGuidelinesPayload {
  id: string;
  guidelines: string;
}

export interface UpdateFactPropertiesPayload {
  id: string;
  mandatory?: boolean;
  default?: boolean;
}

export interface UpdateConstraintPayload {
  index: number;
  value: string;
}

export interface UpdateFileDetailsPayload {
  name: string;
  reference?: string;
  author?: string;
}
