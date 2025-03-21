import clsx from "clsx"
import { FC } from "react"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"

interface FormFieldProps {
  label: string
  type: "text" | "password" | "email" | "date" | "color" | "file"
  register: UseFormRegisterReturn
  error?: FieldError
  acceptFileTypes?: string[]
}

const FormField: FC<FormFieldProps> = ({ label, type, error, register, acceptFileTypes }) => (
  <div className="flex flex-col items-start gap-1">
    <label className="text-gray-700 mb-1">{label}</label>
    <input
      className={clsx(
        "border-1 border-gray-800 px-0 focus:border-black outline-none w-full",
        error && "border-red-500"
      )}
      type={type}
      accept={type === "file" ? acceptFileTypes?.join(", ") : undefined}
      {...register}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
)

export default FormField
