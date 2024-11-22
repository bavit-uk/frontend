export type OrdersType = {
  serialNo: number;
  total?: string | number;
  cancellationReason?: string;
  customer: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    id: string;
  };
  pollingFlags: {
    generateAllContracts: string;
  };
  vehicle: {
    _id: string;
    vin: string;
    title: string;
    price: number;
    make: string;
    model: string;
    modelYear: number;
    images: string[];
    id: string;
  };
  dealership: {
    dealershipName: string;
    dealershipLogo: string;
    id: string;
  };
  totalPayment: number;
  hasTradeIn: boolean;
  createdAt: number;
  updatedAt: number;
  status: string;
  vin: string;
  currentStep: number;
  cashOrFinance: string;
  ushipStatus: {
    status?: {
      value: string;
    };
    transitStatus?: {
      value: string;
    };
  };
  id: string;
};
