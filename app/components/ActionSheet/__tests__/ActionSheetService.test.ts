import { GetClosestPanPosition } from '../ActionSheetService';

const acceptablePositions = [1, 5, 10] as number[];

describe('GetClosestPanPosition', () => {
    
    test('no acceptable positions, returns given', () => {
        expect(GetClosestPanPosition(1, undefined)).toBe(1);
    });

    test('number equal to acceptable position, returns number', () => {
        expect(GetClosestPanPosition(1, acceptablePositions)).toBe(1);
    });
    
    test('number slightly higher than an acceptable position, returns number', () => {
        expect(GetClosestPanPosition(2, acceptablePositions)).toBe(1);
    });

    test('number slightly lower than an acceptable position, returns acceptable position', () => {
        expect(GetClosestPanPosition(4, acceptablePositions)).toBe(5);
    });

    test('number higher than an highest position, returns highest', () => {
        expect(GetClosestPanPosition(15, acceptablePositions)).toBe(10);
    });
});