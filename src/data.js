export const vue = {
  labels: [
    "Jan",
    "Fev",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Inscription",
      data: [500, 300, 100, 50, 435, 880, 250, 300, 150, 400, 700, 600],
      backgroundColor: ["#0082c8"],
      hoverOffset: 4,
      borderRadius: 7,
      barPercentage: 0.2,
    },
  ],
};

export const optionsVue = {
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0,
      loop: true,
    },
  },
  plugins: {
    legend: "false",
    title: {
      position: "left",
      display: true,
      text: "Custom Chart Title",
    },
    colors: {
      forceOverride: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 60,
      ticks: {
        stepSize: 20,
        callback: (value) => value,
      },
      grid: {
        borderDash: [10],
      },
    },
  },
  responsive: true,
};

export const items = [
  {
    name: "Jean",
    color: "rgb(255, 99, 132)",
  },
  {
    name: "Alloco",
    color: "rgb(54, 162, 235)",
  },
  {
    name: "Frites",
    color: "rgb(255, 205, 86)",
  },
];

export let items2 = [
  {
    name: "Terminé",
    color: "#00ced1",
  },
  {
    name: "En cours",
    color: "rgb(255, 205, 86)",
  },
];

export const produit = {
  labels: ["Terminé", "En cours"],
  datasets: [
    {
      label: "My First Dataset",
      data: [1, 1],
      backgroundColor: ["#00ced1", "rgb(255, 205, 86)"],
      hoverOffset: 4,
    },
  ],
};

export const optionsProduit = {
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0,
      loop: true,
    },
  },
  plugins: {
    legend: "true",
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 60,
      ticks: {
        stepSize: 20,
        callback: (value) => value,
      },
      grid: {
        borderDash: [10],
      },
    },
  },
  responsive: true,
};
