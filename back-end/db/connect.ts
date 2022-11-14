import * as FyleSync from "lowdb/adapters/FileSync";
import * as dbInterface from "./interfaces";
import * as lowDb from "lowdb";
import { v4 } from "uuid";

const db = lowDb(new FyleSync("./db/db.json"));

export class DbModel {
  /// get ///
  public static async getPersonalData(data: dbInterface.ICurrentPersonalInfo) {
    const result = await db.get("usersPersonalInfo");
    const searchCurrentUser = await result.find(
      (usersInfo) => usersInfo.id === data.id
    );
    return searchCurrentUser;
  }

  public static async getCoincidencePass(
    data: dbInterface.ICoincidencePassword
  ) {
    const allUsers = await db.get("users").value();
    const searchCurrentUser = await allUsers.find(
      (users) => users.id === data.id
    );
    const coincidencePass = searchCurrentUser.password === data.oldPassword;
    return coincidencePass;
  }

  public static async getDeliveryAddress(currentId: string) {
    let allUsersDelAddress = await db.get("usersDeliveryAddress").value();
    const currentUserAddress = await allUsersDelAddress.filter(
      (allAddress) => allAddress.id === currentId
    );
    if (currentUserAddress !== undefined) {
      return currentUserAddress;
    } else return false;
  }

  public static async getReviews() {
    const allreviews = await db.get("reviews").value();
    return allreviews;
  }
  public static async getBeverages() {
    let result = await db.get("beverages").value();
    return result;
  }
  public static async getCornDogs() {
    let result = await db.get("cornDogs").value();
    return result;
  }
  public static async getPizzas() {
    let result = await db.get("pizzas").value();
    return result;
  }
  public static async getStocks() {
    let result = await db.get("stocks").value();
    return result;
  }
  public static async getSushi() {
    let result = await db.get("sushi").value();
    return result;
  }
  public static async getRolls() {
    let result = await db.get("rolls").value();
    return result;
  }
  public static async getSets() {
    let result = await db.get("sets").value();
    return result;
  }
  public static async getWok() {
    let result = await db.get("wok").value();
    return result;
  }
  public static async getAllProductBySearch() {
    let resultSeven = await db.get("beverages").value();
    let resultSix = await db.get("cornDogs").value();
    let resultEight = await db.get("stocks").value();
    let resultThour = await db.get("rolls").value();
    let resultOne = await db.get("pizzas").value();
    let resultFive = await db.get("sushi").value();
    let resultThree = await db.get("wok").value();
    let resultTwo = await db.get("sets").value();
    let result = [
      ...resultOne,
      ...resultTwo,
      ...resultThree,
      ...resultThour,
      ...resultFive,
      ...resultSix,
      ...resultSeven,
      ...resultEight,
    ];
    return result;
  }
  /// get ///

  /// delete ///
  public static async deleteUserPeronalInfo(
    currentUserId: string,
    type: string
  ) {
    const deleted = await db.get(type).remove({ id: currentUserId }).write();
    const isSuccessDeleted = await deleted.find(
      (userPersonalInfo) => userPersonalInfo.id === currentUserId
    );
    if (isSuccessDeleted !== undefined) {
      return true;
    } else false;
  }

  public static async deleteUserDeliveryInfo(
    currentUserId: string,
    type: string
  ) {
    const deleted = await db.get(type).remove({ id: currentUserId }).write();
    const isSuccessDeleted = await deleted.find(
      (userDeliveryInfo) => userDeliveryInfo.id === currentUserId
    );
    if (isSuccessDeleted !== undefined) {
      return true;
    } else false;
  }

  public static async deleteAddress(numberInAddress: string, type: string) {
    const deleted = await db
      .get(type)
      .remove({ numberInAddress: numberInAddress })
      .write();
    const isSuccessDeleted = await deleted.find(
      (currentNumberInAddress) =>
        currentNumberInAddress.numberInAddress === numberInAddress
    );
    if (isSuccessDeleted !== undefined) {
      return true;
    } else false;
  }

  public static async deleteAccount(currentUserId: string, type: string) {
    const deletedUser = await db
      .get(type)
      .remove({ id: currentUserId })
      .write();
    const isSuccessDeleted = await deletedUser.find(
      (currentUser) => currentUser.id === currentUserId
    );
    if (isSuccessDeleted !== undefined) {
      return true;
    } else false;
  }
  /// delete ///

  /// put ///
  public static async editUserPassword(id: string, type: string, data: any) {
    let edited = await db.get(type).find({ id: id }).assign(data).write();
    return edited;
  }

  public static async editUserInfo(id: string, type: string, data: any) {
    let edited = await db.get(type).find({ id: id }).assign(data).write();
    return edited;
  }

  public static async editDeliveryAddress(
    numberInAddress: string,
    type: string,
    data: any
  ) {
    let edited = await db
      .get(type)
      .find({ numberInAddress: numberInAddress })
      .assign(data)
      .write();
    return edited;
  }
  /// put ///

  /// post ///
  public static async createDeliveryAddress(
    data: dbInterface.IDeliveryAddress
  ) {
    let callback = await db
      .get("usersDeliveryAddress")
      .push({
        id: data.id,
        numberInAddress: v4(),
        deliveryAddress: data.newAddress,
      })
      .write();
    return callback;
  }
  public static async addProduct(data: dbInterface.ICard) {
    let callback = await db
      .get("basket")
      .push({
        id: data.id,
        img: data.img,
        name: data.name,
        info: data.info,
        price: data.price,
      })
      .write();
    return callback;
  }
  public static async addReview(data: dbInterface.IReview) {
    let callback = await db
      .get("reviews")
      .push({
        id: data.id,
        name: data.name,
        reviews: data.reviews,
        stars: data.stars,
        date: data.date,
      })
      .write();
    return callback;
  }
  public static async addPersonalData(data: dbInterface.IPersonalInfo) {
    let callback = await db
      .get("usersPersonalInfo")
      .push({
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        telefone: data.telefone,
      })
      .write();
    return callback;
  }
  public static async addUser(data: dbInterface.IUser) {
    let callback;
    let users = await db.get("users").write();
    const isRetry = users.find((obj) => obj.login === data.login);
    if (!isRetry) {
      callback = await db
        .get("users")
        .push({
          id: v4(),
          login: data.login,
          password: data.password,
        })
        .write();
    }
    return callback;
  }
  public static async outUser() {
    const users = await db.get("users").value();
    return users;
  }
  /// post ///
}
