export interface LabelItem {
  label: string;
  type?: string;
}

export interface AuthFormProps {
  labelArr: LabelItem[];
  titleObj: {
    title: string;
  };
}
