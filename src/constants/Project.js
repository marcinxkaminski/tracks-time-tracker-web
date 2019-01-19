import { TimeConverter } from '../utils/TimeConverter';
import { DataManager } from '../utils/DataManager';

export const InitialProject = {
    get() {
        const userDetails = DataManager.getUserDetails();
        if (userDetails) {
            return {
                'deadline': TimeConverter.getTodaysDateWithoutTime(),
                'createdAt': TimeConverter.getTodaysDateWithoutTime(),
                'updatedAt': TimeConverter.getTodaysDateWithoutTime(),
                'id': -1,
                'name': '',
                'description': '',
                'for': '',
                'pricePerHour': userDetails.defaultPricePerHour,
                'timeSpent': 0,
                'tasks': [],
            }
        }
    }
}