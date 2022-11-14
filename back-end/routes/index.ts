import * as express from "express";
import { Controller } from "../controller";

const routes = express.Router();

routes.post("/create-delivery-address", Controller.post.createDeliveryAddress);
routes.post("/coincidence-pass", Controller.get.getCoincidencePass);
routes.post("/personal-data", Controller.post.createPersonalData);
routes.post("/producttobasket", Controller.post.productToBasket);
routes.post("/getPersonalData", Controller.get.getPersonalData);
routes.post("/registration", Controller.post.createUser);
routes.post("/authorize", Controller.post.authorize);
routes.post("/review", Controller.post.createReview);

routes.get("/wok", Controller.get.getWok);
routes.get("/sets", Controller.get.getSets);
routes.get("/rolls", Controller.get.getRolls);
routes.get("/sushi", Controller.get.getSushi);
routes.get("/pizzas", Controller.get.getPizzas);
routes.get("/stocks", Controller.get.getStocks);
routes.get("/reviews", Controller.get.getReviews);
routes.get("/cornDogs", Controller.get.getCornDogs);
routes.get("/beverages", Controller.get.getBeverages);
routes.get("/delivery-address", Controller.get.getDeliveryAddress);
routes.get("/search-product", Controller.get.getAllProductBySearch);

routes.delete("/delete-user-address", Controller.delete.deleteAddress);
routes.delete("/delete-user-account", Controller.delete.deleteAccount);

routes.put("/edit-userInfo", Controller.put.editUserInfo);
routes.put("/edit-user-password", Controller.put.editUserPassword);
routes.put("/edit-delivery-address", Controller.put.editDeliveryAddress);

export default routes;
