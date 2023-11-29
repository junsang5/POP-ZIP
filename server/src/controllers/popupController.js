const popupService = require("../services/popupService");

exports.createPopup = async (req, res) => {
  try {
    const popup = await popupService.createPopup(req.body);
    res.status(201).json(popup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getActivePopups = async (req, res) => {
  try {
    const popups = await popupService.getActivePopups();
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPopups = async (req, res) => {
  try {
    const popups = await popupService.getAllPopups();
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
