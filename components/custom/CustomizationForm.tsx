'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Minus, Plus, UploadIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { SelectField } from '../form/SelectField';
import { TextAreaField } from '../form/TextAreaField';
import Label from '../form/Label';
import Section from '../common/Section';
import ProductGallery from '../product/detail/ImageGallery';
import { Badge } from '../ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field, FieldGroup, FieldDescription } from '@/components/ui/field';
import {
  CustomizationFormType,
  getCustomizationFormSchema,
} from '@/schemas/customization-schema';
import { useCheckoutMutation } from '@/hooks/use-checkout-mutation';
import { ProductDetail as ProductDetailType, Variation } from '@/types/product';

interface CustomizationFormProps {
  product: ProductDetailType;
}

export default function CustomizationForm({ product }: CustomizationFormProps) {
  const defaultVariation: Variation = product.variations[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);
  const [quantity, setQuantity] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('pages');
  const c = useTranslations('checkout');
  const FormSchema = getCustomizationFormSchema(t);
  const { mutate, isPending } = useCheckoutMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomizationFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      design: 'regular',
      note: '',
    },
  });

  const handleVariationChange = (variation: Variation) => {
    setSelectedVariation(variation);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < selectedVariation.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: CustomizationFormType) => {
    const unit_amount = selectedVariation.final_amount
      ? selectedVariation.final_amount
      : selectedVariation.price;

    const subtotal_amount = selectedVariation.price * quantity;
    const discount_amount = selectedVariation.final_amount
      ? selectedVariation.price * quantity -
        selectedVariation.final_amount * quantity
      : 0;
    const notes = data.note ? data.note : '';

    mutate(
      {
        items: [
          {
            price_data: {
              product_data: {
                name: product.name,
                images: [selectedVariation.thumbnail],
              },
              currency: 'eur',
              unit_amount,
            },
            metadata: {
              product_id: product.id,
              product_variation_id: selectedVariation.id,
            },
            quantity,
          },
        ],
        subtotal_amount,
        discount_amount,
        total_amount: subtotal_amount - discount_amount,
        customization_price: 0,
        notes: notes,
      },
      {
        onSuccess: ({ data }) => {
          window.location.href = data.checkout_url;
        },
        onError: () => {
          toast.error(c('error'));
        },
      }
    );
  };

  return (
    <Section>
      <div className="mb-10 space-y-8 lg:space-y-12">
        <h1 className="text-foreground hidden text-3xl font-bold sm:text-4xl lg:block lg:text-5xl">
          {product.name}
        </h1>
        <ProductGallery images={selectedVariation.images} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          {/* Variations */}
          <div className="space-y-3">
            <label className="text-foreground mb-3 block text-sm font-bold">
              {t('product.details.product.variations')}
            </label>
            <ul className="flex flex-wrap gap-3">
              {product.variations.map(variant => {
                const color = variant.attributes.find(
                  a => a.attribute === 'color'
                );
                const size = variant.attributes.find(
                  a => a.attribute === 'size'
                );
                if (!color) return size ? `(${size.label})` : '';

                return (
                  <li key={variant.id}>
                    <button onClick={() => handleVariationChange(variant)}>
                      <span
                        className="bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded border border-transparent px-2 py-2 text-sm font-medium whitespace-nowrap hover:cursor-pointer"
                        style={{
                          borderColor:
                            selectedVariation.id === variant.id
                              ? color.value
                              : '',
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: color.value }}
                          ></span>
                          {color.label}
                        </span>
                        {size ? ` (${size.label})` : ''}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Attributes */}
          {Object.keys(product.attributes).length > 0 && (
            <div className="relative mt-6 h-max w-full">
              <label className="text-foreground mb-3 block text-sm font-bold">
                {t('product.details.product.attributes')}
              </label>
              <ul className="text-sm leading-6">
                {Object.entries(product.attributes)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <li key={key}>
                      <Badge variant="secondary">{value}</Badge>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4 space-y-3">
          <label className="text-foreground mb-3 block text-sm font-bold">
            {t('product.details.product.quantity')}
          </label>
          <div className="flex w-fit items-center gap-2">
            <button
              onClick={decrementQuantity}
              disabled={quantity === 1}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors hover:cursor-pointer disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[48px] text-center text-sm font-semibold">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= selectedVariation.stock}
              className="border-border hover:bg-muted rounded-md border p-2 transition-colors hover:cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6"
      >
        <FieldGroup>
          {/* Design */}
          <SelectField
            name="design"
            label={t('custom.form.design')}
            placeholder={t('custom.form.select')}
            required
            control={control}
            errors={errors}
            options={[
              { label: 'Regular', value: 'reqular' },
              { label: 'Fantasy', value: 'fantasy' },
            ]}
          />

          {/* Upload */}
          <Field>
            <Label>{t('custom.form.images')}</Label>

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

                <p className="text-sm font-medium">
                  {t('custom.form.upload_image')}
                </p>
              </button>

              <FieldDescription>{t('custom.form.rule')}</FieldDescription>
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

          {/* Description */}
          <TextAreaField
            label={t('custom.form.description')}
            name="note"
            placeholder={t('custom.form.write_description')}
            required
            errors={errors}
            control={control}
          />
        </FieldGroup>

        {/* Summary */}
        <div className="bg-muted space-y-1 rounded-lg p-4 text-sm">
          <p>
            {t('custom.form.game_price')}: {selectedVariation.formatted_price}
          </p>
          <p>
            {t('custom.form.customization')}:{' '}
            {selectedVariation.formatted_customization_price}
          </p>
          <p>
            {t('custom.form.count')}: {quantity}
          </p>
          <p className="text-lg font-semibold">
            {t('custom.form.total')}: €{selectedVariation.price * quantity}
          </p>
        </div>

        {/* Warranty */}
        <div className="bg-muted text-muted-foreground rounded-lg p-4 text-sm">
          <h3 className="text-foreground mb-1 text-lg font-semibold">
            {t('custom.form.warranty')}
          </h3>
          <p>{t('custom.form.warranty_description1')}</p>
          <p>{t('custom.form.warranty_description2')}</p>
        </div>

        <Button
          type="submit"
          disabled={selectedVariation.stock === 0 || isPending}
          className="grow rounded-lg py-6 text-base font-semibold hover:cursor-pointer"
        >
          {t('product.details.product.cta.buy_now')}
        </Button>
      </form>
    </Section>
  );
}
