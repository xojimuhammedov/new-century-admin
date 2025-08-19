import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const Notification = (
  type: NotificationType,
  message: string,
  description?: string
) => {
  notification[type]({
    message,
    description,
    duration: 2,
    showProgress: true,
  });
};
