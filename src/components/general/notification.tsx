import { notification } from 'antd';

notification.config({
    duration: 2.5,
    maxCount: 3,
    placement: "topLeft"
});

export const showNotification = (type: string, message: string, description: string, style: any) => {
    switch (type) {
        case "error": notification.error({ message, description, style }); break;
        case "info": notification.info({ message, description, style }); break;
        case "success": notification.success({ message, description, style }); break;
        case "warning": notification.warning({ message, description, style }); break;
    }
};