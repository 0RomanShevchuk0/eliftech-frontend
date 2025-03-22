import React from "react"
import { FieldError, FieldErrors } from "react-hook-form"

interface RenderErrorsProps {
  errors: FieldError | FieldErrors | null | undefined
}

const FormErrors: React.FC<RenderErrorsProps> = ({ errors }) => {
  if (!errors) return null

  if (Array.isArray(errors)) {
    return (
      <>
        {errors.map((error, index) => (
          <FormErrors key={index} errors={error} />
        ))}
      </>
    )
  }

  if (errors.message) {
    return <p className="text-red-500">{errors.message as any}</p>
  }

  if (typeof errors === "object") {
    return (
      <>
        {Object.entries(errors).map(([key, error]) => (
          <div key={key}>
            {typeof error === "object" && "message" in error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <FormErrors errors={error as FieldErrors} />
            )}
          </div>
        ))}
      </>
    )
  }

  return null
}

export default FormErrors
