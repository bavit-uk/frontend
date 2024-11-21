type VehiclePreviewCardProps =
  | {
      id: string;
      images: string[];
      title: string;
      price: number;
      vin: string;
      stateLocation: string;
      zipCode: string;
      engine: string;
      mileage: number;
      transmission: string;
      trim: string;
      shouldListOnWebsite?: boolean;
      make: string;
      model: string;
      modelYear: number;
      temporaryBuyTimeOutTill?: Date;
      reservedBy?: string | User;
      jdPowerPricing: null | {
        jdPowerPricing: {
          adjustedweeklycleantrade: string;
          adjustedweeklycleanretail: string;

          jdPower: {
            adjustedweeklycleantrade: string;
            adjustedweeklycleanretail: string;
          };
        };
      };
    }
  | undefined;

type BlogPreviewCardProps =
  | {
      id: string;
      _id?: string;
      slug?: string;
      coverImage: string;
      likedBy: string[];
      comments: string[];
      title: string;
      author?: Author;
      description?: string;
      body?: string;
      createdAt: string;
    }
  | undefined;

type VehicleDetailedViewProps = {
  images: string[];
  title: string;
  modelYear: number;
  mileage: number;
  stateLocation: string;
  zipCode: string;
  vin: string;
  make: string;
  model: string;
  trim: string;
  exteriorColor: string;
  description: string
  engine: string;
  transmission: string;
  type: string;
  condition: string;
  drivetrain: string;
  interiorColor: string;
  fuelType: string;
  horsepower: number;
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};
