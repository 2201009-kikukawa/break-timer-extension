export const EVENT_TYPES = {
  showModal: {
    type: "showModal",
    text: "メッセージ"
  }
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];