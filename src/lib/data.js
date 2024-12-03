// src/lib/data.js

// Main Topics with Subtopics
export const data = [
  {
    title: "Number and Place Value",
    description: "Understand the value of digits in numbers.",
    path: "/number-place-value",
    type: "topic",
    subtopics: [
      {
        title: "Base-10 Blocks",
        description: "Visualize numbers using base-10 blocks.",
        path: "/number-place-value/base-10-blocks",
        type: "subtopic",
      },
      {
        title: "Number Line",
        description: "Understand numbers through position on a line.",
        path: "/number-place-value/number-line",
        type: "subtopic",
      },
      {
        title: "Place Value Chart",
        description: "Understand the place value system.",
        path: "/number-place-value/place-value-chart",
        type: "subtopic",
      },
      // Add more subtopics as needed
    ],
  },
  {
    title: "Addition and Subtraction",
    description: "Explore addition and subtraction concepts.",
    path: "/addition-subtraction",
    type: "topic",
    subtopics: [
      // Add more subtopics as needed
    ],
  },
  {
    title: "Multiplication and Division",
    description: "Delve into multiplication and division concepts.",
    path: "/multiplication-division",
    type: "topic",
    subtopics: [
      {
        title: "Arrays",
        description: "Visualize multiplication and division using arrays.",
        path: "/multiplication-division/arrays",
        type: "subtopic",
      },
      // Add more subtopics as needed
    ],
  },
  {
    title: "Fractions",
    description: "Visualise fraction concepts",
    path: "/fractions",
    type: "topic",
    subtopics: [
      // Add more subtopics as needed
    ],
  },
  {
    title: "Geometry",
    description: "Discover geometric representations",
    path: "/geometry",
    type: "topic",
    subtopics: [
      // Add more subtopics as needed
    ],
  },
  {
    title: "Measurement",
    description: "Scaffolds to support understanding of measurement",
    path: "/measurement",
    type: "topic",
    subtopics: [
      // Add more subtopics as needed
    ],
  },
  {
    title: "Statistics",
    description: "Scaffolds to support understanding of statistics",
    path: "/statistics",
    type: "topic",
    subtopics: [
      // Add more subtopics as needed
    ],
  },
  // Add other main topics in a similar fashion
];

// Function to flatten topics and subtopics for search
const flattenData = () => {
  let flatList = [];
  data.forEach((topic) => {
    // Add main topic
    flatList.push({
      title: topic.title,
      description: topic.description,
      path: topic.path,
      type: topic.type,
    });
    // Add subtopics
    topic.subtopics.forEach((sub) => {
      flatList.push({
        title: sub.title,
        description: sub.description,
        path: sub.path,
        type: sub.type,
        parent: topic.title, // Optional: For reference
      });
    });
  });
  return flatList;
};

// Export the flattened data
export const flatData = flattenData();
