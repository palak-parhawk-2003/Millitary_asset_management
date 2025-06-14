const Asset = require("../models/Asset");
const Purchase = require("../models/Purchase");
const Transfer = require("../models/Transfer");
const Assignment = require("../models/Assignment");
const Expenditure = require("../models/Expenditure");
const mongoose = require("mongoose");
const Base = require("../models/Base");

exports.getDashboardMetrics = async (req, res) => {
  try {
    const { baseId, assetId, startDate, endDate } = req.query;
    let baseObjectId, assetObjectId;
    try {
      if (baseId) {
        baseObjectId = new mongoose.Types.ObjectId(baseId);
      }
      if (assetId) {
        assetObjectId = new mongoose.Types.ObjectId(assetId);
      }
    } catch (err) {
      return res.status(400).json({ error: "Invalid base or asset ID format" });
    }
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.date = {};
      if (startDate) dateFilter.date.$gte = new Date(startDate);
      if (endDate) dateFilter.date.$lte = new Date(endDate);
    }

    const getTotal = async (model, match) => {
      const result = await model.aggregate([
        { $match: match },
        { $group: { _id: null, total: { $sum: "$quantity" } } },
      ]);
      return result.length > 0 ? result[0].total : 0;
    };
    const commonMatch = {
      ...(baseObjectId && { base: baseObjectId }),
      ...(assetObjectId && { asset: assetObjectId }),
      ...(dateFilter.date && { date: dateFilter.date }),
    };
    const purchaseQuantity = await getTotal(Purchase, commonMatch);
    const transferInQuantity = await getTotal(Transfer, {
      ...(assetObjectId && { asset: assetObjectId }),
      ...(dateFilter.date && { date: dateFilter.date }),
      ...(baseObjectId && { toBase: baseObjectId }),
    });
    const transferOutQuantity = await getTotal(Transfer, {
      ...(assetObjectId && { asset: assetObjectId }),
      ...(dateFilter.date && { date: dateFilter.date }),
      ...(baseObjectId && { fromBase: baseObjectId }),
    });
    const assignedQuantity = await getTotal(Assignment, commonMatch);
    const expendedQuantity = await getTotal(Expenditure, commonMatch);
    const netQuantity =
      purchaseQuantity + transferInQuantity - transferOutQuantity;
    const openingBalance = 1000;
    const closingBalance =
      openingBalance + netQuantity - assignedQuantity - expendedQuantity;

    const transfersToBase = await Transfer.find()
      .populate("asset", "name")
      .populate("toBase", "name")
      .populate("createdBy", "username");
    const transfersFromBase = await Transfer.find()
      .populate("asset", "name")
      .populate("fromBase", "name")
      .populate("createdBy", "username");
    const purchase = await Purchase.find()
      .populate("asset", "name")
      .populate("base", "name")
      .populate("createby", "username");

    const bases = await Base.find();
    const assets = await Asset.find();
    res.json({
      filtersData: {
        base: bases,
        assets,
      },
      dashboardData: {
        openingBalance,
        netQuantity: {
          total: netQuantity,
          toBase: transfersToBase,
          fromBase: transfersFromBase,
          purchase: purchase,
        },
        assigned: assignedQuantity,
        expended: expendedQuantity,
        closingBalance,
        totalPurchased: purchaseQuantity,
      },
    });
  } catch (err) {
    console.error("Error fetching dashboard metrics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
