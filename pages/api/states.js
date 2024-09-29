
import { url } from "url";

// pages/api/states.js
export default function handler(req, res) {
    const states = [
      { name: "Alabama", abbreviation: "AL" },
      { name: "Alaska", abbreviation: "AK" },
      { name: "Colorado", abbreviation: "CO", url: "colorado"},
      { name: "Montana", abbreviation: "CO", url: "montana"},
      { name: "Indiana", abbreviation: "CO", url: "indiana"},
      // ... add all 50 states here
      { name: "Wyoming", abbreviation: "WY" }
    ];
    
    res.status(200).json(states);
  }