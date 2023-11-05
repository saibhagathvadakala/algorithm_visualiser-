/**
 * Returns an empty promise with a timeout value to shorten/lengthen the speed
 */
const timeout = async (speed: number): Promise<void> => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, 350/speed);
    });
}

export default timeout;