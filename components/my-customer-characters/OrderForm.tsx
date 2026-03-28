'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { MinusIcon, PlusIcon, UploadIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SelectField } from '../form/SelectField';
import { TextAreaField } from '../form/TextAreaField';
import Label from '../form/Label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field, FieldGroup, FieldDescription } from '@/components/ui/field';

const schema = z.object({
  bagColor: z.string().min(1, 'Select a color'),
  design: z.string().min(1, 'Select a design'),
  count: z.number().min(1),
  characterStyle: z.string().optional(),
  description: z.string().optional(),
  images: z.any().optional(),
});

type FormType = z.infer<typeof schema>;

export default function OrderForm() {
  const [count, setCount] = useState(12);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('custom_characters');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      bagColor: '',
      design: '',
      count: 1,
      characterStyle: '',
      description: '',
    },
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const total = 39 + 29;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6"
    >
      <FieldGroup>
        {/* Bag color */}
        <SelectField
          name="bagColor"
          label={t('form.bag_color')}
          placeholder={t('form.select')}
          required
          control={control}
          errors={errors}
          options={[
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
          ]}
        />

        {/* Design */}
        <SelectField
          name="design"
          label={t('form.design')}
          placeholder={t('form.select')}
          required
          control={control}
          errors={errors}
          options={[
            { label: 'Design 1', value: 'design1' },
            { label: 'Design 2', value: 'design2' },
          ]}
        />

        {/* Count */}
        <Field>
          <Label>{t('form.count')}</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => {
                const val = Math.max(1, count - 1);
                setCount(val);
                setValue('count', val);
              }}
            >
              <MinusIcon className="size-4" />
            </Button>

            <span className="text-lg font-semibold">{count}</span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                const val = count + 1;
                setCount(val);
                setValue('count', val);
              }}
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </Field>

        {/* Upload */}
        <Field>
          <Label>{t('form.images')}</Label>

          <div className="bg-muted/40 space-y-2 rounded-lg border p-6 text-center">
            {/* Hidden input */}
            <Input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              onChange={e => handleImageUpload(e.target.files)}
            />

            {/* Custom Upload Button */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full cursor-pointer flex-col items-center justify-center gap-2"
            >
              <div className="bg-background rounded-full border p-3">
                <UploadIcon className="h-5 w-5" />
              </div>

              <p className="text-sm font-medium">{t('form.upload_image')}</p>
            </button>

            <FieldDescription>{t('form.rule')}</FieldDescription>
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 w-20 overflow-hidden rounded-md border"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        {/* Character Style */}
        <SelectField
          name="characterStyle"
          label={t('form.character_style')}
          placeholder={t('form.select')}
          required
          control={control}
          errors={errors}
          options={[
            { label: 'char1', value: 'char1' },
            { label: 'char2', value: 'char2' },
          ]}
        />

        {/* Description */}
        <TextAreaField
          label={t('form.description')}
          name="description"
          placeholder={t('form.write_description')}
          required
          errors={errors}
          control={control}
        />
      </FieldGroup>

      {/* Summary */}
      <div className="bg-muted space-y-1 rounded-lg p-4 text-sm">
        <p>{t('form.game_price')}: €39</p>
        <p>{t('form.customization')}: €29</p>
        <p>
          {t('form.count')}: {count}
        </p>
        <p className="text-lg font-semibold">
          {t('form.total')}: €{total}
        </p>
      </div>

      {/* Warranty */}
      <div className="bg-muted text-muted-foreground rounded-lg p-4 text-sm">
        <h3 className="text-foreground mb-1 text-lg font-semibold">
          {t('form.warranty')}
        </h3>
        <p>{t('form.warranty_description1')}</p>
        <p>{t('form.warranty_description2')}</p>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">{t('form.btn')}</Button>
      </div>
    </form>
  );
}
