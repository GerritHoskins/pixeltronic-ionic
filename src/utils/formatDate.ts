import { useDateFormat } from '@vueuse/core';

export const formatDate = (date: Date) => {
  return useDateFormat(date, 'MMM d, yyyy');
};
