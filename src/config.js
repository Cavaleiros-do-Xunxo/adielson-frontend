let config = {
  API_URL: "",
};

if (process.env.NODE_ENV === "development") {
  config = {
    API_URL: "https://adielson-api.notfab.net",
  };
}

export default config;
