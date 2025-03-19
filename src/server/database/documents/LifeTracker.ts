import { ObjectId } from 'mongodb';

export enum LifeCategory {
    Personal = 'Personal',
    Work = 'Work',
    Health = 'Health',
    Finance = 'Finance',
    Education = 'Education',
    Travel = 'Travel',
    Other = 'Other',
}

export enum LifeStatus {
    Planned = 'Planned',
    Ongoing = 'Ongoing',
    Completed = 'Completed',
    Canceled = 'Canceled',
}

export enum LifePriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export type LifeTracker = {
    _id: ObjectId;
    eventName: string;
    category: LifeCategory;
    date: Date;
    status: LifeStatus;
    priority: LifePriority;
    userId: ObjectId;
};
