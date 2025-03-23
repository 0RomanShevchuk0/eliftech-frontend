import clsx from "clsx"
import { FC } from "react"
import { UseFormRegisterReturn, FieldError } from "react-hook-form"

interface FormFieldProps {
  label: string
  type: "text" | "password" | "email" | "date" | "color"
  register: UseFormRegisterReturn
  error?: FieldError
}

const FormField: FC<FormFieldProps> = ({ label, type, error, register }) => {
  const baseClasses = "border-1 border-gray-800 px-2 py-1 focus:border-black outline-none w-full"
  const errorClasses = error ? "border-red-500" : ""

  return (
    <div className={clsx("flex flex-col items-start gap-1 w-full")}>
      <label className="text-gray-700 mb-1">{label}</label>

      <input className={clsx(baseClasses, errorClasses)} type={type} {...register} />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default FormField
