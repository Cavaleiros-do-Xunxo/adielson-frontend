let config = {
  API_URL: "",
};

if (process.env.NODE_ENV === "development") {
  config = {
    API_URL: "http://localhost:8080",
  };
}

export default config;
