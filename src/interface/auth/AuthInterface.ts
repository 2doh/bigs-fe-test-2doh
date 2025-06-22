import { SigninFormData, SignupFormData } from "../../schema/authSchema";

type FormSignupKeys = keyof SignupFormData;
type FormSigninKeys = keyof SigninFormData;

export interface LabelItem {
  label: string;
  type: string;
  name: FormSigninKeys;
}

export interface SignupLabelItem {
  label: string;
  type: string;
  name: FormSignupKeys;
}

export interface AuthFormProps {
  labelArr: LabelItem[];
  titleObj: {
    title: string;
  };
}

export interface AuthSignupFormProps {
  labelArr: SignupLabelItem[];
  titleObj: {
    title: string;
  };
}
