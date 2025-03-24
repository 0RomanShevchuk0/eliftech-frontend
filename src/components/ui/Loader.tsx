import { Loader } from "lucide-react"
import { FC } from "react"

const SpinLoader: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  )
}

export default SpinLoader
