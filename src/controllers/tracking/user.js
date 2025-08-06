import { Customer, DeliveryPartner } from "../../models/index.js";

export const updateUser = async () => {
  try {
    const { userId } = req.user;
    const updateData = req.body;

    let user =
      (await Customer.findById(userId)) || DeliveryPartner.findById(userId);

    if (!user) {
      return reply.status(404).send({ message: "user not found" });
    }

    let userModel;

    if (user.role === "Customer") {
      userModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      userModel = DeliveryPartner;
    } else {
      return reply.status(500).send({ message: "Invalid user role" });
    }

    const updatedUser = await userModel.findById(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!userModel) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.send({
      message: "User fetched successfully",
      user: updatedUser,
    });
  } catch (error) {
    return reply.status(500).send({ message: "Failed to update user", error });
  }
};
