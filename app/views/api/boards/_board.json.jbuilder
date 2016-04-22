json.extract! board, :id, :title

json.owner do
  json.partial! 'api/users/user', user: board.owner
end

json.lists do
  json.array! board.lists, partial: 'api/lists/list_index_item', as: :list
end

json.members do
  json.array! board.users, partial: 'api/users/user', as: :user
end
