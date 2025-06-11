import { CreateProductModel } from "./CreateProductModel";

export interface UpdateProductModel extends CreateProductModel {
    id: number;
}