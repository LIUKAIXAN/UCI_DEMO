import { OrderStatus } from '../components/ui/StatusBadge';

export interface SubReport {
  name: string;
  statusText: string;
  isPass: boolean;
}

export interface OrderData {
  id: string;
  orderNo: string;
  trfNo: string;
  applicant: string;
  contactPerson: string;
  client: string;
  agency: string;
  billingCustomer: string;
  billingAccount: string;
  type: string;
  style: string;
  brand: string;
  testPackage: string;
  lab?: string;
  reportNumber?: string;
  testResult?: string;
  lastModified?: string;
  season?: string;
  fiberContent?: string;
  collection?: string;
  productSegment?: string;
  status: OrderStatus;
  created: string;
  currentStep: number;
  issueStep?: number;
  issueMessage?: string;
  subReports?: SubReport[];
}

export const OVERVIEW_NODES: { status: OrderStatus; count: number }[] = [
  { status: 'Drafting', count: 5 },
  { status: 'Submitted', count: 12 },
  { status: 'Application', count: 8 },
  { status: 'Accepted Testing', count: 15 },
  { status: 'Report Released', count: 102 },
];

export const MOCK_ORDERS: OrderData[] = [
  {
    id: '1',
    orderNo: 'ORD-2026-001',
    trfNo: 'TRF26-D1',
    applicant: 'Nike Inc.',
    contactPerson: 'John Doe',
    client: 'Foot Locker',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-10029',
    type: 'Footwear',
    style: 'FW26-01',
    brand: 'Nike',
    testPackage: 'Nike Apparel Package',
    lab: 'Shanghai Laboratory',
    reportNumber: 'RN-2605-1A',
    testResult: 'Pending',
    lastModified: '2026-05-10',
    season: 'Fall 2026',
    fiberContent: '100% Cotton',
    collection: 'Sportswear',
    productSegment: 'Men',
    status: 'Drafting',
    created: '2026-05-09',
    currentStep: 0,
  },
  {
    id: '2',
    orderNo: 'ORD-2026-002',
    trfNo: 'TRF26-S1',
    applicant: 'Adidas AG',
    contactPerson: 'Jane Smith',
    client: 'JD Sports',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-10030',
    type: 'Footwear',
    style: 'SS26-02',
    brand: 'Adidas',
    testPackage: 'Adidas Footwear Package',
    status: 'Submitted',
    created: '2026-05-08',
    lastModified: '2026-05-09',
    currentStep: 1,
  },
  {
    id: '3',
    orderNo: 'ORD-2026-003',
    trfNo: 'TRF26-A1',
    applicant: 'Puma SE',
    contactPerson: 'John Doe',
    client: '-',
    agency: 'Global Testing Agency',
    billingCustomer: 'Agency',
    billingAccount: 'ACC-20050',
    type: 'Apparel',
    style: 'ACC-03',
    brand: 'Puma',
    testPackage: 'General Safety Package',
    status: 'Application',
    created: '2026-05-07',
    lastModified: '2026-05-08',
    currentStep: 2,
  },
  {
    id: '4',
    orderNo: 'ORD-2026-004',
    trfNo: 'TRF26-T1',
    applicant: 'Nike Inc.',
    contactPerson: 'Jane Smith',
    client: 'Foot Locker',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-10029',
    type: 'Accessories',
    style: 'HD-04',
    brand: 'Nike',
    testPackage: 'General Safety Package',
    status: 'Accepted Testing',
    created: '2026-05-06',
    lastModified: '2026-05-07',
    currentStep: 3,
    subReports: [
      { name: 'Chem-T01 (REACH)', statusText: '100% PASS', isPass: true },
      { name: 'Phys-T02 (Tensile)', statusText: '60% In Progress', isPass: false },
    ]
  },
  {
    id: '5',
    orderNo: 'ORD-2026-005',
    trfNo: 'TRF26-T2',
    applicant: 'Adidas AG',
    contactPerson: 'John Doe',
    client: '-',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-10030',
    type: 'Footwear',
    style: 'FW26-05',
    brand: 'Adidas',
    testPackage: 'Adidas Footwear Package',
    status: 'Accepted Testing',
    created: '2026-05-05',
    lastModified: '2026-05-11',
    currentStep: 3,
    issueStep: 3,
    issueMessage: 'The submitted sample quantity runs short. Additional samples are required to proceed with the testing.',
    subReports: [
      { name: 'Chem-T01 (REACH)', statusText: '100% PASS', isPass: true },
      { name: 'Phys-T02 (Tensile)', statusText: '60% In Progress', isPass: false },
    ]
  },
  {
    id: '6',
    orderNo: 'ORD-2026-006',
    trfNo: 'TRF26-R1',
    applicant: 'Puma SE',
    contactPerson: 'Jane Smith',
    client: 'JD Sports',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-20050',
    type: 'Apparel',
    style: 'FW26-06',
    brand: 'Puma',
    testPackage: 'General Safety Package',
    status: 'Report Released',
    created: '2026-05-04',
    lastModified: '2026-05-06',
    currentStep: 4,
    subReports: [
      { name: 'Chem-T01 (REACH)', statusText: '100% PASS', isPass: true },
      { name: 'Phys-T02 (Tensile)', statusText: '100% PASS', isPass: true },
    ]
  },
  {
    id: '7',
    orderNo: 'ORD-2026-007',
    trfNo: 'TRF26-C1',
    applicant: 'Nike Inc.',
    contactPerson: 'John Doe',
    client: 'Foot Locker',
    agency: '-',
    billingCustomer: 'Applicant',
    billingAccount: 'ACC-10029',
    type: 'Footwear',
    style: 'SS26-07',
    brand: 'Nike',
    testPackage: 'Nike Apparel Package',
    status: 'Report Released',
    created: '2026-05-03',
    lastModified: '2026-05-05',
    currentStep: 4,
  },
  {
    id: '8',
    orderNo: 'ORD-2026-008',
    trfNo: 'TRF26-CR1',
    applicant: 'Adidas AG',
    contactPerson: 'Jane Smith',
    client: '-',
    agency: 'Quality Assurance Co.',
    billingCustomer: 'Agency',
    billingAccount: 'ACC-10030',
    type: 'Accessories',
    style: 'ACC-08',
    brand: 'Adidas',
    testPackage: 'General Safety Package',
    status: 'Report Released',
    created: '2026-05-01',
    lastModified: '2026-05-04',
    currentStep: 4,
  }
];
