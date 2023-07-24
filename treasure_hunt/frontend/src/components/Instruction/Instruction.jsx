import "./Instruction.css"; //import css file for styling

import Api from "../../Api";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Instruction = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const fetchQuesAndProceed = async () => {
    setLoader(true);
    try {
      const res = await axios.get(Api.getAllQues, {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (res) {
        localStorage.setItem("questions", JSON.stringify(res.data));
        localStorage.setItem("totalScore", 0);
        localStorage.setItem("timeTaken", 0);
        for (let i = 1; i <= 5; i++) {
          localStorage.setItem(`point${i}`, 0);
        }
        localStorage.setItem("currentURL", "/Puzzle1");
        navigate("/Puzzle1");
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setLoader(false);
  };
  return (
    <div className="instruction-container">
      <h1>Welcome to Treasure Hunt Game !</h1>
      <br />
      <ul>
        <li>
          The town of Silverwood was known for its quiet streets and peaceful
          atmosphere, but all that changed when an old man named John Mathews
          arrived in town. John was a reclusive figure who rarely ventured out
          of his small cabin in the woods. He was rumored to have spent his
          entire life exploring the world and uncovering hidden treasures. John
          had a wooden box in which he kept all his lifetime earnings and
          treasure.
        </li>
        <li>
          One day, when he was walking through the woods, two mysterious men
          came out of nowhere. They stabbed him revealing themselves to be a
          part of underground org that were after John's treasure. John was
          badly injured but managed to beat the men and run from the point
          towards the town.
        </li>
        <li>
          You happened to be walking by the road when John appeared in front of
          you. He tells you about his lifelong treasure location. He hands you a
          box and gave you a location stating you would find a map on the point
          - a map that will lead you on a wild adventure : through the forest
          across the town, as they piece together a series of cryptic clues that
          led you closer to the treasure.
        </li>
        <li>
          But, to find that treasure box is not so easy , you have to encounter
          strange puzzles and riddles that test your wits and ingenuity to reach
          to the final treasure. So, are you ready to test your presence of mind
          with a sharp analytical approach at different levels to solve the
          puzzle and find the epic treasure at the end of the game !!!!
        </li>
      </ul>

      {loader && (
        <button disabled={true} className="proceed-button">
          <center>
            <ClipLoader color="white" size={25} />
          </center>
        </button>
      )}
      {!loader && (
        <button className="proceed-button" onClick={fetchQuesAndProceed}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default Instruction;
