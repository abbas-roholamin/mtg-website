'use client';

import { useRef, useState } from 'react';
import { Minus, Plus, UploadIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Label from '../form/Label';
import Section from '../common/Section';
import ProductGallery from '../product/detail/ImageGallery';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { useCheckoutMutation } from '@/hooks/use-checkout-mutation';
import {
  Customization,
  ProductDetail as ProductDetailType,
  Variation,
  VariationWithCustomization,
} from '@/types/product';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CustomizationFormProps {
  product: ProductDetailType<VariationWithCustomization>;
}

export default function CustomizationForm({ product }: CustomizationFormProps) {
  const defaultVariation: VariationWithCustomization = product.variations[0];
  const [selectedVariation, setSelectedVariation] = useState(defaultVariation);
  const [quantity, setQuantity] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const [design, setDesign] = useState<string>('reqular');
  const [notes, setNotes] = useState<string>('');
  const [selectedCustomization, setSelectedCustomization] =
    useState<Customization>(selectedVariation.customizations[0]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('pages');
  const c = useTranslations('checkout');
  const { mutate, isPending } = useCheckoutMutation();

  const handleVariationChange = (variation: VariationWithCustomization) => {
    setSelectedVariation(variation);
    setQuantity(1);
  };

  const handleCustomizationChange = (id: string) => {
    const customization = selectedVariation.customizations.find(
      customization => customization.id === +id
    );
    if (customization) {
      setSelectedCustomization(customization);
    }
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

  const handleSubmit = () => {
    const unit_amount = selectedVariation.final_amount
      ? selectedVariation.final_amount + selectedCustomization.price
      : selectedVariation.price + selectedCustomization.price;

    const subtotal_amount =
      (selectedVariation.price + selectedCustomization.price) * quantity;
    const discount_amount = selectedVariation.final_amount
      ? (selectedVariation.price + selectedCustomization.price) * quantity -
        (selectedVariation.final_amount + selectedCustomization.price) *
          quantity
      : 0;

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
              customization_id: selectedCustomization.id,
              design: design,
            },
            quantity,
          },
        ],
        subtotal_amount,
        discount_amount,
        total_amount: subtotal_amount - discount_amount,
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
      <section className="mx-auto max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="textarea-message">
              {t('custom.form.design')}
            </FieldLabel>
            <Select value={design} onValueChange={setDesign}>
              <SelectTrigger>
                <SelectValue placeholder={t('custom.form.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="reqular">Regular</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          {/* Character */}
          <Field>
            <FieldLabel htmlFor="textarea-message">
              {t('custom.form.character_number')}
            </FieldLabel>
            <Select
              value={`${selectedCustomization.id}`}
              onValueChange={handleCustomizationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('custom.form.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedVariation.customizations.map(customization => (
                    <SelectItem
                      value={`${customization.id}`}
                      key={customization.id}
                    >
                      {customization.character_number} -{' '}
                      {customization.formatted_price}{' '}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

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
        <Field>
          <FieldLabel htmlFor="textarea-message">
            {t('custom.form.description')}
          </FieldLabel>
          <Textarea
            id="textarea-message"
            defaultValue={notes}
            onChange={e => {
              setNotes(e.target.value);
            }}
            placeholder={t('custom.form.write_description')}
          />
        </Field>

        {/* Summary */}
        <div className="bg-muted space-y-1 rounded-lg p-4 text-sm">
          <p>
            {t('custom.form.game_price')}:{' '}
            {selectedVariation.final_amount
              ? selectedVariation.final_formatted_amount
              : selectedVariation.formatted_price}
          </p>
          <p>
            {t('custom.form.customization')}:{' '}
            {selectedCustomization.formatted_price}
          </p>
          <p>
            {t('custom.form.count')}: {quantity}
          </p>

          <p className="text-lg font-semibold">
            {t('custom.form.total')}: €
            {(selectedVariation.final_amount
              ? selectedVariation.final_amount + selectedCustomization.price
              : selectedVariation.price + selectedCustomization.price) *
              quantity}
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
          onClick={handleSubmit}
          disabled={selectedVariation.stock === 0 || isPending}
          className="grow rounded-lg py-6 text-base font-semibold hover:cursor-pointer"
        >
          {t('product.details.product.cta.buy_now')}
        </Button>
      </section>
    </Section>
  );
}
