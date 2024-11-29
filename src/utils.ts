import RNQRGenerator from 'rn-qr-generator';
import { promises as fs } from 'fs';

export async function decodeQRCodeFromFile(filePath: string): Promise<string> {
  try {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString('base64');

    const detectedQRCodes = await RNQRGenerator.detect({
      base64: base64Image,
    });

    const { values } = detectedQRCodes;

    if (values.length === 0 || values[0] === undefined) {
      throw new Error('[decodeQRCodeFromFile]: QR Code value is undefined or empty');
    }

    return values[0];
  } catch (error) {
    console.error(`[decodeQRCodeFromFile]: Error decoding QR Code from file`);
    throw error;
  }
}

export function extractDateAndTimeComponents(date: string, time: string) {
  const [year, month, day] = date.split('-').map((part) => parseInt(part, 10));

  const timeParts = time.split(' ');
  const [hour, minute] = timeParts[0].split(':').map((part) => parseInt(part, 10));
  const period = timeParts[1];

  return {
    year,
    month,
    day,
    hour,
    minute,
    period,
  };
}

export function stringToBytes(input: string): number[] {
  const encoder = new TextEncoder();
  return Array.from(encoder.encode(input));
}

export function encodePeriod(period: string): number {
  if (period === "AM") {
    return 1;
  } else if (period === "PM") {
    return 0;
  } else {
    throw new Error("Invalid period: Expected 'AM' or 'PM'");
  }
}