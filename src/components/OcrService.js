import { post } from './BaseService'; // Adjust path as needed

export default class OcrService {
  constructor(creds) {
    this.creds = creds;
  }

  async CallOcr(frontImage = '', backImage = '', type = IdType.LICENSE, region = 'united states') {
    const body = {
      front: frontImage.replace(/[\r\n]+/gm, ''),
      back: backImage !== '' ? backImage.replace(/[\r\n]+/gm, '') : '',
      region: region,
    };

    let documentType;
    switch (type) {
      case IdType.LICENSE:
      case IdType.PASSPORT:
        documentType = type;
        break;
      default:
        documentType = IdType.LICENSE;
    }

    let payload = {};
    payload[documentType] = body;

    const raw = {
      user: this.creds.user,
      pass: this.creds.key,
      service: this.creds.service,
      target: payload,
      age: '21+',
    };

    // Updated line: Call the Netlify Function
    let ocrResponse = await post('/.netlify/functions/ocr-proxy', raw, { redacted: [documentType] }, true);
    return ocrResponse;
  }
}

export const IdType = {
  LICENSE: 'license',
  PASSPORT: 'passport',
};