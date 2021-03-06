import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['String'];
  adminId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lname: Scalars['String'];
  role: AdminRole;
  updatedAt: Scalars['DateTime'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  admin?: Maybe<Admin>;
  errors: Array<FieldError>;
};

export enum AdminRole {
  Admin = 'ADMIN',
  Modeler = 'MODELER',
  Registrar = 'REGISTRAR',
  Technician = 'TECHNICIAN'
}

export type AdminWithCompanies = {
  __typename?: 'AdminWithCompanies';
  _id: Scalars['String'];
  adminId: Scalars['String'];
  companies?: Maybe<Array<Company>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lname: Scalars['String'];
  role: AdminRole;
  updatedAt: Scalars['DateTime'];
};

export type AllAdminsResponse = {
  __typename?: 'AllAdminsResponse';
  admins?: Maybe<Array<Admin>>;
  errors: Array<FieldError>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
};

export type AllCompaniesResponse = {
  __typename?: 'AllCompaniesResponse';
  companies?: Maybe<Array<Company>>;
  errors: Array<FieldError>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
};

export type AllHearingAidsResponse = {
  __typename?: 'AllHearingAidsResponse';
  errors: Array<FieldError>;
  hearingAids?: Maybe<Array<HearingAid>>;
};

export type AllOrdersResponse = {
  __typename?: 'AllOrdersResponse';
  errors: Array<FieldError>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
  orders?: Maybe<Array<Order>>;
};

export type AllPrintJobs = {
  __typename?: 'AllPrintJobs';
  errors: Array<FieldError>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
  print_jobs?: Maybe<Array<PrintJob>>;
};

export type AllUsersResponse = {
  __typename?: 'AllUsersResponse';
  errors: Array<FieldError>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
  users?: Maybe<Array<User>>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  errors: Array<FieldError>;
  token?: Maybe<Scalars['String']>;
};

export type BasicResponse = {
  __typename?: 'BasicResponse';
  errors: Array<FieldError>;
};

export type Bte = {
  __typename?: 'Bte';
  _id: Scalars['String'];
  bte_id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  image: Scalars['String'];
  mould_colour: Scalars['String'];
  sound_tube_color: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BteEar = {
  __typename?: 'BteEar';
  canal: Scalars['String'];
  canalLength: Scalars['String'];
  color: Scalars['String'];
  cymbaLength: Scalars['String'];
  ear_mould_sn?: Maybe<Scalars['String']>;
  engraving: Scalars['String'];
  haModel: Scalars['String'];
  hasEngraving: Scalars['Boolean'];
  manufacturer: Scalars['String'];
  markingDots: Scalars['Boolean'];
  model: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber: Scalars['String'];
  shellId: Scalars['String'];
  soundTube: Scalars['String'];
  style: Scalars['String'];
  surface: Scalars['String'];
  ventSize: Scalars['String'];
};

export type BteModelResponse = {
  __typename?: 'BteModelResponse';
  errors: Array<FieldError>;
  model?: Maybe<Bte>;
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  errors: Array<FieldError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['String'];
  assigned: Array<Admin>;
  canDownload?: Maybe<Scalars['Boolean']>;
  companyId: Scalars['String'];
  contactPerson: ContactPerson;
  contact_emails?: Maybe<Array<Scalars['String']>>;
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  admin?: Maybe<User>;
  company?: Maybe<Company>;
  errors: Array<FieldError>;
};

export type CompanyWithEmployees = {
  __typename?: 'CompanyWithEmployees';
  _id: Scalars['String'];
  assigned?: Maybe<Array<Admin>>;
  canDownload?: Maybe<Scalars['Boolean']>;
  companyId: Scalars['String'];
  contactPerson: ContactPerson;
  contact_emails?: Maybe<Array<Scalars['String']>>;
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  employees?: Maybe<Array<User>>;
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  customerAccount: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateAdminInput = {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
  role: AdminRole;
};

export type CreateBteEar = {
  canal: Scalars['String'];
  canalLength: Scalars['String'];
  color: Scalars['String'];
  cymbaLength: Scalars['String'];
  engraving: Scalars['String'];
  haModel: Scalars['String'];
  hasEngraving: Scalars['Boolean'];
  manufacturer: Scalars['String'];
  markingDots: Scalars['Boolean'];
  model: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber: Scalars['String'];
  soundTube: Scalars['String'];
  style: Scalars['String'];
  surface: Scalars['String'];
  ventSize: Scalars['String'];
};

export type CreateBteInput = {
  image: Scalars['String'];
  mould_colour: Scalars['String'];
  sound_tube_color: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCompanyAdminInput = {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
};

export type CreateCompanyInput = {
  assigned: Array<Scalars['ID']>;
  canDownload: Scalars['Boolean'];
  contactPerson: CreateContactPersonInput;
  contact_emails: Array<Scalars['String']>;
  country: Scalars['String'];
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
};

export type CreateContactPersonInput = {
  customerAccount: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateDeliveryDetailsInput = {
  invoiceNumber?: InputMaybe<Scalars['String']>;
  standard: Scalars['Boolean'];
  urgent: Scalars['Boolean'];
};

export type CreateExtraDetailsInput = {
  accessories: Scalars['String'];
  comment: Scalars['String'];
};

export type CreateImpressionsInput = {
  left: Scalars['String'];
  right: Scalars['String'];
};

export type CreateOrderInput = {
  bioporShore: Scalars['String'];
  cordColor: Scalars['String'];
  deliveryDetails: CreateDeliveryDetailsInput;
  direction: OrderDirection;
  extraDetails: CreateExtraDetailsInput;
  filter: Scalars['String'];
  hasCord: Scalars['Boolean'];
  impressions: CreateImpressionsInput;
  manufacturer: Scalars['String'];
  material: Scalars['String'];
  orderType: OrderType;
  product: CreateProductInput;
  reason: Scalars['String'];
  remake: Scalars['Boolean'];
};

export type CreatePrintJobInput = {
  company_id: Scalars['ID'];
  orders: Array<OrderEarInput>;
  print_file?: InputMaybe<Scalars['String']>;
  print_image?: InputMaybe<Scalars['String']>;
  print_stl?: InputMaybe<Scalars['String']>;
  printer: Scalars['String'];
};

export type CreateProductInput = {
  left: CreateBteEar;
  right: CreateBteEar;
};

export type CreateUserInput = {
  company: Scalars['ID'];
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type DeliveryDetails = {
  __typename?: 'DeliveryDetails';
  invoiceNumber: Scalars['String'];
  standard: Scalars['Boolean'];
  urgent: Scalars['Boolean'];
};

/** Describes whether the order is for the left or the right ear */
export enum Ear {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type EditUserInput = {
  _id: Scalars['String'];
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  role: UserRole;
};

export type ExtraDetails = {
  __typename?: 'ExtraDetails';
  accessories: Scalars['String'];
  comment: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type HearingAid = {
  __typename?: 'HearingAid';
  _id: Scalars['String'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  hearingAidId: Scalars['String'];
  image: Scalars['String'];
  options?: Maybe<Array<HearingAidOption>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type HearingAidOption = {
  __typename?: 'HearingAidOption';
  code?: Maybe<Scalars['String']>;
  color: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type Impressions = {
  __typename?: 'Impressions';
  left: Scalars['String'];
  right: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Logs = {
  __typename?: 'Logs';
  createdAt: Scalars['DateTime'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignTechnician: BasicResponse;
  /** Change order status */
  changeOrderStatus?: Maybe<OrderResponses>;
  changePassword: ChangePasswordResponse;
  /** Create a new admin account with the given email and password. Returns the created admin deactivated. */
  createAdmin: AdminResponse;
  createBteModel: BteModelResponse;
  createCompany: SingleCompanyResponse;
  createJob: PrintResponse;
  createUser: UserResponse;
  editCompany: CompanyResponse;
  editUser: UserResponse;
  forgotPassword: AdminResponse;
  login: AuthResponse;
  rejectOrder: OrderResponses;
  resetPassword: AdminResponse;
  seedPhonak: Scalars['Boolean'];
  toggleActivate: AdminResponse;
  toggleActivateUser: UserResponse;
  updateOrder: OrderResponses;
  uploadFile: UploadResponse;
};


export type MutationAssignTechnicianArgs = {
  companyId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationChangeOrderStatusArgs = {
  _id: Scalars['ID'];
  status: OrderStatus;
};


export type MutationChangePasswordArgs = {
  new_password: Scalars['String'];
  old_password: Scalars['String'];
  user_id: Scalars['ID'];
};


export type MutationCreateAdminArgs = {
  input: CreateAdminInput;
};


export type MutationCreateBteModelArgs = {
  input: CreateBteInput;
};


export type MutationCreateCompanyArgs = {
  admin: CreateCompanyAdminInput;
  company: CreateCompanyInput;
};


export type MutationCreateJobArgs = {
  input: CreatePrintJobInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditCompanyArgs = {
  _id: Scalars['ID'];
  input: CreateCompanyInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRejectOrderArgs = {
  _id: Scalars['ID'];
  rejectionReason: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationToggleActivateArgs = {
  adminId: Scalars['ID'];
};


export type MutationToggleActivateUserArgs = {
  userId: Scalars['ID'];
};


export type MutationUpdateOrderArgs = {
  _id: Scalars['ID'];
  input: CreateOrderInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type NonAdminResponse = {
  __typename?: 'NonAdminResponse';
  admin?: Maybe<AdminWithCompanies>;
  errors: Array<FieldError>;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['String'];
  bioporShore: Scalars['String'];
  company: Company;
  cordColor: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  deliveryDetails: DeliveryDetails;
  direction: OrderDirection;
  extraDetails: ExtraDetails;
  filter: Scalars['String'];
  hasCord: Scalars['Boolean'];
  impressions: Impressions;
  logs: Array<Logs>;
  manufacturer: Scalars['String'];
  material: Scalars['String'];
  orderId: Scalars['String'];
  orderType: OrderType;
  patient_name?: Maybe<Scalars['String']>;
  product: Product;
  reOrder: Scalars['Boolean'];
  reason: Scalars['String'];
  rejectionReason: Scalars['String'];
  remake: Scalars['Boolean'];
  status: OrderStatus;
  updatedAt: Scalars['DateTime'];
};

export enum OrderDirection {
  Binaural = 'BINAURAL',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type OrderEar = {
  __typename?: 'OrderEar';
  approved: PrintStatus;
  ear: Ear;
  order: Order;
};

export type OrderEarInput = {
  _id: Scalars['ID'];
  ear: Ear;
};

export type OrderResponses = {
  __typename?: 'OrderResponses';
  errors: Array<FieldError>;
  order?: Maybe<Order>;
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Checked = 'CHECKED',
  ImpressionEvaluation = 'IMPRESSION_EVALUATION',
  Modeled = 'MODELED',
  Modelling = 'MODELLING',
  Mounted = 'MOUNTED',
  Placed = 'PLACED',
  Printed = 'PRINTED',
  Printing = 'PRINTING',
  Shipped = 'SHIPPED'
}

export enum OrderType {
  Bte = 'BTE',
  Custom = 'CUSTOM',
  IndustrialPlugs = 'INDUSTRIAL_PLUGS',
  InEarMonitoring = 'IN_EAR_MONITORING',
  MusicPlugs = 'MUSIC_PLUGS',
  Plugs = 'PLUGS',
  Ric = 'RIC',
  SkyPlugs = 'SKY_PLUGS',
  SleepPlugs = 'SLEEP_PLUGS',
  SwimmingPlugs = 'SWIMMING_PLUGS'
}

export type PrintJob = {
  __typename?: 'PrintJob';
  _id: Scalars['ID'];
  company: Company;
  createdAt: Scalars['DateTime'];
  creator: Admin;
  orders: Array<OrderEar>;
  printId: Scalars['String'];
  print_file?: Maybe<Scalars['String']>;
  print_image?: Maybe<Scalars['String']>;
  print_stl?: Maybe<Scalars['String']>;
  printer: Scalars['String'];
  status?: Maybe<PrintStatus>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PrintResponse = {
  __typename?: 'PrintResponse';
  errors: Array<FieldError>;
  print_job?: Maybe<PrintJob>;
};

/** Describes the print jobs speed */
export enum PrintStatus {
  Approved = 'APPROVED',
  Disapproved = 'DISAPPROVED',
  Pending = 'PENDING'
}

export type Product = {
  __typename?: 'Product';
  left: BteEar;
  right: BteEar;
};

export type Query = {
  __typename?: 'Query';
  getAllAdmins: AllAdminsResponse;
  getAllCompanies: AllCompaniesResponse;
  getAllHearingAids: AllHearingAidsResponse;
  getAllOrders: AllOrdersResponse;
  /** Get company print jobs */
  getAllPrintJobs: AllPrintJobs;
  getAllUsers: AllUsersResponse;
  /** Get company by id with all of its employees */
  getCompany?: Maybe<SingleCompanyResponse>;
  /** Get order by id */
  getOrder?: Maybe<Order>;
  /** Get company print jobs */
  getPrintJob: PrintResponse;
  /** Get company print jobs grouped by colors */
  getPrintableOrders: AllOrdersResponse;
  getSingleAdmin: NonAdminResponse;
  /** Get user by id */
  getUser?: Maybe<UserResponse>;
  me: AdminResponse;
};


export type QueryGetAllAdminsArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetAllCompaniesArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
  sort: Sorting;
};


export type QueryGetAllOrdersArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetAllPrintJobsArgs = {
  company_id: Scalars['ID'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
  sort: Sorting;
};


export type QueryGetAllUsersArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetCompanyArgs = {
  companyId: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  orderId: Scalars['ID'];
};


export type QueryGetPrintJobArgs = {
  print_id: Scalars['ID'];
};


export type QueryGetPrintableOrdersArgs = {
  company_id: Scalars['ID'];
};


export type QueryGetSingleAdminArgs = {
  adminId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};

export type SingleCompanyResponse = {
  __typename?: 'SingleCompanyResponse';
  admin?: Maybe<User>;
  company?: Maybe<CompanyWithEmployees>;
  errors: Array<FieldError>;
};

/** Describes the sort order of the data fetched */
export enum Sorting {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UploadResponse = {
  __typename?: 'UploadResponse';
  errors?: Maybe<Array<FieldError>>;
  file?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  company: Company;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lname: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors: Array<FieldError>;
  user?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Audiologist = 'AUDIOLOGIST',
  Technician = 'TECHNICIAN'
}

export type ChangeOrderStatusMutationVariables = Exact<{
  _id: Scalars['ID'];
  status: OrderStatus;
}>;


export type ChangeOrderStatusMutation = { __typename?: 'Mutation', changeOrderStatus?: { __typename?: 'OrderResponses', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, order?: { __typename?: 'Order', _id: string, material: string, bioporShore: string, createdAt: any, updatedAt: any, orderId: string, remake: boolean, orderType: OrderType, reason: string, status: OrderStatus, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model: string }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model: string } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, company: { __typename?: 'Company', _id: string }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }> } | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  user_id: Scalars['ID'];
  old_password: Scalars['String'];
  new_password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', success?: boolean | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } };

export type CreateAdminMutationVariables = Exact<{
  input: CreateAdminInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'AdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type CreateBteModelMutationVariables = Exact<{
  input: CreateBteInput;
}>;


export type CreateBteModelMutation = { __typename?: 'Mutation', createBteModel: { __typename?: 'BteModelResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, model?: { __typename?: 'Bte', _id: string, title: string, mould_colour: string, sound_tube_color: string, image: string, bte_id: string, createdAt: any, updatedAt: any } | null } };

export type CreateCompanyMutationVariables = Exact<{
  admin: CreateCompanyAdminInput;
  company: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'SingleCompanyResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, company?: { __typename?: 'CompanyWithEmployees', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, manufacturers: Array<string>, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string }, employees?: Array<{ __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null } | null, admin?: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type CreatePrintJobMutationVariables = Exact<{
  input: CreatePrintJobInput;
}>;


export type CreatePrintJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'PrintResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, print_job?: { __typename?: 'PrintJob', _id: string, title: string, printId: string, createdAt: any, updatedAt: any, creator: { __typename?: 'Admin', fullName: string }, company: { __typename?: 'Company', title: string }, orders: Array<{ __typename?: 'OrderEar', ear: Ear, order: { __typename?: 'Order', orderId: string } }> } | null } };

export type EditCompanyMutationVariables = Exact<{
  _id: Scalars['ID'];
  input: CreateCompanyInput;
}>;


export type EditCompanyMutation = { __typename?: 'Mutation', editCompany: { __typename?: 'CompanyResponse', company?: { __typename?: 'Company', _id: string, title: string, companyId: string, canDownload?: boolean | null, street: string, postCode: string, manufacturers: Array<string>, country: string, createdAt: any, updatedAt: any, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'AdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } };

export type RejectOrderMutationVariables = Exact<{
  _id: Scalars['ID'];
  rejectionReason: Scalars['String'];
}>;


export type RejectOrderMutation = { __typename?: 'Mutation', rejectOrder: { __typename?: 'OrderResponses', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, order?: { __typename?: 'Order', status: OrderStatus, orderId: string, reason: string, rejectionReason: string, remake: boolean, createdAt: any, updatedAt: any, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, model: string }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, model: string } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }> } | null } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'AdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } };

export type ToggleActivateUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ToggleActivateUserMutation = { __typename?: 'Mutation', toggleActivateUser: { __typename?: 'UserResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } };

export type ToggleActivateMutationVariables = Exact<{
  adminId: Scalars['ID'];
}>;


export type ToggleActivateMutation = { __typename?: 'Mutation', toggleActivate: { __typename?: 'AdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type UpdateOrderMutationVariables = Exact<{
  _id: Scalars['ID'];
  input: CreateOrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrderResponses', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, order?: { __typename?: 'Order', orderType: OrderType, status: OrderStatus, remake: boolean, reason: string, orderId: string, bioporShore: string, material: string, _id: string, reOrder: boolean, hasCord: boolean, rejectionReason: string, createdAt: any, updatedAt: any, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, markingDots: boolean, canal: string, manufacturer: string, model: string, hasEngraving: boolean }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, markingDots: boolean, canal: string, model: string, hasEngraving: boolean } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }> } | null } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'UploadResponse', file?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAllAdminsQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllAdminsQuery = { __typename?: 'Query', getAllAdmins: { __typename?: 'AllAdminsResponse', hasMore: boolean, length: number, errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, admins?: Array<{ __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null } };

export type GetAllCompaniesQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
  sort: Sorting;
}>;


export type GetAllCompaniesQuery = { __typename?: 'Query', getAllCompanies: { __typename?: 'AllCompaniesResponse', length: number, hasMore: boolean, errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, companies?: Array<{ __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, manufacturers: Array<string>, country: string, canDownload?: boolean | null, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string }, assigned: Array<{ __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }> }> | null } };

export type GetAllOrdersQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllOrdersQuery = { __typename?: 'Query', getAllOrders: { __typename?: 'AllOrdersResponse', hasMore: boolean, length: number, errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, orders?: Array<{ __typename?: 'Order', direction: OrderDirection, _id: string, patient_name?: string | null, orderType: OrderType, status: OrderStatus, remake: boolean, reason: string, orderId: string, bioporShore: string, material: string, rejectionReason: string, reOrder: boolean, createdAt: any, updatedAt: any, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, creator: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, userId: string, isActive: boolean, createdAt: any, updatedAt: any }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }>, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean, ear_mould_sn?: string | null }, right: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean, ear_mould_sn?: string | null } } }> | null } };

export type GetAllUsersQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: { __typename?: 'AllUsersResponse', hasMore: boolean, length: number, errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, users?: Array<{ __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any, company: { __typename?: 'Company', title: string, companyId: string, _id: string, createdAt: any, updatedAt: any, country: string, street: string, postCode: string, manufacturers: Array<string>, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } }> | null } };

export type GetSingleCompanyQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type GetSingleCompanyQuery = { __typename?: 'Query', getCompany?: { __typename?: 'SingleCompanyResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, company?: { __typename?: 'CompanyWithEmployees', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, canDownload?: boolean | null, contact_emails?: Array<string> | null, street: string, postCode: string, manufacturers: Array<string>, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string }, employees?: Array<{ __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null, assigned?: Array<{ __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null } | null } | null };

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'Order', _id: string, material: string, bioporShore: string, createdAt: any, updatedAt: any, orderId: string, patient_name?: string | null, remake: boolean, orderType: OrderType, reason: string, status: OrderStatus, direction: OrderDirection, manufacturer: string, filter: string, cordColor: string, hasCord: boolean, creator: { __typename?: 'User', fullName: string, email: string, role: UserRole, userId: string, isActive: boolean }, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model: string, engraving: string, hasEngraving: boolean, ear_mould_sn?: string | null }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model: string, engraving: string, hasEngraving: boolean, ear_mould_sn?: string | null } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string } }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }> } | null };

export type GetPrintJobQueryVariables = Exact<{
  print_id: Scalars['ID'];
}>;


export type GetPrintJobQuery = { __typename?: 'Query', getPrintJob: { __typename?: 'PrintResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, print_job?: { __typename?: 'PrintJob', _id: string, title: string, printId: string, print_file?: string | null, print_stl?: string | null, print_image?: string | null, printer: string, createdAt: any, updatedAt: any, creator: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }, orders: Array<{ __typename?: 'OrderEar', ear: Ear, order: { __typename?: 'Order', _id: string, orderType: OrderType, status: OrderStatus, hasCord: boolean, remake: boolean, reason: string, orderId: string, updatedAt: any, bioporShore: string, cordColor: string, material: string, direction: OrderDirection, rejectionReason: string, reOrder: boolean, manufacturer: string, filter: string, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, manufacturer: string, markingDots: boolean, hasEngraving: boolean, engraving: string, shellId: string, model: string }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, manufacturer: string, markingDots: boolean, hasEngraving: boolean, engraving: string, shellId: string, model: string } } } }> } | null } };

export type GetAllPrintJobsQueryVariables = Exact<{
  company_id: Scalars['ID'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
  sort: Sorting;
}>;


export type GetAllPrintJobsQuery = { __typename?: 'Query', getAllPrintJobs: { __typename?: 'AllPrintJobs', hasMore: boolean, length: number, errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, print_jobs?: Array<{ __typename?: 'PrintJob', _id: string, title: string, printId: string, print_file?: string | null, createdAt: any, updatedAt: any, creator: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }, orders: Array<{ __typename?: 'OrderEar', ear: Ear, order: { __typename?: 'Order', _id: string, orderType: OrderType, status: OrderStatus, hasCord: boolean, remake: boolean, reason: string, orderId: string, updatedAt: any, bioporShore: string, cordColor: string, material: string, direction: OrderDirection, rejectionReason: string, reOrder: boolean, manufacturer: string, filter: string, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, manufacturer: string, markingDots: boolean, hasEngraving: boolean, engraving: string, shellId: string, model: string }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, manufacturer: string, markingDots: boolean, hasEngraving: boolean, engraving: string, shellId: string, model: string } } } }> }> | null } };

export type GetPrintableOrdersQueryVariables = Exact<{
  company_id: Scalars['ID'];
}>;


export type GetPrintableOrdersQuery = { __typename?: 'Query', getPrintableOrders: { __typename?: 'AllOrdersResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, orders?: Array<{ __typename?: 'Order', direction: OrderDirection, _id: string, orderType: OrderType, status: OrderStatus, remake: boolean, reason: string, orderId: string, bioporShore: string, material: string, rejectionReason: string, reOrder: boolean, createdAt: any, updatedAt: any, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber: string }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, logs: Array<{ __typename?: 'Logs', message: string, createdAt: any }>, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean, model: string }, right: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean, model: string } } }> | null } };

export type GetSingleAdminQueryVariables = Exact<{
  adminId: Scalars['ID'];
}>;


export type GetSingleAdminQuery = { __typename?: 'Query', getSingleAdmin: { __typename?: 'NonAdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, admin?: { __typename?: 'AdminWithCompanies', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any, companies?: Array<{ __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, country: string, manufacturers: Array<string>, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }> | null } | null } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, user?: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any, company: { __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, createdAt: any, updatedAt: any, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AdminResponse', errors: Array<{ __typename?: 'FieldError', field: string, message: string }>, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };


export const ChangeOrderStatusDocument = gql`
    mutation ChangeOrderStatus($_id: ID!, $status: OrderStatus!) {
  changeOrderStatus(_id: $_id, status: $status) {
    errors {
      field
      message
    }
    order {
      _id
      material
      bioporShore
      createdAt
      updatedAt
      orderId
      remake
      orderType
      reason
      status
      impressions {
        left
        right
      }
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          manufacturer
          markingDots
          model
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          manufacturer
          markingDots
          model
        }
      }
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      extraDetails {
        comment
        accessories
      }
      company {
        _id
      }
      logs {
        message
        createdAt
      }
    }
  }
}
    `;
export type ChangeOrderStatusMutationFn = Apollo.MutationFunction<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;

/**
 * __useChangeOrderStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderStatusMutation, { data, loading, error }] = useChangeOrderStatusMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>(ChangeOrderStatusDocument, options);
      }
export type ChangeOrderStatusMutationHookResult = ReturnType<typeof useChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationResult = Apollo.MutationResult<ChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($user_id: ID!, $old_password: String!, $new_password: String!) {
  changePassword(
    new_password: $new_password
    old_password: $old_password
    user_id: $user_id
  ) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      old_password: // value for 'old_password'
 *      new_password: // value for 'new_password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateAdminDocument = gql`
    mutation CreateAdmin($input: CreateAdminInput!) {
  createAdmin(input: $input) {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateAdminMutationFn = Apollo.MutationFunction<CreateAdminMutation, CreateAdminMutationVariables>;

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdminMutation, CreateAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, options);
      }
export type CreateAdminMutationHookResult = ReturnType<typeof useCreateAdminMutation>;
export type CreateAdminMutationResult = Apollo.MutationResult<CreateAdminMutation>;
export type CreateAdminMutationOptions = Apollo.BaseMutationOptions<CreateAdminMutation, CreateAdminMutationVariables>;
export const CreateBteModelDocument = gql`
    mutation CreateBteModel($input: CreateBteInput!) {
  createBteModel(input: $input) {
    errors {
      field
      message
    }
    model {
      _id
      title
      mould_colour
      sound_tube_color
      image
      bte_id
      createdAt
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateBteModelMutationFn = Apollo.MutationFunction<CreateBteModelMutation, CreateBteModelMutationVariables>;

/**
 * __useCreateBteModelMutation__
 *
 * To run a mutation, you first call `useCreateBteModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBteModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBteModelMutation, { data, loading, error }] = useCreateBteModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBteModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateBteModelMutation, CreateBteModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBteModelMutation, CreateBteModelMutationVariables>(CreateBteModelDocument, options);
      }
export type CreateBteModelMutationHookResult = ReturnType<typeof useCreateBteModelMutation>;
export type CreateBteModelMutationResult = Apollo.MutationResult<CreateBteModelMutation>;
export type CreateBteModelMutationOptions = Apollo.BaseMutationOptions<CreateBteModelMutation, CreateBteModelMutationVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($admin: CreateCompanyAdminInput!, $company: CreateCompanyInput!) {
  createCompany(admin: $admin, company: $company) {
    errors {
      field
      message
    }
    company {
      _id
      title
      companyId
      createdAt
      updatedAt
      manufacturers
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      employees {
        _id
        fullName
        fname
        lname
        email
        role
        userId
        isActive
        createdAt
        updatedAt
      }
      street
      postCode
      country
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      admin: // value for 'admin'
 *      company: // value for 'company'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const CreatePrintJobDocument = gql`
    mutation CreatePrintJob($input: CreatePrintJobInput!) {
  createJob(input: $input) {
    errors {
      field
      message
    }
    print_job {
      _id
      title
      printId
      creator {
        fullName
      }
      company {
        title
      }
      orders {
        ear
        order {
          orderId
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePrintJobMutationFn = Apollo.MutationFunction<CreatePrintJobMutation, CreatePrintJobMutationVariables>;

/**
 * __useCreatePrintJobMutation__
 *
 * To run a mutation, you first call `useCreatePrintJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrintJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrintJobMutation, { data, loading, error }] = useCreatePrintJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePrintJobMutation(baseOptions?: Apollo.MutationHookOptions<CreatePrintJobMutation, CreatePrintJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePrintJobMutation, CreatePrintJobMutationVariables>(CreatePrintJobDocument, options);
      }
export type CreatePrintJobMutationHookResult = ReturnType<typeof useCreatePrintJobMutation>;
export type CreatePrintJobMutationResult = Apollo.MutationResult<CreatePrintJobMutation>;
export type CreatePrintJobMutationOptions = Apollo.BaseMutationOptions<CreatePrintJobMutation, CreatePrintJobMutationVariables>;
export const EditCompanyDocument = gql`
    mutation EditCompany($_id: ID!, $input: CreateCompanyInput!) {
  editCompany(_id: $_id, input: $input) {
    company {
      _id
      title
      companyId
      canDownload
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      street
      postCode
      manufacturers
      country
      createdAt
      updatedAt
    }
  }
}
    `;
export type EditCompanyMutationFn = Apollo.MutationFunction<EditCompanyMutation, EditCompanyMutationVariables>;

/**
 * __useEditCompanyMutation__
 *
 * To run a mutation, you first call `useEditCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCompanyMutation, { data, loading, error }] = useEditCompanyMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCompanyMutation(baseOptions?: Apollo.MutationHookOptions<EditCompanyMutation, EditCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCompanyMutation, EditCompanyMutationVariables>(EditCompanyDocument, options);
      }
export type EditCompanyMutationHookResult = ReturnType<typeof useEditCompanyMutation>;
export type EditCompanyMutationResult = Apollo.MutationResult<EditCompanyMutation>;
export type EditCompanyMutationOptions = Apollo.BaseMutationOptions<EditCompanyMutation, EditCompanyMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      field
      message
    }
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const RejectOrderDocument = gql`
    mutation RejectOrder($_id: ID!, $rejectionReason: String!) {
  rejectOrder(_id: $_id, rejectionReason: $rejectionReason) {
    errors {
      field
      message
    }
    order {
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          model
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          model
        }
      }
      status
      orderId
      reason
      rejectionReason
      remake
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      createdAt
      updatedAt
      logs {
        message
        createdAt
      }
    }
  }
}
    `;
export type RejectOrderMutationFn = Apollo.MutationFunction<RejectOrderMutation, RejectOrderMutationVariables>;

/**
 * __useRejectOrderMutation__
 *
 * To run a mutation, you first call `useRejectOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectOrderMutation, { data, loading, error }] = useRejectOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      rejectionReason: // value for 'rejectionReason'
 *   },
 * });
 */
export function useRejectOrderMutation(baseOptions?: Apollo.MutationHookOptions<RejectOrderMutation, RejectOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectOrderMutation, RejectOrderMutationVariables>(RejectOrderDocument, options);
      }
export type RejectOrderMutationHookResult = ReturnType<typeof useRejectOrderMutation>;
export type RejectOrderMutationResult = Apollo.MutationResult<RejectOrderMutation>;
export type RejectOrderMutationOptions = Apollo.BaseMutationOptions<RejectOrderMutation, RejectOrderMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(password: $password, token: $token) {
    errors {
      field
      message
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ToggleActivateUserDocument = gql`
    mutation ToggleActivateUser($userId: ID!) {
  toggleActivateUser(userId: $userId) {
    errors {
      field
      message
    }
  }
}
    `;
export type ToggleActivateUserMutationFn = Apollo.MutationFunction<ToggleActivateUserMutation, ToggleActivateUserMutationVariables>;

/**
 * __useToggleActivateUserMutation__
 *
 * To run a mutation, you first call `useToggleActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleActivateUserMutation, { data, loading, error }] = useToggleActivateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useToggleActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ToggleActivateUserMutation, ToggleActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleActivateUserMutation, ToggleActivateUserMutationVariables>(ToggleActivateUserDocument, options);
      }
export type ToggleActivateUserMutationHookResult = ReturnType<typeof useToggleActivateUserMutation>;
export type ToggleActivateUserMutationResult = Apollo.MutationResult<ToggleActivateUserMutation>;
export type ToggleActivateUserMutationOptions = Apollo.BaseMutationOptions<ToggleActivateUserMutation, ToggleActivateUserMutationVariables>;
export const ToggleActivateDocument = gql`
    mutation ToggleActivate($adminId: ID!) {
  toggleActivate(adminId: $adminId) {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type ToggleActivateMutationFn = Apollo.MutationFunction<ToggleActivateMutation, ToggleActivateMutationVariables>;

/**
 * __useToggleActivateMutation__
 *
 * To run a mutation, you first call `useToggleActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleActivateMutation, { data, loading, error }] = useToggleActivateMutation({
 *   variables: {
 *      adminId: // value for 'adminId'
 *   },
 * });
 */
export function useToggleActivateMutation(baseOptions?: Apollo.MutationHookOptions<ToggleActivateMutation, ToggleActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleActivateMutation, ToggleActivateMutationVariables>(ToggleActivateDocument, options);
      }
export type ToggleActivateMutationHookResult = ReturnType<typeof useToggleActivateMutation>;
export type ToggleActivateMutationResult = Apollo.MutationResult<ToggleActivateMutation>;
export type ToggleActivateMutationOptions = Apollo.BaseMutationOptions<ToggleActivateMutation, ToggleActivateMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($_id: ID!, $input: CreateOrderInput!) {
  updateOrder(_id: $_id, input: $input) {
    errors {
      field
      message
    }
    order {
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          markingDots
          canal
          manufacturer
          model
          hasEngraving
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          markingDots
          canal
          model
          hasEngraving
        }
      }
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      extraDetails {
        comment
        accessories
      }
      orderType
      status
      remake
      reason
      orderId
      bioporShore
      material
      _id
      reOrder
      hasCord
      impressions {
        left
        right
      }
      logs {
        message
        createdAt
      }
      rejectionReason
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    errors {
      field
      message
    }
    file
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const GetAllAdminsDocument = gql`
    query GetAllAdmins($limit: Float!, $page: Float!) {
  getAllAdmins(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    admins {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllAdminsQuery__
 *
 * To run a query within a React component, call `useGetAllAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdminsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllAdminsQuery(baseOptions: Apollo.QueryHookOptions<GetAllAdminsQuery, GetAllAdminsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdminsQuery, GetAllAdminsQueryVariables>(GetAllAdminsDocument, options);
      }
export function useGetAllAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdminsQuery, GetAllAdminsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdminsQuery, GetAllAdminsQueryVariables>(GetAllAdminsDocument, options);
        }
export type GetAllAdminsQueryHookResult = ReturnType<typeof useGetAllAdminsQuery>;
export type GetAllAdminsLazyQueryHookResult = ReturnType<typeof useGetAllAdminsLazyQuery>;
export type GetAllAdminsQueryResult = Apollo.QueryResult<GetAllAdminsQuery, GetAllAdminsQueryVariables>;
export const GetAllCompaniesDocument = gql`
    query GetAllCompanies($limit: Float!, $page: Float!, $sort: Sorting!) {
  getAllCompanies(limit: $limit, page: $page, sort: $sort) {
    errors {
      field
      message
    }
    companies {
      _id
      title
      companyId
      createdAt
      updatedAt
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      street
      postCode
      manufacturers
      country
      canDownload
      assigned {
        _id
        fullName
        fname
        lname
        email
        role
        adminId
        isActive
        createdAt
        updatedAt
      }
    }
    length
    hasMore
  }
}
    `;

/**
 * __useGetAllCompaniesQuery__
 *
 * To run a query within a React component, call `useGetAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompaniesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetAllCompaniesQuery(baseOptions: Apollo.QueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
      }
export function useGetAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
        }
export type GetAllCompaniesQueryHookResult = ReturnType<typeof useGetAllCompaniesQuery>;
export type GetAllCompaniesLazyQueryHookResult = ReturnType<typeof useGetAllCompaniesLazyQuery>;
export type GetAllCompaniesQueryResult = Apollo.QueryResult<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>;
export const GetAllOrdersDocument = gql`
    query GetAllOrders($limit: Float!, $page: Float!) {
  getAllOrders(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    orders {
      direction
      _id
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      creator {
        _id
        fullName
        fname
        lname
        email
        userId
        isActive
        createdAt
        updatedAt
      }
      company {
        _id
        title
        companyId
        street
        postCode
        country
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
      extraDetails {
        comment
        accessories
      }
      impressions {
        left
        right
      }
      logs {
        message
        createdAt
      }
      product {
        left {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
          ear_mould_sn
        }
        right {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
          ear_mould_sn
        }
      }
      patient_name
      orderType
      status
      remake
      reason
      orderId
      bioporShore
      material
      rejectionReason
      reOrder
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers($limit: Float!, $page: Float!) {
  getAllUsers(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    users {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
      company {
        title
        companyId
        _id
        createdAt
        updatedAt
        country
        street
        postCode
        manufacturers
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetSingleCompanyDocument = gql`
    query GetSingleCompany($companyId: ID!) {
  getCompany(companyId: $companyId) {
    errors {
      field
      message
    }
    company {
      _id
      title
      companyId
      createdAt
      updatedAt
      canDownload
      contact_emails
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      street
      postCode
      manufacturers
      country
      employees {
        _id
        fullName
        fname
        lname
        email
        role
        userId
        isActive
        createdAt
        updatedAt
      }
      assigned {
        _id
        fullName
        fname
        lname
        email
        role
        adminId
        isActive
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetSingleCompanyQuery__
 *
 * To run a query within a React component, call `useGetSingleCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetSingleCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetSingleCompanyQuery, GetSingleCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleCompanyQuery, GetSingleCompanyQueryVariables>(GetSingleCompanyDocument, options);
      }
export function useGetSingleCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleCompanyQuery, GetSingleCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleCompanyQuery, GetSingleCompanyQueryVariables>(GetSingleCompanyDocument, options);
        }
export type GetSingleCompanyQueryHookResult = ReturnType<typeof useGetSingleCompanyQuery>;
export type GetSingleCompanyLazyQueryHookResult = ReturnType<typeof useGetSingleCompanyLazyQuery>;
export type GetSingleCompanyQueryResult = Apollo.QueryResult<GetSingleCompanyQuery, GetSingleCompanyQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($orderId: ID!) {
  getOrder(orderId: $orderId) {
    _id
    material
    bioporShore
    createdAt
    updatedAt
    orderId
    patient_name
    remake
    orderType
    reason
    status
    direction
    manufacturer
    filter
    cordColor
    hasCord
    creator {
      fullName
      email
      role
      userId
      isActive
    }
    impressions {
      left
      right
    }
    product {
      left {
        haModel
        serialNumber
        style
        canalLength
        cymbaLength
        ventSize
        quantity
        canal
        soundTube
        surface
        color
        shellId
        manufacturer
        markingDots
        model
        engraving
        hasEngraving
        ear_mould_sn
      }
      right {
        haModel
        serialNumber
        style
        canalLength
        cymbaLength
        ventSize
        quantity
        canal
        soundTube
        surface
        color
        shellId
        manufacturer
        markingDots
        model
        engraving
        hasEngraving
        ear_mould_sn
      }
    }
    deliveryDetails {
      urgent
      standard
      invoiceNumber
    }
    extraDetails {
      comment
      accessories
    }
    company {
      _id
      title
      companyId
      createdAt
      updatedAt
      contactPerson {
        fullName
        email
        phoneNumber
      }
      street
      postCode
      country
    }
    logs {
      message
      createdAt
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetPrintJobDocument = gql`
    query GetPrintJob($print_id: ID!) {
  getPrintJob(print_id: $print_id) {
    errors {
      field
      message
    }
    print_job {
      _id
      title
      printId
      creator {
        _id
        fullName
        fname
        lname
        email
        role
        adminId
        isActive
        createdAt
        updatedAt
      }
      company {
        _id
        title
        companyId
        createdAt
        updatedAt
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
        street
        postCode
        country
      }
      orders {
        order {
          _id
          deliveryDetails {
            urgent
            standard
            invoiceNumber
          }
          extraDetails {
            comment
            accessories
          }
          orderType
          status
          hasCord
          remake
          reason
          orderId
          updatedAt
          bioporShore
          cordColor
          material
          direction
          impressions {
            left
            right
          }
          rejectionReason
          reOrder
          manufacturer
          filter
          product {
            left {
              haModel
              serialNumber
              style
              canalLength
              cymbaLength
              ventSize
              quantity
              color
              surface
              soundTube
              canal
              manufacturer
              markingDots
              hasEngraving
              engraving
              shellId
              model
            }
            right {
              haModel
              serialNumber
              style
              canalLength
              cymbaLength
              ventSize
              quantity
              color
              surface
              soundTube
              canal
              manufacturer
              markingDots
              hasEngraving
              engraving
              shellId
              model
            }
          }
        }
        ear
      }
      print_file
      print_stl
      print_image
      printer
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPrintJobQuery__
 *
 * To run a query within a React component, call `useGetPrintJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrintJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrintJobQuery({
 *   variables: {
 *      print_id: // value for 'print_id'
 *   },
 * });
 */
export function useGetPrintJobQuery(baseOptions: Apollo.QueryHookOptions<GetPrintJobQuery, GetPrintJobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrintJobQuery, GetPrintJobQueryVariables>(GetPrintJobDocument, options);
      }
export function useGetPrintJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrintJobQuery, GetPrintJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrintJobQuery, GetPrintJobQueryVariables>(GetPrintJobDocument, options);
        }
export type GetPrintJobQueryHookResult = ReturnType<typeof useGetPrintJobQuery>;
export type GetPrintJobLazyQueryHookResult = ReturnType<typeof useGetPrintJobLazyQuery>;
export type GetPrintJobQueryResult = Apollo.QueryResult<GetPrintJobQuery, GetPrintJobQueryVariables>;
export const GetAllPrintJobsDocument = gql`
    query GetAllPrintJobs($company_id: ID!, $page: Int!, $limit: Int!, $sort: Sorting!) {
  getAllPrintJobs(
    sort: $sort
    limit: $limit
    page: $page
    company_id: $company_id
  ) {
    errors {
      field
      message
    }
    hasMore
    length
    print_jobs {
      _id
      title
      printId
      creator {
        _id
        fullName
        fname
        lname
        email
        role
        adminId
        isActive
        createdAt
        updatedAt
      }
      company {
        _id
        title
        companyId
        createdAt
        updatedAt
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
        street
        postCode
        country
      }
      orders {
        order {
          _id
          deliveryDetails {
            urgent
            standard
            invoiceNumber
          }
          extraDetails {
            comment
            accessories
          }
          orderType
          status
          hasCord
          remake
          reason
          orderId
          updatedAt
          bioporShore
          cordColor
          material
          direction
          impressions {
            left
            right
          }
          rejectionReason
          reOrder
          manufacturer
          filter
          product {
            left {
              haModel
              serialNumber
              style
              canalLength
              cymbaLength
              ventSize
              quantity
              color
              surface
              soundTube
              canal
              manufacturer
              markingDots
              hasEngraving
              engraving
              shellId
              model
            }
            right {
              haModel
              serialNumber
              style
              canalLength
              cymbaLength
              ventSize
              quantity
              color
              surface
              soundTube
              canal
              manufacturer
              markingDots
              hasEngraving
              engraving
              shellId
              model
            }
          }
        }
        ear
      }
      print_file
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllPrintJobsQuery__
 *
 * To run a query within a React component, call `useGetAllPrintJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPrintJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPrintJobsQuery({
 *   variables: {
 *      company_id: // value for 'company_id'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetAllPrintJobsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPrintJobsQuery, GetAllPrintJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPrintJobsQuery, GetAllPrintJobsQueryVariables>(GetAllPrintJobsDocument, options);
      }
export function useGetAllPrintJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPrintJobsQuery, GetAllPrintJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPrintJobsQuery, GetAllPrintJobsQueryVariables>(GetAllPrintJobsDocument, options);
        }
export type GetAllPrintJobsQueryHookResult = ReturnType<typeof useGetAllPrintJobsQuery>;
export type GetAllPrintJobsLazyQueryHookResult = ReturnType<typeof useGetAllPrintJobsLazyQuery>;
export type GetAllPrintJobsQueryResult = Apollo.QueryResult<GetAllPrintJobsQuery, GetAllPrintJobsQueryVariables>;
export const GetPrintableOrdersDocument = gql`
    query GetPrintableOrders($company_id: ID!) {
  getPrintableOrders(company_id: $company_id) {
    errors {
      field
      message
    }
    orders {
      direction
      _id
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      extraDetails {
        comment
        accessories
      }
      impressions {
        left
        right
      }
      logs {
        message
        createdAt
      }
      product {
        left {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
          model
        }
        right {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
          model
        }
      }
      orderType
      status
      remake
      reason
      orderId
      bioporShore
      material
      rejectionReason
      reOrder
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPrintableOrdersQuery__
 *
 * To run a query within a React component, call `useGetPrintableOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrintableOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrintableOrdersQuery({
 *   variables: {
 *      company_id: // value for 'company_id'
 *   },
 * });
 */
export function useGetPrintableOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetPrintableOrdersQuery, GetPrintableOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrintableOrdersQuery, GetPrintableOrdersQueryVariables>(GetPrintableOrdersDocument, options);
      }
export function useGetPrintableOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrintableOrdersQuery, GetPrintableOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrintableOrdersQuery, GetPrintableOrdersQueryVariables>(GetPrintableOrdersDocument, options);
        }
export type GetPrintableOrdersQueryHookResult = ReturnType<typeof useGetPrintableOrdersQuery>;
export type GetPrintableOrdersLazyQueryHookResult = ReturnType<typeof useGetPrintableOrdersLazyQuery>;
export type GetPrintableOrdersQueryResult = Apollo.QueryResult<GetPrintableOrdersQuery, GetPrintableOrdersQueryVariables>;
export const GetSingleAdminDocument = gql`
    query GetSingleAdmin($adminId: ID!) {
  getSingleAdmin(adminId: $adminId) {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
      companies {
        _id
        title
        companyId
        createdAt
        updatedAt
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
        street
        postCode
        country
        manufacturers
      }
    }
  }
}
    `;

/**
 * __useGetSingleAdminQuery__
 *
 * To run a query within a React component, call `useGetSingleAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleAdminQuery({
 *   variables: {
 *      adminId: // value for 'adminId'
 *   },
 * });
 */
export function useGetSingleAdminQuery(baseOptions: Apollo.QueryHookOptions<GetSingleAdminQuery, GetSingleAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleAdminQuery, GetSingleAdminQueryVariables>(GetSingleAdminDocument, options);
      }
export function useGetSingleAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleAdminQuery, GetSingleAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleAdminQuery, GetSingleAdminQueryVariables>(GetSingleAdminDocument, options);
        }
export type GetSingleAdminQueryHookResult = ReturnType<typeof useGetSingleAdminQuery>;
export type GetSingleAdminLazyQueryHookResult = ReturnType<typeof useGetSingleAdminLazyQuery>;
export type GetSingleAdminQueryResult = Apollo.QueryResult<GetSingleAdminQuery, GetSingleAdminQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    errors {
      field
      message
    }
    user {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
      company {
        _id
        title
        companyId
        street
        postCode
        country
        createdAt
        updatedAt
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;