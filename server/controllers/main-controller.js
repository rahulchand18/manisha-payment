const axios = require("axios");

const Match = require("../models/match.model");
const Tournament = require("../models/tournament.model");
const Teams = require("../models/team.model");
const PredictionModel = require("../models/prediction.model");
const PointsTable = require("../models/points-table.model");
const User = require("../models/user");
const getAllSeries = async (req, res) => {
  try {
    const { history } = req.query;
    let query = {};
    if (history) {
      query = {
        history: history === "true",
      };
    }

    const matches = await Match.find(query).sort({ date: 1 });
    if (matches && matches.length) {
      return res.status(200).send({ data: matches });
    } else {
      return res.status(500).send(false);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body.match);
    if (match) {
      return res.status(201).send({ message: "Match Created" });
    } else {
      return res.status(405).send({ message: "Error Creating Match" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const _id = req.params.id;
    const { updatedData } = req.body;
    console.log(updatedData);
    const updatedResponse = await Match.findOneAndUpdate(
      { _id },
      { $set: updatedData }
    );
    if (updatedResponse) {
      return res.status(200).json({ data: updatedResponse });
    } else {
      return res.status(500).send({ message: "Update Failed" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createNewTournament = async (req, res) => {
  try {
    const { tournament } = req.body;
    const existing = await Tournament.findOne({
      $or: [
        { name: tournament.name },
        { tournamentId: tournament.tournamentId },
      ],
    });
    if (existing) {
      return res.status(422).send({ message: "Already Existing" });
    }
    const createdTournament = await Tournament.create(tournament);
    if (createdTournament) {
      return res.status(201).send({ data: createdTournament });
    } else {
      return res.status(405).send({ message: "Failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const { type, email } = req.params;
    let query;
    console.log(type);
    if (type === "myCreated") {
      query = [
        {
          $match: {
            tournamentAdmin: email,
          },
        },
      ];
    } else {
      query = [
        { $unwind: "$players" },
        {
          $match: {
            "players.email": email,
            "players.status": "accepted",
          },
        },
      ];
    }
    const allTournaments = await Tournament.aggregate(query);
    if (allTournaments && allTournaments.length) {
      return res.status(200).send({ data: allTournaments });
    } else {
      return res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const joinTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { email, name } = req.body;
    const tournament = await Tournament.findOne({ tournamentId });
    if (!tournament) {
      return res.status(404).send({ message: "Tournament does not exist!" });
    }
    const tournamentJoined = await Tournament.aggregate([
      { $match: { tournamentId } },
      { $unwind: "$players" },
      { $match: { "players.email": email } },
    ]);
    console.log(tournamentJoined);
    if (tournamentJoined && tournamentJoined.length) {
      return res
        .status(405)
        .send({ message: "You have already joined the tournament" });
    }
    const newPlayer = { email, playerName: name };
    const updateResponse = await Tournament.updateOne(
      { tournamentId },
      { $push: { players: newPlayer } }
    );
    if (updateResponse) {
      return res.status(200).send({ message: "Request Sent to admin." });
    } else {
      return res.status({ message: "Failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const showAllRequests = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const requests = await Tournament.aggregate([
      {
        $match: { tournamentId },
      },
      {
        $unwind: "$players",
      },
      {
        $match: {
          status: "pending",
        },
      },
    ]);

    if (requests && requests.length) {
      return res.status(200).send({ data: requests });
    } else {
      return res.status(404).send({ message: "No Request Found!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error in fetching requests" });
  }
};

const updateRequest = async (req, res) => {
  try {
    const { requestId, tournamentId, accept } = req.params;

    const updateResponse = await Tournament.updateOne(
      { tournamentId, "players.email": requestId },
      {
        $set: {
          "players.$.status": accept === "true" ? "accepted" : "rejected",
        },
      }
    );

    if (updateResponse) {
      return res.status(200).send({ message: "Request Accepted" });
    } else {
      return res.status(405).send({ message: "Failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const getTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ tournamentId });
    return res.send({ data: tournament });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const getAllTeamInfo = async (req, res) => {
  try {
    const teams = await Teams.find();
    return res.send({ data: teams });
  } catch (error) {
    return res.status(500).send({ message: "false" });
  }
};

const updateActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    const updated = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { active } }
    );
    return res.send(updated);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateCompleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { history } = req.body;
    console.log(history);
    const updated = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { history } }
    );
    console.log(updated);
    return res.send(updated);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPrediction = async (req, res) => {
  try {
    const { matchId, email } = req.params;
    const prediction = await PredictionModel.findOne({ matchId, email });
    if (prediction) {
      return res.status(200).send({ data: prediction });
    } else {
      return res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPlayers = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findOne({ matchId });
    if (match) {
      const teams = await Teams.find({
        shortname: { $in: [match.t1, match.t2] },
      });
      return res.send({ data: teams });
    } else {
      return res.status(500).send("error");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createPrediction = async (req, res) => {
  try {
    const { matchId, email } = req.body;
    const existingPrediction = await PredictionModel.findOne({
      matchId,
      email,
    });
    if (existingPrediction) {
      return res
        .status(409)
        .send({ message: "You have already predicted for this match" });
    } else {
      await PredictionModel.create(req.body);
      return res.status(201).send({ message: "Prediction Added" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updatePrediction = async (req, res) => {
  try {
    const { matchId, email, ...restData } = req.body;
    const updateResponse = await PredictionModel.updateOne(
      { matchId, email },
      { $set: restData }
    );
    if (updateResponse) {
      return res.status(200).send({ message: "Updated" });
    } else {
      return res.status(409).send(false);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const calculatePoints = async (req, res) => {
  try {
    const { matchId } = req.params;
    let predictions = await PredictionModel.find({ matchId });
    const match = await Match.findOne({ matchId });
    if (predictions && predictions.length) {
      for (const prediction of predictions) {
        const existingCalculation = await PointsTable.findOne({
          matchId,
          email: prediction.email,
        });
        const tableDocument = {
          matchId,
          date: match.date,
          email: prediction.email,
          tossWinner: match.tossWinner === prediction.tossWinner ? 1 : 0,
          matchWinner: match.matchWinner === prediction.matchWinner ? 5 : 0,
          manOfTheMatch:
            match.manOfTheMatch === prediction.manOfTheMatch ? 5 : 0,
          mostCatches: match.mostCatches?.includes(prediction.mostCatches)
            ? 2
            : 0,
          mostRuns: match.mostRuns?.includes(prediction.mostRuns) ? 2 : 0,
          mostWickets: match.mostWickets?.includes(prediction.mostCatches)
            ? 2
            : 0,
          mostSixes: match.mostSixes?.includes(prediction.mostSixes) ? 3 : 0,
        };
        tableDocument.total =
          tableDocument.manOfTheMatch +
          tableDocument.matchWinner +
          tableDocument.mostCatches +
          tableDocument.mostRuns +
          tableDocument.mostSixes +
          tableDocument.mostWickets +
          tableDocument.tossWinner;
        console.log(existingCalculation);
        if (!existingCalculation) {
          await PointsTable.create(tableDocument);
        } else {
          await PointsTable.updateOne(
            { matchId, email: prediction.email },
            { $set: tableDocument }
          );
        }
      }
      return res.send(true);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPointsTable = async (req, res) => {
  try {
    const { matchId } = req.params;
    const points = await PointsTable.find({ matchId }).sort({ total: -1 });
    if (points && points.length) {
      const players = [];
      for (const player of points) {
        const p = await User.findOne({ email: player.email });
        players.push({
          player,
          fullName: p.firstName + " " + p.lastName,
        });
      }
      return res.status(200).send({ data: players });
    } else {
      return res.status(404).send("No predictions found for this match");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllPredictions = async (req, res) => {
  try {
    const { matchId } = req.params;
    const predictions = await PredictionModel.find({ matchId });
    if (predictions && predictions.length) {
      const players = [];
      for (const player of predictions) {
        const p = await User.findOne({ email: player.email });
        players.push({
          player,
          fullName: p.firstName + " " + p.lastName,
        });
      }
      return res.status(200).send({ data: players });
    } else {
      return res.status(404).send("No predictions found for this match");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const mainController = {
  getAllSeries,
  createMatch,
  updateMatch,
  createNewTournament,
  getAllTournaments,
  joinTournament,
  showAllRequests,
  updateRequest,
  getTournamentById,
  getAllTeamInfo,
  updateActiveStatus,
  getPrediction,
  getPlayers,
  createPrediction,
  updatePrediction,
  calculatePoints,
  getPointsTable,
  getAllPredictions,
  updateCompleteStatus,
};

module.exports = mainController;
