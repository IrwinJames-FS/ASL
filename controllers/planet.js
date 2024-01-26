const index = (req, res) => {
  res.status(200).json(`Planet#index`)
}

const show = (req, res) => {
  res.status(200).json(`Planet#show`)
}

const create = (req, res) => {
  res.status(200).json(`Planet#create`)
}

const update = (req, res) => {
  res.status(200).json(`Planet#update`)
}

const remove = (req, res) => {
  res.status(200).json(`Planet#remove`)
}

module.exports = { index, show, create, update, remove }
