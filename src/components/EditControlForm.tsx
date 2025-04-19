import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const controlSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  controlFamily: z.string().min(1, { message: "Control family is required" }),
  controlType: z.string().min(1, { message: "Control type is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  statement: z.string().min(1, { message: "Statement is required" }),
  monitorID: z.string().optional(),
  recommendation: z.string().min(1, { message: "Recommendation is required" }),
  THR_code: z.string().min(1, { message: "THR code is required" }),
  comments: z.string().optional(),
});

type ControlFormValues = z.infer<typeof controlSchema>;

interface EditControlFormProps {
  control?: ControlFormValues;
  onSave?: (control: ControlFormValues) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const defaultControl: ControlFormValues = {
  id: "",
  controlFamily: "",
  controlType: "",
  description: "",
  statement: "",
  monitorID: "",
  recommendation: "",
  THR_code: "",
  comments: "",
};

const EditControlForm: React.FC<EditControlFormProps> = ({
  control = defaultControl,
  onSave = () => {},
  onCancel = () => {},
  isOpen = true,
}) => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ControlFormValues>({
    resolver: zodResolver(controlSchema),
    defaultValues: control,
  });

  const onSubmit = async (data: ControlFormValues) => {
    try {
      setError(null);
      onSave(data);
      reset(data);
    } catch (err) {
      setError("Failed to save control. Please try again.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    reset(control);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <Card className="w-full bg-white shadow-lg border-t-4 border-t-blue-600">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl text-gray-800">
          {control.id ? `Edit Control: ${control.id}` : "Add New Control"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {error && (
            <Alert variant="destructive" className="col-span-1 md:col-span-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="id" className={errors.id ? "text-destructive" : ""}>
              ID
            </Label>
            <Input
              id="id"
              {...register("id")}
              className={errors.id ? "border-destructive" : ""}
            />
            {errors.id && (
              <p className="text-xs text-destructive">{errors.id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="controlFamily"
              className={errors.controlFamily ? "text-destructive" : ""}
            >
              Control Family
            </Label>
            <Input
              id="controlFamily"
              {...register("controlFamily")}
              className={errors.controlFamily ? "border-destructive" : ""}
            />
            {errors.controlFamily && (
              <p className="text-xs text-destructive">
                {errors.controlFamily.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="controlType"
              className={errors.controlType ? "text-destructive" : ""}
            >
              Control Type
            </Label>
            <Input
              id="controlType"
              {...register("controlType")}
              className={errors.controlType ? "border-destructive" : ""}
            />
            {errors.controlType && (
              <p className="text-xs text-destructive">
                {errors.controlType.message}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label
              htmlFor="THR_code"
              className={errors.THR_code ? "text-destructive" : ""}
            >
              THR Code (YAML)
            </Label>
            <Textarea
              id="THR_code"
              {...register("THR_code")}
              rows={8}
              className={`font-mono text-sm ${errors.THR_code ? "border-destructive" : ""}`}
              placeholder="Enter YAML code for Ansible automation"
            />
            {errors.THR_code && (
              <p className="text-xs text-destructive">
                {errors.THR_code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="monitorID"
              className={errors.monitorID ? "text-destructive" : ""}
            >
              Monitor ID
            </Label>
            <Input
              id="monitorID"
              {...register("monitorID")}
              className={errors.monitorID ? "border-destructive" : ""}
            />
            {errors.monitorID && (
              <p className="text-xs text-destructive">
                {errors.monitorID.message}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label
              htmlFor="description"
              className={errors.description ? "text-destructive" : ""}
            >
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label
              htmlFor="statement"
              className={errors.statement ? "text-destructive" : ""}
            >
              Statement
            </Label>
            <Textarea
              id="statement"
              {...register("statement")}
              rows={4}
              className={errors.statement ? "border-destructive" : ""}
            />
            {errors.statement && (
              <p className="text-xs text-destructive">
                {errors.statement.message}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label
              htmlFor="recommendation"
              className={errors.recommendation ? "text-destructive" : ""}
            >
              Recommendation
            </Label>
            <Textarea
              id="recommendation"
              {...register("recommendation")}
              rows={4}
              className={errors.recommendation ? "border-destructive" : ""}
            />
            {errors.recommendation && (
              <p className="text-xs text-destructive">
                {errors.recommendation.message}
              </p>
            )}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label
              htmlFor="comments"
              className={errors.comments ? "text-destructive" : ""}
            >
              Comments
            </Label>
            <Textarea
              id="comments"
              {...register("comments")}
              rows={3}
              className={errors.comments ? "border-destructive" : ""}
            />
            {errors.comments && (
              <p className="text-xs text-destructive">
                {errors.comments.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-4 bg-gray-50 border-t p-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600"
          >
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditControlForm;
