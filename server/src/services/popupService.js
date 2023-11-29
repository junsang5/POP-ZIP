const Popup = require("../models/Popup");
const {Op} = require('sequelize');

const createPopup = async (popupData) => {
  const newPopup = await Popup.create(popupData);
  return newPopup;
};

const getActivePopups = async (req, res) => {
  try {
    const popups = await Popup.findAll({
      where: {
        end_date: {
          [Op.gte]: new Date()
        }
      }
    });
    return popups;
  } catch (error) {
    console.error("Error during fetching active popups:", error);
    throw error;
  }
};

const getAllPopups = async () => {
  try {
    const popups = await Popup.findAll();
    console.log('fetching popups!!');
    return popups;
  } catch (error) {
    console.error("Error during fetching popups:", error);
    throw error;
  }
};

module.exports = {
  createPopup,
  getActivePopups,
  getAllPopups,
};
