const parseUrl = (arg) => {
  let protocol = "";
  let domain = "";
  let port = "";
  let path = "";
  let parameters = "";
  let anchor = "";
  let urlPart;

  if (arg.split("://")[0] === "https") {
    protocol = "https";
    urlPart = arg.split("://")[1];
  } else if (arg.split("://")[0] === "http") {
    protocol = "http";
    urlPart = arg.split("://")[1];
  } else if (arg.split("://").length > 1) {
    throw new Error("Not a valid protocol");
  } else {
    protocol = "http";
    urlPart = arg;
  }

  if (!urlPart.includes("/")) {
    domain = urlPart;
    urlPart = "";
  } else {
    const domainSeparatorIndex = urlPart.indexOf("/");
    domain = urlPart.slice(0, domainSeparatorIndex);
    urlPart = urlPart.slice(domainSeparatorIndex);
  }

  if (domain.includes(":")) {
    const portSeparatorIndex = domain.indexOf(":");
    port = domain.slice(portSeparatorIndex + 1);
    domain = domain.slice(0, portSeparatorIndex);
  } else if (protocol === "https") {
    port = 443;
  } else {
    port = 80;
  }

  if (urlPart.includes("#")) {
    const anchorSeparatorIndex = urlPart.lastIndexOf("#");
    anchor = urlPart.slice(anchorSeparatorIndex);
    urlPart = urlPart.slice(0, anchorSeparatorIndex);
  }

  if (urlPart.includes("?")) {
    const parametersSeparatorIndex = urlPart.indexOf("?");
    path = urlPart.slice(0, parametersSeparatorIndex);
    parameters = urlPart.slice(parametersSeparatorIndex);
  } else {
    path = urlPart;
  }

  if (path === "") {
    path = "/index.html";
  }
  urlPart = `${protocol}://${domain}:${port}${path}${parameters}${anchor}`;
  return { protocol, domain, port, path, parameters, anchor, urlPart };
};
module.exports = { parseUrl };