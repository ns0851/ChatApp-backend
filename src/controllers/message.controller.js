import User from "../models/user.model.js";
import messageModel from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error from message controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWithId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, recieverId: userToChatWithId },
        { senderId: userToChatWithId, recieverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error from message Controller");
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const myId = req.user._id;

    let imageURL;   
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId: myId,
      recieverId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    // apply real time using WebSocket.io here later
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
