function status(request, response) {
  response.status(200).json({ chave: "oii" });
}

export default status;
