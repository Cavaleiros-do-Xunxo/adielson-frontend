let config = {
  API_URL: "https://adielson-api.notfab.net",
};

if (process.env.NODE_ENV === "development") {
  config = {
    API_URL: "http://localhost:8080",
  };
}

export default config;
