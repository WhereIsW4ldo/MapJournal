export function GetClosestPanPosition(
    currentPosition: number,
    acceptablePositions: number[] | undefined
): number {
    if (!acceptablePositions || acceptablePositions.length == 0) return currentPosition;
    if (acceptablePositions.some(ap => currentPosition === ap)) return currentPosition;
    
    const difference = acceptablePositions
        .map(ap => Math.abs(ap - currentPosition));
    
    const minDifference = Math.min(...difference);
    const smallestDifference = difference.indexOf(minDifference);
    
    // console.log(`action sheet let go at ${currentPosition}, putting to ${acceptablePositions[smallestDifference]}`);
    
    return acceptablePositions[smallestDifference];
}