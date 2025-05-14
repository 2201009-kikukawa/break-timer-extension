export enum EventTypes {
  init = 'init',
  showModal = 'showModal',
  startTimer = 'startTimer',
  pauseTimer = 'pauseTimer',
  restartTimer = 'restartTimer',
  clearTimer = 'clearTimer'
};

export type EventListenerProps = {
  type: EventTypes;
  text: string;
};