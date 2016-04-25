json.extract! board, :id, :title

json.owner do
  json.partial! 'api/users/user', user: board.owner
end

json.lists do
  json.array! board.lists, partial: 'api/lists/list_index_item', as: :list
end

json.memberships do
  json.array! board.board_memberships, partial: 'api/board_memberships/membership', as: :board_membership
end
