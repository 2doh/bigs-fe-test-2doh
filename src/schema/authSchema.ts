import { z } from "zod";

export const authBaseSchema = z.object({
  mail: z
    .string()
    .email("이메일 형식이 아닙니다.")
    .nonempty("이메일을 입력해주세요."),
  pass: z
    .string()
    .min(8, "비밀번호는 최소 8글자 입니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/,
      "비밀번호는 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    )
    .nonempty("비밀번호를 입력해주세요."),
});

export const signupSchema = authBaseSchema
  .extend({
    userName: z.string().nonempty("이름 혹은 닉네임을 입력해주세요."),
    confirmPass: z.string().nonempty("비밀번호 확인을 입력해주세요."),
  })
  .refine(data => data.pass === data.confirmPass, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPass"],
  });

export type SigninFormData = z.infer<typeof authBaseSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
