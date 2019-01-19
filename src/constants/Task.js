import { TimeConverter } from '../utils/TimeConverter';
import { DataManager } from '../utils/DataManager';

export const InitialTask = {
    get() {
        const userDetails = DataManager.getUserDetails();
        if (userDetails) {
            return {
                'deadline': TimeConverter.getTodaysDateWithoutTime(),
                'createdAt': TimeConverter.getTodaysDateWithoutTime(),
                'updatedAt': TimeConverter.getTodaysDateWithoutTime(),
                'id': -1,
                'projectId': null,
                'name': '',
                'description': '',
                'for': '',
                'state': '',
                'pricePerHour': 0,
                'timeSpent': 0,
                'working': [],
            }
        }
    }
}