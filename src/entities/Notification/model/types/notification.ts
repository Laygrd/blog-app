export interface Notification {
    id: string;
    userId: string;
    isChecked: boolean;
    title: string;
    description: string;
    href?: string;
};
