import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Category from "./modules/category/category.model";
import Customer from "./modules/customer/customer.model";
import User from "./modules/user/user.model";
import Manufacturer from "./modules/manufacturer/manufacturer.model";
import Vendor from "./modules/vendor/vendor.model";
import Product from "./modules/product/product.model";
import ProductCategory from "./modules/product/product-category.model";
import ProductConversion from "./modules/product/product-conversion.model";
import ProductGenericFormula from "./modules/product/product-generic_formula.model";
import ProductTag from "./modules/product/product-tag.model";
import ProductVendor from "./modules/product/product-vendor.model";
import VendorManufacturer from "./modules/vendor/vendor-manufacturer.model";
import VendorTax from "./modules/vendor/vendor-tax.model";
import PurchaseOrder from "./modules/purchase_order/purchase_order.model";
import PurchaseOrderDetail from "./modules/purchase_order/purchase_order-detail.model";
import Location from "./modules/location/location.model";
import Grn from "./modules/grn/grn.model";
import Bin from "./modules/wms/bin/bin.model";
import Rack from "./modules/wms/rack/rack.model";
import Path from "./modules/wms/path/path.model";
import Side from "./modules/wms/side/side.model";
import InventorySku from "./modules/inv_sku/entities/InventorySKU.entity";
import InventorySkuDetail from "./modules/inv_sku/entities/InventoryDetail.entity";
import InwardMaster from "./modules/inv_sku/entities/InwardMaster.entity";
dotenv.config();
//
function customLogger(queryString, queryObject) {
  if (queryString != undefined) {
    console.log(queryString); // outputs a string
  }
  if (queryObject.bind != undefined) {
    console.log(queryObject.bind); // outputs an array
  }
}
//
const sequelize: Sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_URL,
  logging: customLogger,
  logQueryParameters: true,
  models: [
    Customer,
    Location,
    User,
    Category,
    Manufacturer,
    Vendor,
    VendorTax,
    VendorManufacturer,
    Product,
    ProductCategory,
    ProductConversion,
    ProductGenericFormula,
    ProductTag,
    ProductVendor,
    PurchaseOrder,
    PurchaseOrderDetail,
    Grn,
    Bin,
    Rack,
    Path,
    Side,
    InventorySku,
    InventorySkuDetail,
    InwardMaster,
  ],
});

export default sequelize;
