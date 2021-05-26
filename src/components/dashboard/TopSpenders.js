import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { URD } from "../layouts/Config";

const TopSpenders = ({ company }) => {
  const [spenders, setSpenders] = useState([]);

  useEffect(() => {
    axios
      .get(`${URD}/spenders/${company}`)
      .then((response) => {
        setSpenders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let spenderUnits = [];
  for (let i = 0; i < spenders.length; i++) {
    spenderUnits.push(spenders[i].dept_name);
  }

  let spenderAmount = [];
  for (let i = 0; i < spenders.length; i++) {
    spenderAmount.push(spenders[i].price);
  }

  // console.log(spenderAmount);

  const data = {
    labels: spenderUnits,
    datasets: [
      {
        label: "Top 5 Spenders",
        data: spenderAmount,
        borderColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: `Top 5 spenders for last month in Naira (${company})`,
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default TopSpenders;
