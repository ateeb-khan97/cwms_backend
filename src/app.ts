import express, { Application } from "express";
import errorHandler from "./middlewares/error.middleware";
import bodyParser from "body-parser";
import sequelize from "./db_config";
import dotenv from "dotenv";
import cors from "cors";

//
dotenv.config();

const app: Application = express();
//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "10mb",
  })
);

//
//

import CategoryRoutes from "./modules/category/category.route";
import CustomerRoutes from "./modules/customer/customer.route";
import UserRoutes from "./modules/user/user.route";
import ManufacturerRoutes from "./modules/manufacturer/manufacturer.route";
import VendorRoutes from "./modules/vendor/vendor.route";
import ProductRoutes from "./modules/product/product.route";
import PurchaseOrderRoutes from "./modules/purchase_order/purchase_order.route";
import LocationRoutes from "./modules/location/location.route";
import GrnRoutes from "./modules/grn/grn.route";
import PathRoutes from "./modules/wms/path/path.route";
import RackRoutes from "./modules/wms/rack/rack.route";
import SideRoutes from "./modules/wms/side/side.route";
import BinRoutes from "./modules/wms/bin/bin.route";
import BulkUploadRoutes from "./modules/bulk_upload/bulk_upload.route";
import InwardRoutes from "./modules/inv_sku/inv_sku.route";

// for parsing multipart/form-data
app.use(express.static("public"));
//
app.use("/api/category/", CategoryRoutes);
app.use("/api/customer/", CustomerRoutes);
app.use("/api/user/", UserRoutes);
app.use("/api/manufacturer/", ManufacturerRoutes);
app.use("/api/vendor/", VendorRoutes);
app.use("/api/product/", ProductRoutes);
app.use("/api/purchase_order/", PurchaseOrderRoutes);
app.use("/api/location/", LocationRoutes);
app.use("/api/grn/", GrnRoutes);
app.use("/api/wms/path/", PathRoutes);
app.use("/api/wms/shelf/", RackRoutes);
app.use("/api/wms/side/", SideRoutes);
app.use("/api/wms/bin/", BinRoutes);
app.use("/api/bulk_upload/", BulkUploadRoutes);
app.use("/api/inward/", InwardRoutes);
//
const port: number = +process.env.PORT! || 3001;
//
app.use(errorHandler);
//
app.listen(port, function () {
  // sequelize.sync({ force: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  // sequelize.sync({ alter: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  // sequelize.sync().then(() => {
  //   console.log("Database Synced!");
  // });
  //
  console.clear();
  sequelize.authenticate();
  console.log("Database Connected!");
  console.log(`Server started at port ${port} !`);
});
