export enum EventTypes {
  showModal = 'showModal'
};

export type EventListenerProps = {
  type: EventTypes;
  text: string;
};