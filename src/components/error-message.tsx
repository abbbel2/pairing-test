import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";
import { FC } from "react";

type ErrorMessageProps = {
    title: string,
    message: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ title, message }) => {
  return (
    <Alert variant="destructive">
      <FileWarning className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};
