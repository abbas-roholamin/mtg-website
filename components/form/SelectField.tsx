import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import Label from './Label';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Option {
  label: string;
  value: string;
}

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  control: Control<T>;
  errors: FieldErrors;
  options: Option[];
}

export function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder = 'Select',
  required = false,
  control,
  errors,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={name} required={required}>
            {label}
          </Label>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              id={name}
              className="focus:ring-primary/50 h-14 w-full rounded-xl bg-neutral-100 px-4 text-sm font-medium focus:ring-2"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors[name] && (
            <p
              id={`${name}-error`}
              role="alert"
              className="text-xs text-red-600"
            >
              {errors[name]?.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
}
