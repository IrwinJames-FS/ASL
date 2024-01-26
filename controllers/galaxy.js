const index = (req, res) => {
  res.status(200).json(`Galaxy#index`)
}

const show = (req, res) => {
  res.status(200).json(`Galaxy#show`)
}

const create = (req, res) => {
  res.status(200).json(`Galaxy#create`)
}

const update = (req, res) => {
  res.status(200).json(`Galaxy#update`)
}

const remove = (req, res) => {
  res.status(200).json(`Galaxy#remove`)
}

module.exports = { index, show, create, update, remove }
