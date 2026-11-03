export type Language = 'en' | 'es';

export type VehicleCategory = 'all' | 'suv' | 'sedan' | 'truck' | 'hybrid';

export interface Vehicle {
  id: string;
  model: string;
  year: number;
  category: 'suv' | 'sedan' | 'truck' | 'hybrid';
  startingMsrp: number;
  estMpg: string; // e.g. "41 / 38 City/Hwy"
  horsepower: number;
  seating: number;
  driveType: string;
  image: string;
  popularTrim: string;
  descriptionEn: string;
  descriptionEs: string;
  highlightFeaturesEn: string[];
  highlightFeaturesEs: string[];
  engine: string;
  transmission: string;
  towingCapacity?: string;
  cargoSpace?: string;
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredVehicle: string;
  estimatedBudget: string;
  preferredContactMethod: 'phone' | 'text' | 'email' | 'whatsapp';
  timeframe: string;
  message: string;
  submittedAt: string;
  language: Language;
}
