type Rights = {
  manageEmployees: boolean;
  manageVehicles: boolean;
  manageOrders: boolean;
  managePayments: boolean;
  manageAccounts: boolean;
  manageReviews: boolean;
  manageComplaints: boolean;
  manageSettings: boolean;
  manageChat: boolean;
};

type User = {
  id: string;
  _id: string;
  token: string | null;
  ttl: string | null;
  serialNo: number;
  dealership: string | null | Dealership;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  rights: Rights;
  profilePicture?: string;
  zipCode: string;
  stateLocation: string;
  emailVerified: boolean;
  status?: string;
};

type BlogComment = {
  comment: string;
  user: Author;
  createdAt: string;
};

type Blog = {
  id: string;
  _id: string;
  title: string;
  body: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  likedBy: string[];
  views: number;
  likes: number;
  comments: BlogComment[];
  author: Author;
  metaDescription: string;
  coverImageAlt: string;
  tags: string[];
};

type Vehicle = {
  id: string;
  _id: string;
  price: number;
  images: string[];
  title: string;
  modelYear: number;
  phaseStatus?: string;
  mileage: number;
  stateLocation: string;
  zipCode: string;
  vin: string;
  make: string;
  model: string;
  trim: string;
  exteriorColor: string;
  engine: string;
  transmission: string;
  type: string;
  condition: string;
  drivetrain: string;
  interiorColor: string;
  fuelType: string;
  horsepower: number;
  status: string;
  prices?: {
    jdPower: {
      adjustedWeeklyCleanRetail: string;
    };
  };
  costPrice: number;
};

type Author = Omit<
  User,
  "token" | "ttl" | "dealership" | "rights" | "stateLocation" | "zipCode"
>;

type Order = {
  _id: string;
  id: string;
  serialNo: number;
  customer: string | User;
  vehicle: string | Vehicle;
  seller: string;
  dealership: string | Dealership;
  totalPayment: number;
  vehicleObject: Record<string, unknown>;
  hasTradeIn: boolean;
  tradeInPrice: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  vin: string;
  cancellationReason: string;
  financedAmount: number;
  amountReceived: number;
  dealJacketId: string;
  dealJacketIdArray: string[];
  conversationId: string;
  conversationIdArray: string[];
  creditApplicationGUID: string;
  coApplicantVersionNumber: string;
  documents: [];
  warrantyDocuments: [];
  dealBonus: null;
  currentStep: number;
  firstName: string;
  middleName: string;
  hasMiddleName: boolean;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address1_house: string;
  address1_street: string;
  address2: string;
  state: string;
  city: string;
  county: string;
  zipCode: string;
  sameAsDeliveryAddress: boolean;
  deliveryAddress1: string;
  deliveryAddress2: string;
  deliveryState: string;
  deliveryCity: string;
  deliveryCounty: string;
  deliveryZipCode: string;
  cashOrFinance: string;
  ssn: string;
  homePhoneNumber: string;
  dateOfBirth: null;
  educationLevel: string;
  homeOwnershipStatus: string;
  monthsAtAddress: string;
  monthlyRentMortgage: number;
  employmentStatus: string;
  employerName: string;
  employerPhoneNumber: string;
  incomeInterval: string;
  incomeAmount: number;
  employmentTitle: string;
  monthsAtEmployment: number;
  hasOtherIncome: boolean;
  otherIncomeSourceCode: string;
  otherIncomeSourceDescription: string;
  otherIncomeAmount: number;
  otherIncomeIntervalCode: string;
  transactionType: string;
  cashDownPayment: number;
  paymentIntentId: null;
  refundId: null;
  term: number;
  apr: number;
  driversLicenseNumber: null;
  driversLicenseState: null;
  driversLicenseExpirationDate: null;
  driversLicenseIssueDate: null;
  financeSources: null;
  deliveryOption: string;
  deliveryPrice: number;
  deliveryQuoteId: string;
  deliveryTrackingId: string;
  protectionPlan: null | {
    type: string;
    validationPeriodMonths: number;
    validationPeriodMiles: number;
    price: number;
    Rate: {
      RetailRate: number;
    };
    Plan: {
      PlanDescription: string;
      ProductTypeCode: string;
    };
    TermMile: {
      Term: number;
      Mileage: number;
    };
  };
  protectionPlanPrice: null | string;
  protectionPlanQuoteId: string;
  protectionPlanQuoteExpiry: string;
  protectionPlanContract: null;
  services:
    | null
    | {
        price: string;
        name: string;
        type: string;
        Rate?: {
          RetailRate: string;
        };
        Plan: {
          PlanDescription: string;
          ProductTypeDescription: string;
          ProductTypeCode: string;
        };
      }[];
  serviceObjects: null | [];
  servicesQuoteId: string;
  servicesQuoteExpiry: string;
  serviceContracts: Record<string, unknown>;
  provincialSalesTax: number;
  taxes:
    | null
    | {
        title: string;
        amount: number;
      }[];
  paymentOption: string;
  paymentStatus: string;
  serviceQualityRating: number;
  responsivenessRating: number;
  valueForMoneyRating: number;
  deliveryServiceRating: number;
  eContract: string;
  acceptedOffer: null;
  customerSignature: null;
  prequalificationValues: null;
  financialInstitutions: null;
  intermediaryUrl: string;
  trackingUrl: string;
  ushipStatus: null | {
    status: {
      value: string;
    };
    transitStatus: {
      value: string;
    };
  };
  proofOfIncome: null | string;
  proofOfResidence: null;
  proofOfInsurance: null;
  driversLicense: null;
  references: null;
  dealJacketToCreditApplicationMap: Record<string, unknown>;
  customEContract: null;
  customEContractSigned: null;
  itemCheckList: string[];
  itemCheckListReceived: string[];
  pollingFlags: {
    generateAllContracts: string;
  };
  tradeInVehicle: null | Vehicle;
  creditDecision: Record<string, unknown>;
  tradeInValue: number;
  total: number;
};

type Payment = {
  _id: string;
  id?: string;
  serialNo?: number;
  order: string | Order;
  amount: number;
  status: string;
  paidThrough: "Stripe" | "Other";
  vehicle: string | Vehicle;
  dealership: string | Dealership;
  seller: string | User;
  customer: string | User;
  createdAt: Date;
  updatedAt: Date;
  sellerAmount: number;
  showToSeller: boolean;
};

type Dealership = {
  _id: string;
  id: string;
  serialNo: number;
  type: string;
  licenseNumber: string;
  licenseImage: string;
  tradeLicenseNumber: string;
  tradeLicenseImage: string;
  salesTaxNumber: string;
  salesTaxImage: string;
  dealershipName: string;
  dealershipAddress: string;
  dealershipZipCode: string;
  dealershipState: string;
  dealershipCity: string;
  dealershipWebsite: string;
  dealershipPhone: string;
  dealershipInstagramHandle: string;
  dealershipFacebookHandle: string;
  dealershipLogo: string;
  seller: string | User;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  stripeId: string;
  currentStep?: string;
  dealershipEmail?: string;
  images?: string[];
  completedRegistration?: boolean;
};

type Complaint = {
  _id: string;
  id?: string;
  serialNo?: number;
  order: string | Order;
  complaintTitle: string;
  complaintDescription: string;
  customer: string | User;
  seller: string | User;
  vehicle: string | Vehicle;
  dealership: string | Dealership;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  complaintStatus: string;
  complaintResponse: string;
};

type ContactUsResponse = {
  createdAt: number;
  updatedAt: number;
  id: string;
  status: "Active" | "Inactive";
  email: string;
  name: string;
  message: string;
  phoneNumber: string;
  user: string | null;
};
type ContactUs = {
  _id: string;
  id?: string;
  serialNo?: number;
  customer: string | User;
  contactTitle: string;
  cellNo: string;
  message: string;
};

type Review = {
  _id: string;
  id?: string;
  serialNo?: number;
  serviceQualityRating: number;
  responsivenessRating: number;
  valueForMoneyRating: number;
  deliveryServiceRating: number;
  overallRating?: number;
  review: string;
  customer: string | User;
  seller: string | User;
  vehicle: string | Vehicle;
  dealership: string | Dealership;
  order: string | Order;
  createdAt: Date;
  updatedAt: Date;
  status: string;
};

type UserWithDeleted = User & { deleted?: boolean };

type Conversation = {
  _id?: string;
  id?: string;
  conversationId: string;
  user1: string | UserWithDelete;
  user2: string | UserWithDelete;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  blockedByUser1?: boolean;
  blockedByUser2?: boolean;
  blocked?: boolean;
  blockedBy?: string | null;
};

type CurrentConversation = {
  blocked: boolean;
  blockedBy: string | null;
  conversationId: string;
  createdAt: Date;
  dealership: null | string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  id: string;
  lastName: string;
  middleName: null | string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  rights: Rights;
  stateLocation: string;
  status: string;
  stripeConnectedAccountId: string;
  updatedAt: Date;
  userType: string;
  verificationToken: string;
  verificationTokenExpiresAt: string;
  zipCode: string;
  deleted?: boolean;
};

type Message = {
  _id?: string;
  id?: string;
  conversation: string | Conversation;
  sender: string | User;
  receiver?: string | User;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  files?:
    | null
    | {
        url: string;
        name: string;
        type: string;
        size: number;
      }[];
  read?: boolean;
};

type ModifiedFileType = File & {
  preview?: string;
  type?: string;
  name?: string;
  url?: string;
  size?: string;
};

type Option = {
  OptionDescriptions: Record<string, unknown>;
  OptionId: string;
  Status: string;
  OptionDesc: string;
  OptionName: Record<string, unknown>;
  RetailRate: string;
  NetRate: string;
  PremiumRate: string;
  CommissionRate: string;
  AdminRate: string;
  IsUsed: string;
  IsSurcharge: string;
  IsSurchargeOption: string;
  PDFFormNo: string;
};

type Plan = {
  PlanDescriptions: Record<string, unknown>;
  ProgramDescriptions: Record<string, unknown>;
  ProductTypeCode: string;
  ProductTypeDescription: string;
  PlanCode: string;
  PlanDescription: string;
  ContractType: string;
  PlanId: string;
  RateBook: string;
  OwnershipTypeCode: string;
  ContractPlanName: Record<string, unknown>;
  ProgramDescription: string;
  ProgramID: string;
  Discountable: string;
};

type Rate = {
  BandCode: Record<string, unknown>;
  OverrideFlag: string;
  OptionGroupId: string;
  RateId: string;
  RetailRate: number;
  NetRate: string;
  MaxRetailRate: string;
  MinRetailRate: string;
  RegulatedRuleId: string;
  PDFFormNo: string;
  VehicleClass: string;
  ExpirationDate: string;
  ExpirationMileage: string;
  MarkupMin: string;
  MarkupMax: string;
  RateDetails: {
    Remit: string;
    Cost: string;
    Retail: string;
    AdminMarkup: string;
    BaseMarkup: string;
    FIMarkup: string;
  };
};

type Deductible = {
  DeductTypeDescriptions: {
    GlobalInformation: {
      CultureName: string;
      Description: Record<string, unknown>;
    };
  };
  DeductId: string;
  DeductAmt: string;
  DeductType: Record<string, unknown>;
  ReducedAmount: string;
};

type TermMile = {
  TermId: string;
  Term: string;
  Mileage: string;
};

type RateClassMoney = {
  TermMile: TermMile;
  Deductible: Deductible;
  Rate: Rate;
  Options: {
    Option: Option | Option[];
  };
};

type Warranty = {
  Plan: Plan;
  RateClassMoneys: {
    RateClassMoney: RateClassMoney | RateClassMoney[];
  };
  AdditionalContractInfos: {
    AdditionalContractInfo: {
      FieldOrder: string;
      FieldLabel: string;
      FieldType: string;
      Length: string;
      Required: string;
      Unique: string;
    };
  };
  ContractNo: Record<string, unknown>;
  NewUsed: string;
  ProgramTypeCode: Record<string, unknown>;
  SalesAgentNo: Record<string, unknown>;
  PDFFormNo: string;
};

type WarrantySpread = {
  plan: {
    Plan: Plan;
  };
  rate: {
    Rate: Rate;
    Options: {
      Option: Option[];
    };
    Deductible: Deductible;
    TermMile: TermMile;
  };
};

type Service = {
  Plan: Plan;
  RateClassMoneys: {
    RateClassMoney: RateClassMoney | RateClassMoney[];
  };
  AdditionalContractInfos: {
    AdditionalContractInfo: {
      FieldOrder: string;
      FieldLabel: string;
      FieldType: string;
      Length: string;
      Required: string;
      Unique: string;
    };
  };
  ContractNo: Record<string, unknown>;
  NewUsed: string;
  ProgramTypeCode: Record<string, unknown>;
  SalesAgentNo: Record<string, unknown>;
  PDFFormNo: string;
};

type ServiceSpread = {
  plan: {
    Plan: Plan;
  };
  rate: {
    Rate: Rate;
    Options: {
      Option: Option[];
    };
    Deductible: Deductible;
    TermMile: TermMile;
  };
};

type Revenue = {
  amount: number;
  automaticallyCreated: boolean;
  createdAt?: Date;
  date: Date;
  dealership: string;
  description: string;
  order?: string;
  reference: string;
  referenceDetails: string;
  referenceEmail: string;
  status: string;
  updatedAt?: Date;
  vehicle: string;
  _id: string;
};

type Expense = {
  amount: number;
  automaticallyCreated: boolean;
  bill?: string;
  createdAt?: Date;
  date: Date;
  dealership: string;
  description: string;
  status: string;
  type: string;
  updatedAt?: Date;
  vehicle: string;
  _id: string;
};
