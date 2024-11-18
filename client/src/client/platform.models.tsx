// Define request and response interfaces based on the OpenAPI schema
export interface UUID {
    id: string;
}

// Artist-related types
export interface Artist {
    userInfo: UserInfo;
    description: string;
}

export interface CreateArtistRequest {
    name: string;
    contactInfo: ContactInfo;
    description: string;
}

// Customer-related types
export interface Customer {
    userInfo: UserInfo;
}

export interface CreateCustomerRequest {
    name: string;
    contactInfo: ContactInfo;
}

// Order-related types
export interface Order {
    id: string;
    creationDateTime: string; // LocalDateTime in ISO format
    total: number;
    shipmentInfo: ShipmentInfo;
    customerId: UUID;
    paintings: string[];
    status: OrderStatus;
}

export interface CreateOrderRequest {
    paintings: string[];
    shipmentInfo: DeliveryInfo;
}

export interface DeliveryInfo {
    deliveryType: DeliveryType;
    address?: Address;
}

export enum OrderStatus {
    NEW = 'NEW',
    PENDING = 'PENDING',
    MANAGER_APPROVED = 'MANAGER_APPROVED',
    WAITING_PAYMENT = 'WAITING_PAYMENT',
    PAID = 'PAID',
    DELIVERING = 'DELIVERING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

// Painting-related types
export interface Painting {
    id: string;
    name: string;
    dimensions: Dimensions;
    price: number;
    artistId: UUID;
    paintingImages: PaintingImage[];
    state: PaintingState;
}

export interface PaintingImage {
    id?: UUID;
    imageUrl: string;
    imageSize: ImageSize;
}

export enum PaintingState {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

// Review-related types
export interface Review {
    id: string;
    rating: ReviewRating;
    content: string;
    customerId: UUID;
    paintingId: UUID;
}

export interface CreateReviewRequest {
    rating: ReviewRating;
    content: string;
    customerId: UUID;
    paintingId: string;
}

export enum ReviewRating {
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
    FOUR = "FOUR",
    FIVE = "FIVE",
}

// Supporting types
export interface UserInfo {
    id: UUID;
    name: string;
    contactInfo: ContactInfo;
}

export interface ContactInfo {
    phone?: string;
    email?: string;
}

export interface ShipmentInfo {
    id: string;
    deliveryType: DeliveryType;
    address?: Address;
}

export enum DeliveryType {
    PICK_UP = 'PICK_UP',
    COURIER = 'COURIER',
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
    dimensionUnit: DimensionUnit;
}

export enum DimensionUnit {
    METERS = 'METERS',
}

export interface ImageSize {
    width: number;
    height: number;
}

export interface Address {
    city: string;
    street: string;
    houseNumber: number;
    building?: string;
    zipCode: string;
}