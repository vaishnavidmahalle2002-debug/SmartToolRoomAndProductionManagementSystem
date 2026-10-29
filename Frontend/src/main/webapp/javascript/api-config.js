(function () {
    "use strict";

    const host = window.location.hostname;
    const port = window.location.port;
    let baseUrl;

    if (host === "localhost" || host === "127.0.0.1") {
        // Port 8081 = Eclipse frontend + STS backend on 8080 (development)
        // Any other port = both WARs on one local Tomcat
        baseUrl = (port === "8081")
            ? "http://localhost:8080"
            : "http://localhost:" + (port || "80") + "/api";
    } else {
        // Live server: backend WAR is /api on the same domain
        baseUrl = window.location.origin + "/api";
    }

    window.API_CONFIG = Object.freeze({ BASE_URL: baseUrl });
    console.log("API Base URL:", window.API_CONFIG.BASE_URL);
})();