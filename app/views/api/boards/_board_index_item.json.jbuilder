json.extract! board, :id, :title
json.owner do
  json.partial! 'api/users/user', user: board.owner
end
