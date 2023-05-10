const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description:
      "This documentation provides a brief description of an Express API for creating, reading, updating and deleting contacts."
  },
  host: "cse341-tk0r.onrender.com",
  schemes: ["http"],
  definitions: {
    Contact: {
      $firstName: "John",
      $lastName: "Doe",
      $email: "john.doe@gmail.com",
      $favoriteColor: "red",
      $birthday: "1990-01-01"
    }
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import("./server.js"); // Your project's root file
});
