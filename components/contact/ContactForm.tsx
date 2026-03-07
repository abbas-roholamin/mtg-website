'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  ContactFormType,
  getContactFormSchema,
} from '@/schemas/ContactFormSchema';
import { InputField } from '@/components/form/InputField';
import { TextAreaField } from '@/components/form/TextAreaField';

export default function ContactForm() {
  const f = useTranslations('form');
  const FormSchema = getContactFormSchema(f);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormType) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(f('too_many_requests'));
        } else {
          toast.error(f('submit_faild'));
        }
        return;
      }

      const result = await res.json();

      if (!result.success) {
        toast.error(f('submit_faild'));
        return;
      }

      toast.success(f('submit_success'));
      reset();
    } catch {
      toast.error(f('error_occured'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-describedby="contact-form"
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <InputField
          type="text"
          placeholder="Jane"
          name="first_name"
          label={f('first_name.label')}
          required
          errors={errors}
          control={control}
        />

        <InputField
          type="text"
          placeholder="Deo"
          name="last_name"
          label={f('last_name.label')}
          required
          errors={errors}
          control={control}
        />

        <InputField
          type="email"
          name="email"
          label={f('email.label')}
          placeholder="jane@example.com"
          required
          errors={errors}
          control={control}
        />

        <InputField
          type="text"
          name="phone"
          label={f('phone.label')}
          placeholder="+1 555 123 4567"
          required
          errors={errors}
          control={control}
        />
      </div>

      <TextAreaField
        label={f('message.label')}
        name="message"
        placeholder={f('message.placeholder')}
        required
        errors={errors}
        control={control}
      />

      <div className="flex items-center justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? f('processing') : f('btn')}
        </Button>
      </div>
    </form>
  );
}
