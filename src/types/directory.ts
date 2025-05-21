// src/types/directory.ts
export interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  listCategory: string;
  speciality: string[];
  services: string[];
  languages: string[];
  city: string;
  state: string;
  description: string;
  website: string;
  image?: string; // URL to professional's image
  membershipLevel?: string; // CAAM membership level (e.g., Student, Professional, Lifetime)
  certificates?: string[]; // Professional certificates and qualifications
}