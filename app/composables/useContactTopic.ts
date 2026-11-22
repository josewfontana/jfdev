import type { ComputedRef, Ref } from 'vue'

export const CONTACT_TOPICS = ['project', 'evolution', 'consulting', 'undecided'] as const

export type ContactTopic = (typeof CONTACT_TOPICS)[number]

export const CONTACT_TOPIC_LABELS = {
  project: 'home.contact.topicProject',
  evolution: 'home.contact.topicEvolution',
  consulting: 'home.contact.topicConsulting',
  undecided: 'home.contact.topicUndecided',
} as const satisfies Record<ContactTopic, MessageKey>

type UseContactTopic = {
  /** Selected topic; `''` means none chosen yet (native <select> placeholder). */
  topic: Ref<ContactTopic | ''>
  whatsappHref: ComputedRef<string>
}

/**
 * Topic picked in the home contact brief. Shared state so engagement cards can preselect it.
 * Nothing is sent by the site: the topic only shapes the WhatsApp starter message.
 */
export function useContactTopic(): UseContactTopic {
  const { t } = useI18n()
  const topic = useState<ContactTopic | ''>('contact-topic', () => '')

  const whatsappHref = computed(() =>
    whatsappUrl(
      topic.value === ''
        ? t('home.contact.messageGeneric')
        : t('home.contact.messageTopic', { topic: t(CONTACT_TOPIC_LABELS[topic.value]) }),
    ),
  )

  return { topic, whatsappHref }
}
