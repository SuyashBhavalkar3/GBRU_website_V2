export interface WarrantyDetails {
  warrantyId: string;
  product: string;
  expiry: string;
}

export const MOCK_WARRANTY_DATA: WarrantyDetails = {
  warrantyId: 'GBRU-772910',
  product: 'Seeder Pro X',
  expiry: '12 Oct 2027',
};
