const index = (req, res) => {
  res.status(200).json(`Star#index`)
}

const show = (req, res) => {
  res.status(200).json(`Star#show`)
}

const create = (req, res) => {
  res.status(200).json(`Star#create`)
}

const update = (req, res) => {
  res.status(200).json(`Star#update`)
}

const remove = (req, res) => {
  res.status(200).json(`Star#remove`)
}

module.exports = { index, show, create, update, remove }
