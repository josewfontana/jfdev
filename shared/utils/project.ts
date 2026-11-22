/** Portfolio categories (projects page filters). Single source for the content schema and the UI. */
export const PROJECT_CATEGORIES = ['product', 'open-source', 'experience'] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

/** Brand color of the project card artwork (authorized brand colors only). */
export const PROJECT_TONES = ['teal', 'terracotta', 'charcoal'] as const

export type ProjectTone = (typeof PROJECT_TONES)[number]
