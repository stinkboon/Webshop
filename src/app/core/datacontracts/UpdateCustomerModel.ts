import { CreateCustomerModel } from "./CreateCustomerModel";

export interface UpdateCustomerModel extends CreateCustomerModel {
    id: number;
}