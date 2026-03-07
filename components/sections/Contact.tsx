'use client';
import { useTranslations } from 'next-intl';
import { Clock10Icon, MailIcon, PhoneIcon } from 'lucide-react';
import ContactForm from '../contact/ContactForm';
import { useSetting } from '@/providers/SettingProvider';

export default function Contact() {
  const setting = useSetting();
  const t = useTranslations('sections');
  return (
    <section>
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-primary font-quick-sand mb-4 text-4xl font-bold md:text-5xl lg:mb-9 lg:text-7xl">
              {t('contact.title')}
            </h2>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Clock10Icon className="size-5" />
                <p className="font-semibold md:font-bold">
                  {t('contact.working_hours.label')}
                </p>
              </div>
              <ul>
                {setting.working_hours.map(work => (
                  <li key={work.day}>
                    <span className="font-semibold">
                      {t(`contact.working_hours.${work.day}`)}:
                    </span>{' '}
                    <span className="text-neutral-700">{work.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div>
              <div className="mb-2 flex items-center gap-3">
                <PhoneIcon className="size-5" />
                <p className="font-semibold md:font-bold">
                  {t('contact.write_to_us')}
                </p>
              </div>
              <a
                href={`tel:${setting.phone}`}
                target="_blank"
                rel="noreferrer"
                className="font-normal text-neutral-700 hover:underline"
              >
                {setting.phone}
              </a>
            </div> */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <MailIcon className="size-5" />
                <p className="font-semibold md:font-bold">
                  {t('contact.write_to_us')}
                </p>
              </div>
              <a
                href={`mailto:${setting.email}`}
                target="_blank"
                rel="noreferrer"
                className="font-normal text-neutral-700 hover:underline"
              >
                {setting.email}
              </a>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
