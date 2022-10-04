/**
 * Determines if the provided image is within the viewport
 *
 * @returns True if image needs to be resized to fit viewport, otherwise false
 */
declare const imageIsOutOfBounds: (imageRef: React.RefObject<HTMLImageElement>) => boolean;
export default imageIsOutOfBounds;
