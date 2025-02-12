export default {
  transform: {},
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/jest.setup.js"],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // .js'yi buradan kaldırdık!
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};
