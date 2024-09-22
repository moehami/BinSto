// pages/api/states.js
export default function handler(req, res) {
    const states = [
      { name: "Alabama", abbreviation: "AL" },
      { name: "Alaska", abbreviation: "AK" },
      // ... add all 50 states here
      { name: "Wyoming", abbreviation: "WY" }
    ];
    
    res.status(200).json(states);
  }